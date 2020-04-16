var UUID=require('uuid');
var util=require("./util");
// appId 
var appId="请输入appId";
var appSecret="请输入appKey"; 
var businessId="请输入businessID"; 
var apiurl="https://api.botsmart.cn/v1/check/send";
//请求参数
var post_data = {
	business_id:businessId,
	app_id:appId,
	unique_id:UUID.v1(),
	timestamp:new Date().getTime()+"",
	data:"请输入审核内容"

};
var signature=util.genSignature(appSecret,post_data);
post_data.signature=signature;
console.log(post_data)
//http请求结果
var responseCallback=function(responseData){
    var result = JSON.parse(responseData);
	console.log(result)
}
util.sendHttpRequest(apiurl,"POST",post_data,responseCallback);