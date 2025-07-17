import{b as r}from"./chunk-7UPVX2FL.js";import{b as d}from"./chunk-ZMCTBWUY.js";import{o as c,q as s}from"./chunk-6KXF36WM.js";c();s();var h=({subscriptionId:e,callbacks:t,callback:a})=>(t.set(a,e),e),u=({subscriptionId:e,callbacks:t})=>{for(let[a,n]of t.entries())if(n===e){t.delete(a);break}},f=(e,t)=>e.replace(/\$\{([^}]+)\}/g,(a,n)=>{let o=t[n];return o!==void 0?o:a}),C=async e=>{let{data:{data:t}}=await r();return t[e]||e},I=async e=>{let{data:{data:t}}=await r(),a;return Object.keys(t).forEach(n=>t[n]==e?(a=n,!0):!1),a?parseInt(a):e},g=e=>{let{cdnBaseUrl:t}=d;return e&&`${t}${e}`};export{h as a,u as b,f as c,C as d,I as e,g as f};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-5OJTPISL.js.map
