import{Ea as f,Na as d,ya as p,za as C}from"./chunk-TM67VPZU.js";import{N as g,ra as G}from"./chunk-XDY6V34Y.js";import{b as l}from"./chunk-JWYCKY2V.js";import{f as h,o as r,q as i}from"./chunk-6KXF36WM.js";r();i();C();d();G();var e=h(l()),D=(t,n=!1)=>{let[a,s]=(0,e.useState)(!1),[o,I]=(0,e.useState)({baseFee:"",feeUnit:"",priorityFee:""}),u=(0,e.useCallback)(async()=>{let{data:S={}}=await f(p.getGasInfo,{chainId:t});I(S)},[t]),m=(0,e.useCallback)(async()=>{s(!0),await u(),s(!1)},[u]);return(0,e.useEffect)(()=>{n&&!g(t)&&m()},[m,n,t]),{gasData:o,loading:a,gasDataFn:u}};r();i();C();d();var c=h(l()),L=()=>{let[t,n]=(0,c.useState)([]);return(0,c.useEffect)(()=>{(async()=>{let{data:a=[]}=await f(p.getGasTrackerChains);n(a)})()},[]),{supportChain:t}};r();i();var b={chainId:1,chainName:"",chainIcon:""},z=(t,n)=>{if(!n.length)return{chainId:void 0};let a=b,s;return n.forEach(o=>{o.chainId===1&&(a=o),o.chainId===t&&(s=o)}),s||a};export{D as a,L as b,z as c};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-MR3EIA6K.js.map
