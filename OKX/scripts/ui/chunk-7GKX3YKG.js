import{ia as u,ja as M,r as c,s as y}from"./chunk-TM67VPZU.js";import{I as p,ra as E}from"./chunk-XDY6V34Y.js";import{b as L}from"./chunk-JWYCKY2V.js";import{f as b,n as process,o as d,q as g}from"./chunk-6KXF36WM.js";d();g();var e=b(L());E();M();y();var o,t,I=(a,s={})=>{let[r,w]=(0,e.useState)(null),[i,f]=(0,e.useState)(s),l=(0,e.useCallback)(n=>{n.data.chanel===a&&(w(n.data),window.removeEventListener("message",l))},[a]);return(0,e.useEffect)(()=>{p(s,i)||f(s)},[s]),(0,e.useEffect)(()=>{if(r||t)return()=>{};let n=document.getElementById("sandbox"),m=v=>{v.data.status===201&&(window.removeEventListener("message",m),o&&clearInterval(o),t=n)},T=u();return!o&&!t&&(o=setInterval(()=>{n.contentWindow?.postMessage({status:200,buildType:process.env.ASSETS_BUILD_TYPE,cdn:c(),browser:T},"*")},1e3)),window.addEventListener("message",m),()=>{window.removeEventListener("message",m)}},[r]),(0,e.useEffect)(()=>(a&&t&&(window.addEventListener("message",l),t.contentWindow?.postMessage({chanel:a,data:i},"*")),()=>{window.removeEventListener("message",l)}),[a,t,i]),r};export{I as a};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-7GKX3YKG.js.map
