import{c as s}from"./chunk-N2BCRNDB.js";import{o as n,q as e}from"./chunk-6KXF36WM.js";n();e();n();e();async function o({action:t,params:a,maxSize:g=500}){try{let i=await Promise.resolve(s.log),r=await i.get(t)||{a:t,d:[]};Array.isArray(r?.d)||(r.d=[]);let c=r.d,p={t:new Date().toLocaleString(),p:a};c.unshift(p),g&&c.splice(g),await i.set(r)}catch{console.log("set data failed")}}async function u(t){return(await Promise.resolve(s.log)).query(t)}var h=t=>o({action:"pv",params:t}),S=t=>o({action:"pms",params:t}),L=t=>o({action:"pc",params:t});var A=t=>o({action:"pr",params:t,maxSize:50});export{u as a,h as b,S as c,L as d,A as e};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-SNHC6HKE.js.map
