import{c as d}from"./chunk-XT3EOPTE.js";import{B as a,m as S}from"./chunk-A6Z53EN6.js";import{G as w,R as x}from"./chunk-UWJLNJLY.js";import{b as f}from"./chunk-JWYCKY2V.js";import"./chunk-G2266BV2.js";import"./chunk-7VFUX7IX.js";import{f as u,o as t,q as n}from"./chunk-6KXF36WM.js";t();n();var C=u(f());t();n();var h=u(f());x();var y=()=>{let{useCoin:r}=a.hooks,{accountStore:{computedAccountId:o},walletContractStore:{transactionPayload:s},swapStore:{setSolanaSwapParams:e,sendSolanaTransaction:m,solanaSwapParams:i}}=d(),P=r(501),{coinId:p}=P||{};return(0,h.useMemo)(()=>{try{let c=s?.map(l=>l.payload.transaction),g=c.length>1;return{coinId:p,showDappInfo:!1,showSwitchNetwork:!1,walletId:o,method:"signAllTransactions",params:{message:c},source:"dex",onConfirm:async l=>{let[I]=await w(m({signedTransactions:l,txArray:s,enableJito:g,swapParams:i,walletId:o}));I||e(null)},onCancel:()=>{e(null),a.history?.goBack()}}}catch{return null}},[o,m,e,i,s,p])};var A=()=>{let{SolanaEntry:r}=a.components,o=y();return C.default.createElement(r,{...o})},j=S(A);export{j as default};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=Solana-SQ4WGIY3.js.map
