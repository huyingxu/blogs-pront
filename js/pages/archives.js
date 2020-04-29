/**
 * @email xiaohuzi@slera.cn
 * @author: Mr.hu
 * @date: 2020-04-06
 * @time: 18:54
 */
// 获取当前页面地址
var url = window.location.origin +"/blogs";

// 页面初始化：填充文章内容数据
window.onload = function() {
    //评论内容
    $.ajax({
        url: url +"/api/article/list",
        type: "GET",
        dataType: "json",
        success: function(json) {
            var html = '';
            $.each(json, function(i, item) {
                html += '<div class="post-list-item"><div class="post-list-item-container"><div class="item-label"><div class="item-title"><a href="post/1586085832"><font style="vertical-align: inherit;">'+item.title+'<font style="vertical-align: inherit;"></font></font></a></div><div class="item-meta clearfix"><div class="item-meta-date"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">发布于2020-04-05</font></font></div></div></div></div></div>'
        });
            $("#article").append(html);
        }
    });
};


