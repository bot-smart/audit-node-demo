var utils=require("./util");
var appId="请输入appId";
var appSecret="请输入appKey"; 
var businessId="请输入businessID"; 
var apiurl="https://api.botsmart.cn/v1/check/query";
//请求参数
var post_data = {
	// 1.设置公有有参数
	app_id:appId,
	business_id:businessId,
	timestamp:new Date().getTime()+"",
}
// 设置私有参数
var taskIds=["1266369881261608961","1266367504416641025"];
post_data.taskIds=JSON.stringify(taskIds);
var signature=utils.genSignature(appSecret,post_data);
post_data.signature=signature;
//http请求结果
var responseCallback=function(responseData){
	console.log(responseData);
	var data = JSON.parse(responseData);
		console.log(data);
}
utils.sendHttpRequest(apiurl,"POST",post_data,responseCallback);