import{e as d}from"./chunk-W2CTJYFJ.js";import{c as s}from"./chunk-XUKVTAH5.js";import{o as n,q as l}from"./chunk-6KXF36WM.js";n();l();var a=class extends Error{constructor({code:c,message:e,data:t}){super(e),this.code=c,this.data=t,this.name=this.constructor.name}},h=r=>{let c=d(),{code:e,message:t}=r||{},o;switch(c){case s.WALLET_CONNECT:[5e3,5001,5002].includes(e)&&(o=new a({code:4001,message:t}));break;case(s.OKX_WALLET||s.OKX_CONNECT):[300].includes(e)&&(o={code:4001,message:t});break;default:break}return o||r};export{h as a};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-VIK2TCMI.js.map
