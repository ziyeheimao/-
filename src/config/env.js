/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

// let baseUrl = 'http://192.168.204.98:9091';
let baseUrl = 'http://mapi.lexiangjk.com/'; // 测试环境服务器ip


let routerMode = 'hash';
let imgBaseUrl = 'https://mdst.51dojoy.com'; // 图片路径


if (process.env.NODE_ENV == 'development') {
    imgBaseUrl = '/img/';

}else if(process.env.NODE_ENV == 'production'){
	// baseUrl = 'https://jzgapit.51dojoy.com'; // 生产环境服务器ip
	baseUrl = 'http://mapi.lexiangjk.com/'; // 生产环境服务器ip
    imgBaseUrl = '';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}