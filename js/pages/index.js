/**
 * @email xiaohuzi@slera.cn
 * @author: Mr.hu
 * @date: 2020-04-05
 * @time: 20:58
 */
// 获取当前页面地址
var url = window.location.origin + "/blogs";
//var url = "http://127.0.0.1";

/**
 * 时间转化为正常格式
 * @param time
 */
function timeFormat(time) {
	var d = new Date(time);

	var year = d.getFullYear(); //年
	var month = d.getMonth() + 1; //月
	var day = d.getDate(); //日

	var hh = d.getHours(); //时
	var mm = d.getMinutes(); //分
	var ss = d.getSeconds(); //秒

	var clock = year + "/";

	if(month < 10)
		clock += "0";

	clock += month + "/";

	if(day < 10)
		clock += "0";

	clock += day + " ";

	if(hh < 10)
		clock += "0";

	clock += hh + ":";
	if(mm < 10) clock += '0';
	clock += mm + ":";

	if(ss < 10) clock += '0';
	clock += ss;
	return(clock);
}

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
	if(variable == "page"){return 1;}
	return (false);
}

// 获取文章编号
var pageId = getQueryVariable("page");


// 分页补全
function page_helper(count,pageSize) {
	// 分页信息补充
	var html = '';
	var page= Math.ceil(count/pageSize);
	// ← 跳转
	html += '<li class="prev"><a href="?page='+(pageId-1)+'" style="pointer-events: '+(pageId != 1 ? "auto" : "none") +'">←</a></li>';
	// 开始
	var up = pageId - 2;
	// 结束
	var down = parseInt(pageId)+2;
	if(up <= 0){
		var up = 1;
	}
	// 中间数据显示
	if(pageId > 3){
		html += '<li><a href="?page=1">1</a></li>';
		if(pageId!=4){
			html += '<li class="next"><a>..</a></li><li class="next">'
		}
		for(var i = up;i <= down ;i++){
			if(pageId == i){
				html += '<li><a style="color: red" href="?page='+pageId+'">'+pageId+'</a></li>';
			}else if(i-1 >= page){
			}else{
				html += '<li><a href="?page='+i+'">'+i+'</a></li>';
			}
		}
	}else{
		for(var i = 1;i <= page;i++){
			if(i == pageId){
				html += '<li><a style="color: red" href="?page='+pageId+'">'+pageId+'</a></li>';
			}else{
				html += '<li><a href="?page='+i+'">'+i+'</a></li>';
			}
		}
		if(page == 6) {
			html += '<li><a href="?page='+6+'">'+6+'</a></li>';
		}if(pageId > 6){
			html += '<li class="next"><a>..</a></li><li class="next"><a href="?page='+page+'">'+page+'</a></li>';
		}
	}

	// → 跳转
	html += '<li class="next"><a href="?page='+(parseInt(pageId)+1)+'" style="pointer-events: '+(pageId < page ? "auto" : "none") +'">→</a></li>';
	$("#page").append(html);
}

// 页面初始化：填充数据
window.onload = function() {
	// 获取文章信息
	$.ajax({
		url: url + "/api/article/list/"+(!pageId ?"1":pageId),
		type: "GET",
		dataType: "json",
		success: function(json) {
			if(json.code){
				errorModal("OMG,获取数据失败了",json.code,json.message);
				console.log(json);
			}else{
				var html = '';
				$.each(json.result, function(i, item) {
					html += '<div class="post-list-item"><div class="post-list-item-container"><div class="item-thumb bg-deepgrey" style="background-image:url(' + item.pictureUrl + ');"></div><a href="/article.html?articleId=' + item.id + '"><div class="item-desc"><p>' + item.summary + '</p></div></a><div class="item-slant reverse-slant &lt; bg-deepgrey"></div><div class="item-slant"></div><div class="item-label"><div class="item-title"><a href="">' + item.title + '</a></div><div class="item-meta clearfix" style="color: #808080;"><span class="traffic" id="traffic">' + item.traffic + '</span><span style="float: left;"></span><div class="item-meta-cat"></div></div></div></div></div>'
				});
				$("#showArticle").append(html);
				// 补充分页部分
				page_helper(json.count,json.pageSize);
			}
		}
	});
	// 站点信息
	$.ajax({
		url: url + "/api/siteInfo",
		type: "GET",
		dataType: "json",
		success: function(json) {
			if(json.code){
				// errorModal("OMG,获取数据失败了",json.code,json.message);
				console.log(json);
			}else {
				document.title = json.title;
				$("meta[name='keywords']").attr('content', json.keyword);
				$("#weibo").attr("href",json.weibo);
				$("#zhihu").attr("href",json.zhihu);
				$("#gitlab").attr("href",json.gitlab);
				$("#github").attr("href",json.github);
				$("#jianshu").attr("href",json.jianshu);
			}

		}
	});
};
