import{o as i,r as c}from"./chunk-3DZ7WRLL.js";import{d as s,f as n}from"./chunk-DEOJU4Z3.js";import{G as o}from"./chunk-PUSMMCUD.js";import{o as a,q as d}from"./chunk-6KXF36WM.js";a();d();c();n();async function p(e){try{return await s().addAddressBook(e)}catch(r){throw r?.message!==i&&o.error({title:r?.message}),r}}async function A(e,r){try{return await s().updateAddressBook(e,r)}catch(t){return o.error({title:t?.message}),t}}async function g(e){try{return await s().removeAddressBook(e)}catch(r){throw o.error({title:r?.message}),r}}async function k(e,r){try{return await s().addRecentlyAddress(e,r)}catch(t){return o.error({title:t?.message}),t}}export{p as a,A as b,g as c,k as d};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-QXPTHK7Q.js.map
