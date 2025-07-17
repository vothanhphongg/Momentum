import{o as T}from"./chunk-5QMHGZLF.js";import{T as E}from"./chunk-HPWCPLRR.js";import{e as l,ia as n,ra as z}from"./chunk-XDY6V34Y.js";import{b as B}from"./chunk-JWYCKY2V.js";import{f as b,o as y,q as D}from"./chunk-6KXF36WM.js";y();D();var e=b(B()),s=b(T());z();var _=(O,g={wait:200,disabled:!1,fetchOnce:null,forceUpdate:null,onFetchSuccess:()=>{},onFetchError:()=>{}})=>{let[v,d]=(0,e.useState)({}),[m,w]=(0,e.useState)(null),[S,{setTrue:U,setFalse:o}]=(0,s.useBoolean)(!0),[k,{setFalse:r}]=(0,s.useBoolean)(!0),{address:i,inputData:a,tokenAddress:c,coinId:h,value:F,authorizationList:p}=O,{wait:q,disabled:L,fetchOnce:t,forceUpdate:A,onFetchSuccess:G,onFetchError:I}=g,P=async()=>{try{let u={coinId:h,value:F,address:i&&n(i),inputData:a&&n(a),authorizationList:p};c&&(u.tokenAddress=n(c));let{data:f}=await E(u);d(f),t&&w(t),l(G)&&G()}catch{d(f=>({...f,queryGasLimitErrorUseDefault:!0})),l(I)&&I()}finally{o(),r()}},{run:x}=(0,s.useDebounceFn)(()=>{if(L){o(),r();return}if(t===m&&t!==null){o(),r();return}P()},{wait:q});return(0,e.useEffect)(()=>{U(),x()},[i,a,c,p,h,F,t,A,m,L]),[v,S,k]},J=_;export{J as a};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-BLGJS4OD.js.map
