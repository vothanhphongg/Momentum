import{h as x}from"./chunk-IRMYAC6R.js";import{d as w,ec as T}from"./chunk-HPWCPLRR.js";import{Hc as N,Sc as W}from"./chunk-TM67VPZU.js";import{H as d,L as y,ra as k,w as p}from"./chunk-XDY6V34Y.js";import{b as Q}from"./chunk-JWYCKY2V.js";import{f as a,o as u,q as c}from"./chunk-6KXF36WM.js";u();c();var l=a(Q()),j=a(T());k();W();u();c();k();var I=e=>{if(!e||typeof e!="object")return!1;let r={};return Object.keys(e).forEach(t=>{let o=e[t];r[t]=Array.isArray(o)?o:[o]}),r},b=(e,r)=>{if(!Array.isArray(e))return[];if(!r||d(r)||typeof r!="object")return e;let t=Object.entries(r);return p(e,o=>{for(let n=0;n<t.length;n++){let f=t[n][0];if(!t[n][1]?.includes(o[f]))return!1}return!0})};var m=e=>{let r=(0,j.useSelector)(w);return(0,l.useMemo)(()=>{if(!e)return r;let t=I(e);return b(r,t)},[r,e])},E=(e={},r)=>{let t=x(r),o=Object.keys(t?.account||{});return m({...e,localType:o})},O=(e={})=>{let{coinId:r,localType:t,networkId:o,netWorkId:n}=N(e)||{},f=m();return(0,l.useMemo)(()=>{let i=o??n;if(![r,t,i].every(s=>y(s)||s===""))return f.find(s=>i!==void 0&&s?.netWorkId===i||r!==void 0&&s?.coinId===r||t!==void 0&&s?.localType===t)},[r,t,o,n,f])};u();c();export{m as a,E as b,O as c};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-TSTKPLAO.js.map
