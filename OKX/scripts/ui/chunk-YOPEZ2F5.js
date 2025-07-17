import{b as a}from"./chunk-CCEMKRO6.js";import{a as p}from"./chunk-2HSCH6R3.js";import{H as f,sa as N}from"./chunk-N2BCRNDB.js";import{l as g,m}from"./chunk-JGEHAFTO.js";import{Jc as s,Lc as I,Sc as E}from"./chunk-TM67VPZU.js";import{c as h,i as u,ra as l}from"./chunk-XDY6V34Y.js";import{f as k,o as d,q as T}from"./chunk-6KXF36WM.js";d();T();var r=k(N());l();E();var L=async o=>{let{Common:t,Hardfork:e}=await g();(0,r.isHexString)(u(o.chainId))&&(o.chainId=h(p(o.chainId)));let n=s({netWorkId:o.chainId})?.baseChain,i=()=>{let w=a(o.from,n),b=a(o.to,n);return{...o,from:w,to:b,gasLimit:o.gas||o.gasLimit}},c=s({netWorkId:o.chainId})?.localType||"custom-net",x=I(c)?.networkId||"custom-net",y={chainId:o.chainId,networkId:x,name:c},C={common:t.custom(y,{baseChain:n,hardfork:e.London})},{TransactionFactory:A}=await m();return A.fromTxData(i(),C)},W=async(o,t)=>{let e=o.toJSON();e.type=o.type;let{TransactionFactory:n}=await m(),i=n.fromTxData({...e,...t},{common:o.common,freeze:Object.isFrozen(o)});return(0,r.bufferToHex)(i.serialize())},S="0x2019",_=({chainId:o,method:t})=>S===o&&t===f.KAIA_SIGN_TRANSACTION;export{L as a,W as b,_ as c};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-YOPEZ2F5.js.map
