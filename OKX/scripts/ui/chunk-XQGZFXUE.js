import{g as u}from"./chunk-IRMYAC6R.js";import{b as c}from"./chunk-MRB2XFLQ.js";import{o as k}from"./chunk-5QMHGZLF.js";import{Ea as m,Ic as a,Na as W,Sc as _,ya as n,za as C}from"./chunk-TM67VPZU.js";import{R as b,q as f}from"./chunk-UWJLNJLY.js";import{j as i,ra as L}from"./chunk-XDY6V34Y.js";import{b as E}from"./chunk-JWYCKY2V.js";import{f as r,o,q as s}from"./chunk-6KXF36WM.js";o();s();var l=r(E()),p=r(k());L();b();_();C();W();var T="update_defi_list",M=()=>{let d=u(),I=a(),t=(0,p.useRequest)(async()=>{let D=await m(n.getDefiList,{accountId:d});return i(D,["data","platformListByAccountId","0","platformListVoList"],[]).filter(g=>I.find(h=>Number(h.netWorkId)===g.chainId))},{manual:!0}),e=c("invest-DeFi",{onError:t.refresh,pollingInterval:30*1e3});return(0,l.useEffect)(()=>{e&&t.refresh()},[e]),f.listen(T,t.refresh,!1),t};export{T as a,M as b};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-XQGZFXUE.js.map
