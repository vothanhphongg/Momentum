import{c as a}from"./chunk-HRKDKI66.js";import{l as f}from"./chunk-YJQGXXOQ.js";import{ec as R}from"./chunk-HPWCPLRR.js";import{a as N}from"./chunk-DEOJU4Z3.js";import{H as m,ra as h}from"./chunk-XDY6V34Y.js";import{b as B}from"./chunk-JWYCKY2V.js";import{f as o,o as s,q as u}from"./chunk-6KXF36WM.js";s();u();var t=o(B()),i=o(R());h();var p=o(N());var y=20*1e3,E=b=>{let k=(0,i.useDispatch)(),c=f(void 0,b),r=(0,t.useRef)(null);(0,t.useEffect)(()=>{let n=()=>{clearInterval(r.current),r.current=null},l=async()=>{try{let e=await c();if(m(e)){n();return}let d=await(0,p.default)(e.eth.getBlockNumber)();k(a(d))}catch(e){console.log(`fetch block failed 
${e}`)}};return l(),r.current=setInterval(()=>{l()},y),()=>{n()}},[c])},I=E;export{I as a};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-DKHD2LWP.js.map
