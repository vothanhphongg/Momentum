import{T as a,U as m}from"./chunk-ANIUN6US.js";import{k as c,l as g}from"./chunk-3DZ7WRLL.js";import{c as i,f as p}from"./chunk-DEOJU4Z3.js";import{o as r,q as o}from"./chunk-6KXF36WM.js";r();o();g();p();m();var d=c({name:"walletConfig",initialState:{},reducers:{}}),{reducer:w}=d,W=w;function x(e){return{type:a,value:e}}function C(e,l){return s=>new Promise((u,f)=>{i().setWalletConfig(e,l,(t,n)=>{if(t){f(t);return}s(x(n)),u(n)})})}function A(e){return C("hasShowDisconnectUpgrade",e)}function E({metamask:e}){return e.walletConfig}export{W as a,C as b,A as c,E as d};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-PDC447BO.js.map
