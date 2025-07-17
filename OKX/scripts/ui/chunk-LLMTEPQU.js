import{b as C}from"./chunk-MRB2XFLQ.js";import{Ea as c,Na as b,ya as u,za as y}from"./chunk-TM67VPZU.js";import{L as r,ra as L}from"./chunk-XDY6V34Y.js";import{b as S}from"./chunk-JWYCKY2V.js";import{f as E,o as m,q as p}from"./chunk-6KXF36WM.js";m();p();var o=E(S());L();y();b();var k=({accountId:n,chainIndex:t})=>{let[e,g]=(0,o.useState)({}),[A,l]=(0,o.useState)(!1),[B,i]=(0,o.useState)(!1),a=(0,o.useCallback)(async()=>{try{l(!0),i(!1);let{data:s}=await c(u.getAptosBaseCoinBalance,{accountId:n,chainIndex:t});g(M=>({...M,[t]:s.coinAmountOrigin}))}catch{e[t]||i(!0)}finally{l(!1)}},[t,e,n]);(0,o.useEffect)(()=>{r(t)||a()},[t]);let f=C("wallet-asset",{pollingInterval:10*1e3});return(0,o.useEffect)(()=>{let s=f?.data?.aptMCAssetChanged;!r(t)&&s&&a()},[f,t]),{requestBalance:a,isBalanceLoading:A,isBalanceLoadError:B,coinAmountInt:e[t]}},P=k;export{P as a};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-LLMTEPQU.js.map
