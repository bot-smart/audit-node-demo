var http = require('http');
var urlutil=require('url');
var querystring = require('querystring');
var crypto = require('crypto');


//生成签名算法--工具方法
var genSignature=function(appSecret,paramsJson){
	var sorter=function(paramsJson){
		var sortedJson={};
		var sortedKeys=Object.keys(paramsJson).sort();
		for(var i=0;i<sortedKeys.length;i++){
			sortedJson[sortedKeys[i]] = paramsJson[sortedKeys[i]]
		}
		return sortedJson;
	}
	var sortedParam=sorter(paramsJson);
	var paramStr="";
	for(var key in sortedParam){
		var value=sortedParam[key];
		paramStr=paramStr+key+"="+value+"&";
    }
    var str = paramStr.substr(0, paramStr.length - 1);
	str+=appSecret;
	return crypto.createHash('sha1').update(str,"UTF-8").digest('hex');//MD5加密工具
};
//发送post请求
var sendHttpRequest=function(url,type,data,callback){
	var content = querystring.stringify(data,null,null,null);
	var urlObj=urlutil.parse(url);
	var host=urlObj.hostname;
	var path=urlObj.path;
	var port=urlObj.port;
	var options = {
			hostname: host,
			port: port,
			path: path,
			method: type,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Content-Length': Buffer.byteLength(content)
			}
		};
	var responseData="";
	var req = http.request(options, function (res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			responseData+=chunk;
		});
		res.on('end', function () {
			callback(responseData);
		});
		//设置超时
		req.setTimeout(1000,function(){
			console.log('request timeout!');
			req.abort();
		});
		req.on('error', function (e) {
			console.log('request ERROR: ' + e.message);
		});
	});
	req.write(content);
	req.end();
};

exports.genSignature=genSignature;
exports.sendHttpRequest=sendHttpRequest;