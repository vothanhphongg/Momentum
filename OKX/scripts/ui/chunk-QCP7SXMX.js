import{c as p}from"./chunk-W23ABSXX.js";import{d as m}from"./chunk-PDC447BO.js";import{Jb as r,Kb as i,qb as g,sb as s,tb as l}from"./chunk-HPWCPLRR.js";import{o as c,q as d}from"./chunk-6KXF36WM.js";c();d();var e={connect:"connect",transaction:"transaction",msg:"msg",addToken:"addToken",addChain:"addChain"};function a(n={}){let t=null,o=0;return Object.keys(n).forEach(f=>{let T=n[f];Array.isArray(T)&&T.forEach(u=>{let h=u.time||0;h>=o&&(t=f,o=h)})}),t}c();d();var U=n=>{let t=m(n)?.isRpcMode,o;return t?o=a({[e.connect]:p(n),[e.transaction]:s(n),[e.msg]:g(n),[e.addToken]:i(n),[e.addChain]:r(n)}):o=a({[e.connect]:p(n),[e.transaction]:l(n),[e.addToken]:i(n),[e.addChain]:r(n)}),o},q=n=>m(n)?.isRpcMode?p(n).length+s(n).length+g(n).length+i(n).length+r(n).length:p(n).length+l(n).length+i(n).length+r(n).length;export{e as a,U as b,q as c};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-QCP7SXMX.js.map
