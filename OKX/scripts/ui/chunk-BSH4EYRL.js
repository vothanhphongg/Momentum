import{e as T}from"./chunk-G4AVWXHJ.js";import{c as I,i as A}from"./chunk-A57OTXBP.js";import{g as y}from"./chunk-IRMYAC6R.js";import{o as S}from"./chunk-5QMHGZLF.js";import{Wc as f,_c as b}from"./chunk-TM67VPZU.js";import{o as l,ra as w}from"./chunk-XDY6V34Y.js";import{f as W,o as p,q as m}from"./chunk-6KXF36WM.js";p();m();var i=W(S());w();b();var k=(r,g)=>{let C=y(),s=g??C,u=T(s),a=(0,i.useCreation)(()=>u.find(t=>t.coinId===r?.coinId),[u,r?.coinId])?.childrenCoin??[],o=I(r?.localType,s),c=A(r?.localType,s);return(0,i.useCreation)(()=>{if(!r||!Array.isArray(a)||!Array.isArray(o)||!o.length)return[];let t=a.filter(e=>e.coinId===+r?.coinId).map(e=>({...e})),d=[],n=l(t[0]||r),h=t.map(e=>c[e.addressType]);return o.forEach(({address:e,addressType:B})=>{h.includes(e)||(n.address=e,n.userAddress=e,n.addressType=f[r?.localType]?.[B],n.coinAmount=0,n.coinAmountInt=0,n.currencyAmount=0,n.currencyAmountUSD=0,d.push(l(n)))}),t.concat(d).filter(e=>Boolean(c[e.addressType]))},[r,a,o,c])};export{k as a};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-BSH4EYRL.js.map
