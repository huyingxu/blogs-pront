/**
 * 获取文章内容
 *
 * @email xiaohuzi@slera.cn
 * @author: Mr.hu
 * @date: 2020-04-05
 * @time: 22:39
 */
// 获取当前页面地址
var url = window.location.origin +"/blogs";
// 获取文章编号
var articleId = getQueryVariable("articleId");

// 获取网页中的参数
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

// 页面初始化：填充文章内容数据
window.onload = function() {
    // 文章内容
    $.ajax({
        url: url +"/api/article/"+articleId,
        type: "GET",
        dataType: "json",
        success: function(json) {
            if(json.id){
                document.title = json.title;
                $("#title").text(json.title);
                $("#createBy").text("发布于"+json.createBy);
                $("#content").html(json.content);
                $("#traffic").html(" "+json.traffic);
                // 标签
                $("#category").html('<a href="" >'+json.categoryName+'</a>');
                $("#layui-layer-shade1").remove();
                $("#layui-layer1").remove();
            }
            if(json.code){
                $("#layui-layer-shade1").remove();
                $("#layui-layer1").remove();
                errorModal("数据获取异常",json.code,json.message);
                return;
            }

        }
    });
    //评论内容
    $.ajax({
        url: url +"/api/comment/article/"+articleId,
        type: "GET",
        dataType: "json",
        success: function(json) {
            if(json.code){
                // errorModal("获取评论出现异常","错误代码:"+json.code+"</br>错误原因："+json.message);
                tips("提示","评论数据获取失败");
            }else{
                var html = '';
                $.each(json, function(i, item) {
                    html += '<li id="li-comment-2721" class="comment-body comment-parent comment-even"><div id="comment-2721"><div class="comment-view" onclick=""><div class="comment-header"> <img class="avatar" src="https://secure.gravatar.com/avatar/ba86e2e960d53cee3068abf8a4d87e0a?s=80&amp;r=G&amp;d=mm" width="80" height="80"> <span class="comment-author"><a href="" target="_self"rel="external nofollow">'+item.name+'</a></span> </div><div class="comment-content"> <span class="comment-author-at"></span><p>'+item.content+'</p><p></p></div><div class="comment-meta"> <time class="comment-time">'+item.createBy+'</time> <span class="comment-reply"><a href="" rel="nofollow" onclick="">Reply</a></span> </div></div></div></li>'
                });
                $("#comment").append(html);
            }
        }
    });
};

//提交评论
function subComment(){
    var name = author.value;
    var email = mail.value;
    var content = textarea.value;

    // 不为空才能增加
    var comment = {
        name: name,
        email: email,
        content: content
    }
    // 提交AJAX请求
    $.ajax({
        url: url +"/api/comment/article/" + articleId,
        type: "POST",
        dataType: "text",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(comment),
        success: function (data) {
            // 显示成功提示信息
            alert(data);
            $("#name").attr("value","");
            $("#email").val("");
            $("#content").val("");
            var html = '<li id="li-comment-2721" class="comment-body comment-parent comment-even"><div id="comment-2721"><div class="comment-view" onclick=""><div class="comment-header"> <img class="avatar" src="https://secure.gravatar.com/avatar/ba86e2e960d53cee3068abf8a4d87e0a?s=80&amp;r=G&amp;d=mm" width="80" height="80"> <span class="comment-author"><a href="" target="_blank" rel="external nofollow">'+name+'</a></span> </div><div class="comment-content"> <span class="comment-author-at"></span><p>'+content+'</p><p></p></div><div class="comment-meta"> <time class="comment-time">刚刚</time> <span class="comment-reply"><a href="" rel="nofollow" onclick="">Reply</a></span> </div></div></div></li>'
            $("#comment").append(html);
            return true;
        },
        error: function (data) {
            alert("123");
        }
    })


}
