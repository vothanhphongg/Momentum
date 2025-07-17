import{Ob as o}from"./chunk-HPWCPLRR.js";import{W as a}from"./chunk-N2BCRNDB.js";import{o as i,q as n}from"./chunk-6KXF36WM.js";i();n();function u(s){return s.metamask.domainMetadata||{}}function l(s){let t=u(s);return Object.values(t).reduce((e,{host:r})=>(r&&(e[r]?e[r]+=1:e[r]=1),e),{})}function m(s){return Object.values(s.metamask.pendingApprovals||{}).filter(e=>e.type===a.WALLET_REQUEST_PERMISSIONS).map(e=>({metadata:{id:e.id,origin:e.origin,url:e?.requestData?.url},permissions:{eth_accounts:{}},time:e?.time||Date.now(),providerType:e?.requestData?.providerType,providerTypes:e?.requestData?.providerTypes,method:e?.requestData?.method,exts:e?.requestData?.exts,providersExts:e?.requestData?.providersExts}))}function d(s){let t=m(s);return t&&t[0]?t[t.length-1]:null}function g(s){let t=d(s);return t&&t.metadata?t.metadata.id:null}function v(s){let t=u(s),e=o(s);return{...t[e],origin:e}}export{u as a,l as b,m as c,d,g as e,v as f};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-W23ABSXX.js.map
