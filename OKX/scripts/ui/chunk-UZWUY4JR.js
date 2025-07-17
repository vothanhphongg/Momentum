import{d as n,f as x}from"./chunk-DEOJU4Z3.js";import{Ea as a,Ia as o,Na as A,ya as c,za as y}from"./chunk-TM67VPZU.js";import{o as s,q as u}from"./chunk-6KXF36WM.js";s();u();A();y();x();var l=async(t={})=>{let{data:e}=await a(c.queryAccountExist,t);return e},q=async t=>{let{data:e}=await a(c.queryAccountInfo,t);return e},w=async(t,e)=>{let r=await n().getSignRequestHeaders({walletId:e});return await o(c.createWaxAccount,t,{headers:r})||{}},g=async(t,e)=>{let r=await n().getSignRequestHeaders({walletId:e});return await o(c.createFreeWaxAccount,t,{headers:r})||{}},W=async t=>{let{data:e}=await a(c.queryAccountStatus,t);return e||{}},h=async t=>{let{data:e}=await a(c.checkAccountPattern,t);return e??!1};export{l as a,q as b,w as c,g as d,W as e,h as f};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-UZWUY4JR.js.map
