/* SeaJS v1.1.0 | seajs.org | MIT Licensed */
this.seajs={_seajs:this.seajs};seajs.version="1.1.0";seajs._data={config:{debug:"",preload:[]},memoizedMods:{},packageMods:[]};seajs._util={};seajs._fn={};
(function(a){var c=Object.prototype.toString,b=Array.prototype;a.isString=function(a){return"[object String]"===c.call(a)};a.isObject=function(a){return a===Object(a)};a.isFunction=function(a){return"[object Function]"===c.call(a)};a.isArray=Array.isArray||function(a){return"[object Array]"===c.call(a)};a.indexOf=b.indexOf?function(a,e){return a.indexOf(e)}:function(a,e){for(var f=0,c=a.length;f<c;f++)if(a[f]===e)return f;return-1};var d=a.forEach=b.forEach?function(a,e){a.forEach(e)}:function(a,
e){for(var c=0,b=a.length;c<b;c++)e(a[c],c,a)};a.map=b.map?function(a,e){return a.map(e)}:function(a,e){var c=[];d(a,function(a,b,g){c.push(e(a,b,g))});return c};a.filter=b.filter?function(a,c){return a.filter(c)}:function(a,c){var b=[];d(a,function(a,i,g){c(a,i,g)&&b.push(a)});return b};a.unique=function(a){var c=[],b={};d(a,function(a){b[a]=1});if(Object.keys)c=Object.keys(b);else for(var h in b)b.hasOwnProperty(h)&&c.push(h);return c};a.now=Date.now||function(){return(new Date).getTime()}})(seajs._util);
(function(a,c){a.error=function(){throw Array.prototype.join.call(arguments," ");};a.log=function(){c.config.debug&&"undefined"!==typeof console&&console.log(Array.prototype.join.call(arguments," "))}})(seajs._util,seajs._data);
(function(a,c,b,d){function j(a){a=a.match(/.*(?=\/.*$)/);return(a?a[0]:".")+"/"}function e(l){l=l.replace(/([^:\/])\/+/g,"$1/");if(-1===l.indexOf("."))return l;for(var c=l.split("/"),k=[],b,e=0,g=c.length;e<g;e++)b=c[e],".."===b?(0===k.length&&a.error("Invalid path:",l),k.pop()):"."!==b&&k.push(b);return k.join("/")}function f(a){a=e(a);/#$/.test(a)?a=a.slice(0,-1):-1===a.indexOf("?")&&!/\.(?:css|js)$/.test(a)&&(a+=".js");return a}function h(a){if("#"===a.charAt(0))return a.substring(1);var c;if(g(a)&&
(c=m.alias)){var k=a.split("/"),b=k[0];c.hasOwnProperty(b)&&(k[0]=c[b],a=k.join("/"))}return a}function i(a){return~a.indexOf("://")||0===a.indexOf("//")}function g(a){var c=a.charAt(0);return-1===a.indexOf("://")&&"."!==c&&"/"!==c}var m=c.config,k={},c=d.location,o=c.protocol+"//"+c.host+function(a){"/"!==a.charAt(0)&&(a="/"+a);return a}(c.pathname);~o.indexOf("\\")&&(o=o.replace(/\\/g,"/"));a.dirname=j;a.realpath=e;a.normalize=f;a.parseAlias=h;a.parseMap=function(c,b){b=b||m.map||[];if(!b.length)return c;
var e=c;a.forEach(b,function(a){a&&1<a.length&&(e=e.replace(a[0],a[1]))});k[e]=c;return e};a.unParseMap=function(a){return k[a]||a};a.id2Uri=function(a,c){var a=h(a),c=c||o,b;i(a)?b=a:0===a.indexOf("./")||0===a.indexOf("../")?(a=a.replace(/^\.\//,""),b=j(c)+a):b="/"===a.charAt(0)&&"/"!==a.charAt(1)?c.replace(/^(\w+:\/\/[^\/]*)\/?.*$/,"$1")+a:m.base+"/"+a;return f(b)};a.isAbsolute=i;a.isTopLevel=g;a.pageUrl=o})(seajs._util,seajs._data,seajs._fn,this);
(function(a,c){function b(b,e){function g(){if(!g.isCalled)g.isCalled=!0,clearTimeout(i),e()}"SCRIPT"===b.nodeName?d(b,g):j(b,g);var i=setTimeout(function(){a.log("Time is out:",b.src);g()},c.config.timeout)}function d(a,c){a.onload=a.onerror=a.onreadystatechange=function(){if(/loaded|complete|undefined/.test(a.readyState)){a.onload=a.onerror=a.onreadystatechange=null;if(a.parentNode){try{if(a.clearAttributes)a.clearAttributes();else for(var b in a)delete a[b]}catch(e){}f.removeChild(a)}a=void 0;
c()}}}function j(a,c){a.attachEvent?a.attachEvent("onload",c):setTimeout(function(){e(a,c)},0)}function e(a,c){if(!c.isCalled){var b;if(i)a.sheet&&(b=!0);else if(a.sheet)try{a.sheet.cssRules&&(b=!0)}catch(g){1E3===g.code&&(b=!0)}setTimeout(function(){b?c():e(a,c)},1)}}var f=document.head||document.getElementsByTagName("head")[0]||document.documentElement,h=navigator.userAgent,i=~h.indexOf("AppleWebKit");a.getAsset=function(a,c,e){var i=/\.css(?:\?|$)/i.test(a),d=document.createElement(i?"link":"script");
if(e)d.charset=e;b(d,c);i?(d.rel="stylesheet",d.href=a,f.appendChild(d)):(d.async="async",d.src=a,g=d,f.insertBefore(d,f.firstChild),g=null)};var g,m;a.getCurrentScript=function(){if(g)return g;if(m&&"interactive"===m.readyState)return m;for(var a=f.getElementsByTagName("script"),c=0;c<a.length;c++){var b=a[c];if("interactive"===b.readyState)return m=b}};a.getScriptAbsoluteSrc=function(a){return a.hasAttribute?a.src:a.getAttribute("src",4)};a.isOpera=~h.indexOf("Opera")})(seajs._util,seajs._data);
(function(a){a.Module=function(a,b,d){this.id=a;this.dependencies=b||[];this.factory=d}})(seajs._fn);
(function(a,c,b){b.define=function(d,j,e){var f=arguments.length;1===f?(e=d,d=void 0):2===f&&(e=j,j=void 0,a.isArray(d)&&(j=d,d=void 0));if(!a.isArray(j)&&a.isFunction(e)){for(var f=e.toString(),h=/(?:^|[^.])\brequire\s*\(\s*(["'])([^"'\s\)]+)\1\s*\)/g,i=[],g,f=f.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g,"\n").replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g,"\n");g=h.exec(f);)g[2]&&i.push(g[2]);j=a.unique(i)}if(d)var m=a.id2Uri(d);else document.attachEvent&&!a.isOpera&&((f=a.getCurrentScript())&&
(m=a.unParseMap(a.getScriptAbsoluteSrc(f))),m||a.log("Failed to derive URL from interactive script for:",e.toString()));f=new b.Module(d,j,e);m?(a.memoize(m,f),c.packageMods.push(f)):c.anonymousMod=f}})(seajs._util,seajs._data,seajs._fn);
(function(a,c,b){function d(b){var g=this.context,d,f;a.isObject(b)?(f=b,d=f.id):a.isString(b)&&(d=h.resolve(b,g),f=c.memoizedMods[d]);if(!f)return null;if(e(g,d))return a.log("Found circular dependencies:",d),f.exports;if(!f.exports)if(b=f,g={uri:d,parent:g},d=b.factory,b.exports={},delete b.factory,delete b.ready,a.isFunction(d)){if(g=d(j(g),b.exports,b),void 0!==g)b.exports=g}else if(void 0!==d)b.exports=d;return f.exports}function j(a){function b(a){return d.call(c,a)}var c={context:a||{}};b.constructor=
d;for(var e in h)h.hasOwnProperty(e)&&function(a){b[a]=function(){return h[a].apply(c,f.call(arguments))}}(e);return b}function e(a,b){return a.uri===b?!0:a.parent?e(a.parent,b):!1}var f=Array.prototype.slice,h=d.prototype;h.resolve=function(b,c){return a.isString(b)?a.id2Uri(b,(c||this.context||{}).uri):a.map(b,function(a){return h.resolve(a,c)})};h.async=function(a,c){b.load(a,c,this.context)};h.load=function(b,c,e){a.getAsset(b,c,e)};b.Require=d;b.createRequire=j})(seajs._util,seajs._data,seajs._fn);
(function(a,c,b){function d(a){var b=q.preload,c=b.length;c?(q.preload=b.slice(c),j(b,function(){d(a)})):a()}function j(f,g,h){d(function(){a.isString(f)&&(f=[f]);var d=p.resolve(f,h);e(d,function(){var e=b.createRequire(h),f=a.map(d,function(a){return e(c.memoizedMods[a])});g&&g.apply(null,f)})})}function e(a,b){var c=g(a);if(0===c.length)i(c),b();else for(var h=0,j=c.length,k=j;h<j;h++)(function(a){function g(){d(function(){var d=n[a];if(d){var f=d.dependencies;if(f.length)f=d.dependencies=p.resolve(f,
{uri:d.id});var g=f.length;if(g)f=m(a,f),g=f.length;g&&(k+=g,e(f,function(){k-=g;0===k&&(i(c),b())}))}0===--k&&(i(c),b())})}n[a]?g():f(a,g)})(c[h])}function f(b,d){o[b]?l[b].push(d):(l[b]=[d],o[b]=!0,p.load(a.parseMap(b),function(){var d=c.anonymousMod;if(d)n[b]||h(b,d),c.anonymousMod=null;(d=c.packageMods[0])&&!n[b]&&(n[b]=d);c.packageMods=[];o[b]&&delete o[b];l[b]&&(a.forEach(l[b],function(a){a()}),delete l[b])},c.config.charset))}function h(a,b){b.id=a;n[a]=b}function i(b){a.forEach(b,function(a){if(n[a])n[a].ready=
!0})}function g(b){return a.filter(b,function(a){a=n[a];return!a||!a.ready})}function m(b,c){return a.filter(c,function(a){return!k(n[a],b)})}function k(b,c){if(!b||b.ready)return!1;var d=b.dependencies||[];if(d.length){if(~a.indexOf(d,c))return!0;for(var e=0;e<d.length;e++)if(k(n[d[e]],c))return!0}return!1}var o={},l={},n=c.memoizedMods,q=c.config,p=b.Require.prototype;a.memoize=h;b.load=j})(seajs._util,seajs._data,seajs._fn);
(function(a,c,b,d){function j(a,b){a&&a!==b&&c.error("Alias is conflicted:",b)}var e=b.config,f="seajs-ts="+c.now(),b=document.getElementById("seajsnode");b||(b=document.getElementsByTagName("script"),b=b[b.length-1]);var h=c.getScriptAbsoluteSrc(b)||c.pageUrl,h=c.dirname(h);c.loaderDir=h;var i=h.match(/^(.+\/)seajs\/[\d\.]+\/$/);i&&(h=i[1]);e.base=h;if(b=b.getAttribute("data-main"))c.isTopLevel(b)&&(b="./"+b),e.main=b;e.timeout=2E4;d.config=function(b){for(var h in b){var k=e[h],i=b[h];if(k&&"alias"===
h)for(var l in i)i.hasOwnProperty(l)&&(j(k[l],i[l]),k[l]=i[l]);else k&&("map"===h||"preload"===h)?(c.isArray(i)||(i=[i]),c.forEach(i,function(a){a&&k.push(a)})):e[h]=i}if((b=e.base)&&!c.isAbsolute(b))e.base=c.id2Uri("./"+b+"#");if(2===e.debug)e.debug=1,d.config({map:[[/.*/,function(a){-1===a.indexOf("seajs-ts=")&&(a+=(-1===a.indexOf("?")?"?":"&")+f);return a}]]});if(e.debug)a.debug=e.debug;return this}})(seajs,seajs._util,seajs._data,seajs._fn);
(function(a,c,b,d){var a=a.config,j={},e=c.loaderDir;c.forEach("base,map,text,json,coffee,less".split(","),function(a){a="plugin-"+a;j[a]=e+a});b.config({alias:j});if(~d.location.search.indexOf("seajs-debug")||~document.cookie.indexOf("seajs=1"))b.config({debug:2}),a.preload.push("plugin-map")})(seajs._data,seajs._util,seajs._fn,this);
(function(a,c,b){b.use=function(a,c){b.load(a,c)};(c=c.config.main)&&b.use([c]);(function(c){if(c){for(var j={"0":"config",1:"use",2:"define"},e=0;e<c.length;e+=2)b[j[c[e]]].apply(a,c[e+1]);delete a._seajs}})((a._seajs||0).args)})(seajs,seajs._data,seajs._fn);
(function(a,c,b,d){if(a._seajs)d.seajs=a._seajs;else{a.config=b.config;a.use=b.use;var j=d.define;d.define=b.define;a.noConflict=function(c){d.seajs=a._seajs;if(c)d.define=j,a.define=b.define;return a};a.pluginSDK={util:a._util,data:a._data};if(c=c.config.debug)a.debug=!!c;delete a._util;delete a._data;delete a._fn;delete a._seajs}})(seajs,seajs._data,seajs._fn,this);

$_GLOBAL = typeof $_GLOBAL == 'object'?$_GLOBAL:{};

/* 调试机制 */
$_GLOBAL.debug = true; //true调试环境 | false线上环境
if ($_GLOBAL.debug){
	$_GLOBAL.mode = '/js/content/';
}
else {
	$_GLOBAL.mode = '/js/content/__build/';
}

/* 容错机制，线上环境不抛出JS错误, 但是会收集JS错误到一个数组里 */
$_GLOBAL.errorList = [];
$_GLOBAL.error = function(str){
	//console.error(str);
	throw str;
}
window.onerror = function(sMessage, sUrl, sLine){
	if ($_GLOBAL.debug){
		$_GLOBAL.error(sUrl + '->' + sLine + '->' + sMessage);
	}
	else {
		//$_GLOBAL.errorList.push(str);
	}
	
}

/* 修复IE6不缓存背景图片BUG */
if ($.browser.msie && $.browser.version === '6.0'){
	document.execCommand("BackgroundImageCache", false, true); 
}

/*版本号管理*/
if($('#code_version').length) {
    seajs.config({
         'map': [[ /^(.*\.(?:css|js))(.*)$/i, '$1?'+$('#code_version').html()]]
    });
}
