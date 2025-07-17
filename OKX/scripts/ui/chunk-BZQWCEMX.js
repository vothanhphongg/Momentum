import{a as T,k as E}from"./chunk-IRMYAC6R.js";import{p as l,q as m}from"./chunk-YALUYHLV.js";import{a as L}from"./chunk-ON6S2DB7.js";import{c as p,d,g as c}from"./chunk-RTFE54S3.js";import{e as i}from"./chunk-UVFOW4HH.js";import{b as y}from"./chunk-JWYCKY2V.js";import{f as o,o as a,q as s}from"./chunk-6KXF36WM.js";a();s();var f=o(T()),u=o(L());var C=o(y());var _=()=>{let e=(0,u.useHistory)(),t=E();return(0,C.useCallback)(async r=>{let g=await c.hasConnectedLedger(),{walletName:h}=t(r),n=`${m}?${f.default.stringify({type:i.addChain,walletId:r})}`;g?e.push(n):d.openModal(p.hardWareNotConnected,{walletName:h,onButtonClick:()=>{globalThis.platform.openExtensionInBrowser(l)},onExtButtonClick:()=>{globalThis.platform.openExtensionInBrowser(`${n}&hideBack=1`)}})},[e,t])};export{_ as a};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-BZQWCEMX.js.map
