import{d as g}from"./chunk-6UWGBJGT.js";import{a as x,b as S,c as M,d as N}from"./chunk-JCM7SRK2.js";import{vb as T}from"./chunk-HPWCPLRR.js";import{d as o,f as B}from"./chunk-DEOJU4Z3.js";import{C as I}from"./chunk-N2BCRNDB.js";import{u as W}from"./chunk-UVFOW4HH.js";import{H as P,Sc as O,ka as w,qa as E,sc as m,t as u,uc as y}from"./chunk-TM67VPZU.js";import{o as l,q as p}from"./chunk-6KXF36WM.js";l();p();P();E();var H=()=>w()===u,f=t=>x(t)||M(t)||N(t)||S(t);l();p();O();B();var Z=({txData:t,txParams:n,walletId:e,isRpcMode:r=!1,baseChain:i=m})=>async(s,a)=>{let c=a();e??=T(c);let d=await o().getWalletIdentityByWalletId(e);f(d?.initialType)&&await g({walletInfo:d,txData:t,txParams:n,isRpcMode:r,baseChain:i})};async function A(t,n,e,r,{...i}={}){let s="";r??=await o().getWalletIdByAddress(n,e);let a=await o().getWalletIdentityByWalletId(r);try{if(f(a?.initialType))return s=await g({walletInfo:a,txParams:t,baseChain:e}),s;s=await o().signTransaction(t,n,e,r,i)}catch(c){throw c?.message===W?c:new Error(I)}return s}function $(t,n,e){return async()=>A(t,n,y,e)}function C(t,n,e,r,i){return o().signPsbt(t,n,e,r,i)}export{H as a,f as b,Z as c,A as d,$ as e,C as f};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-R6X7EOIE.js.map
