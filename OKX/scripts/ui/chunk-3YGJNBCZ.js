import{f as p}from"./chunk-MNZIO3NP.js";import{a as s}from"./chunk-B3JSNQIV.js";import{o as M}from"./chunk-5QMHGZLF.js";import{ec as h}from"./chunk-HPWCPLRR.js";import{d as a,f as B}from"./chunk-DEOJU4Z3.js";import{f as c,o as n,q as i}from"./chunk-6KXF36WM.js";n();i();var m=c(h()),u=c(M());B();var S=({metamask:t})=>t?.createdMap||{},g=(t,e,f={})=>{let r=p(t,e,{...f,withBalanceStatus:!0})||{},{requestBalance:l}=r,d=!(0,m.useSelector)(S)[e];return(0,u.useMount)(async()=>{if(d)try{let o=await a().getWalletTypeCreated(e);await a().createWalletToServer({walletId:e,walletType:o,noticeBackend:!0}),s(),l()}catch{}}),r},x=g;export{x as a};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-3YGJNBCZ.js.map
