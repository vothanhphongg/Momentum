import{o as w}from"./chunk-5QMHGZLF.js";import{a as i,c as o}from"./chunk-N2BCRNDB.js";import{R as g,s as c}from"./chunk-UWJLNJLY.js";import{f as h,o as r,q as s}from"./chunk-6KXF36WM.js";r();s();var n=h(w());g();r();s();var f=async t=>{try{return await(await Promise.resolve(o.default_gas)).set(t),!0}catch{return!1}};async function l(t){try{return await(await Promise.resolve(o.default_gas)).get(t)}catch{return{realChainIdHex:""}}}var m=async t=>{try{return await(await Promise.resolve(o.default_gas)).delete(t),!0}catch{return!1}};var b=t=>(0,n.useMemoizedFn)(async e=>await l(e||t)),d=(t,e)=>(t?.realChainIdHex||e)&&(!!t?.gasPrice||!!t?.maxPriorityFeePerGas&&!!t?.maxFeePerGas),p=t=>{let{data:e}=c(i.default_gas,t),u=(0,n.useMemoizedFn)(async(a={})=>d(a,t)?await f(a?.realChainIdHex?a:{...a,realChainIdHex:t}):!1,[t]),D=(0,n.useMemoizedFn)(async a=>await m(a||t),[t]);return[e,u,D]},k=p;export{b as a,k as b};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-V7MKKAGW.js.map
