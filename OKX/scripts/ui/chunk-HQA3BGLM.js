import{a as L}from"./chunk-4EFZXPDV.js";import{a as d}from"./chunk-4KODREVA.js";import{e as E}from"./chunk-XIYLMV6I.js";import{c as w,ec as k}from"./chunk-HPWCPLRR.js";import{c as f,k as m}from"./chunk-CWNIM6RS.js";import{b as g}from"./chunk-JWYCKY2V.js";import{f as a,o as M,q as p}from"./chunk-6KXF36WM.js";M();p();var r=a(g()),N=a(k()),h=a(w());var x=(0,h.createSelector)(t=>L(t).map(e=>({...e,icon:e.image})),t=>{let[e]=d(t);return{isEVMChainExisted:t.some(o=>f(o.coinId)),mainNetworkList:e}}),D=t=>{let{defaultNets:e,customNets:i}=E(),{isEVMChainExisted:o,mainNetworkList:s}=(0,N.useSelector)(x),{rpcModeTestNetworkList:C,rpcModeCustomNetworkList:u}=(0,r.useMemo)(()=>({rpcModeTestNetworkList:o?e.map(m):[],rpcModeCustomNetworkList:o?i.map(m):[]}),[o,e,i]),c=(0,r.useMemo)(()=>{let n=V=>V.filter(l=>l.chainName?.toLowerCase().includes(t.toLowerCase()));return{originMainnetListLength:s.length,mainnetList:n(s),testnetList:n(C),customList:n(u)}},[t,s,C,u]);return(0,r.useMemo)(()=>({...c,isEVMChainExisted:o}),[c,o])},B=D;export{x as a,B as b};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-HQA3BGLM.js.map
