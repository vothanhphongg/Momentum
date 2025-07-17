import{o}from"./chunk-HPWCPLRR.js";import{sa as P}from"./chunk-N2BCRNDB.js";import{a as c}from"./chunk-JGEHAFTO.js";import{qa as m}from"./chunk-TM67VPZU.js";import{f as d,o as s,q as n}from"./chunk-6KXF36WM.js";s();n();var i=d(P());m();var h=async(t,e,r,a)=>{try{return await a(t,{privateKey:e,hrp:r}),!0}catch{return!1}},x=async(t,e)=>{let r=[],a=o(e),{getNewAddress:f}=await c();return await Promise.all(a.map(({coinType:p,cosmosPrefix:l,baseChain:u})=>h(p,t,l,f).then(y=>{y&&r.push(u)}))),r};var v=async(t,e)=>await x(t,e),C=async(t,e)=>{let r=await v(t,e);return Boolean(r[0])};export{v as a,C as b};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-IBTV5Y4U.js.map
