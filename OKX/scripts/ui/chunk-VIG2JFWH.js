import{b as l}from"./chunk-HQA3BGLM.js";import{R as N,z as u}from"./chunk-UWJLNJLY.js";import{b as w}from"./chunk-JWYCKY2V.js";import{f as d,o as e,q as n}from"./chunk-6KXF36WM.js";e();n();e();n();var C=d(w());N();function k(I){let{mainnetList:s,testnetList:a,customList:m,originMainnetListLength:M,isEVMChainExisted:p}=l(I);return(0,C.useMemo)(()=>{let i=(r,c)=>t=>{let g=t[r];return{chainName:t.chainName,icon:"image"in t?t.image:t.icon,id:String(g??""),rpcUrl:"rpcUrl"in t?t.rpcUrl:void 0,networkType:c,symbol:t.symbol}},o=[];return M>1&&o.push({chainName:u("wallet_extension_history_dropdown_all_network"),id:"",icon:"okx-wallet-plugin-network",networkType:0}),o.push(...s.map(i("chainId",0))),{isEVMChainExisted:p,mainnetListForUI:o,testnetListForUI:a.map(i("uniqueId",1)),customListForUI:m.map(i("uniqueId",2))}},[s,a,m,p])}export{k as a};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-VIG2JFWH.js.map
