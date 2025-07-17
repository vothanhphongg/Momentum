import{g as f,h as I,i as W,k as x,l as y,m as h,n as F,o as M,p as s}from"./chunk-7SRLIN7D.js";import{a as B}from"./chunk-RI2WZ5PA.js";import{Mb as A,c,vb as d}from"./chunk-HPWCPLRR.js";import{f as m,o as r,q as o}from"./chunk-6KXF36WM.js";r();o();var n=m(c());r();o();var b=m(c());var L=(0,b.createSelector)(h,e=>new Set(e?.map(t=>t.coinId)??[])),w=L;r();o();var O=e=>R(e,d(e)),g=O;r();o();var v=m(c());var k=(0,v.createSelector)(x,e=>new Set(e.map(t=>t.coinId))),D=k;r();o();var K=m(c());var q=(0,K.createSelector)(F,e=>new Set(e?.map(t=>t.coinId)??[])),P=q;var se=(0,n.createSelector)(s,e=>Object.entries(e).reduce((t,[C,a])=>{let u=(a?.coins??[]).reduce((l,i)=>i.childrenCoin?l.concat(i.childrenCoin):l.concat([i]),[]);return t[C]={...a,coins:u},t},{})),pe=(0,n.createSelector)(s,d,(e,t)=>!Array.isArray(e[t]?.coins)),R=(0,n.createSelector)(s,W,M,y,I),j=[],Ce=(0,n.createSelector)(g,w,P,D,A,(e,t,C,a,S)=>e.length?f(e,(u,l)=>{let{isFiltered:i,isSmallCurrency:H}=B({defaultBaseCoinsCoinIdsSet:a,addedCoinIdsSet:t,reducedCoinIdsSet:C,balanceCoin:u,isDefault:l,hiddenSmallAssets:S});return!i&&!H}).results:j),ue=(0,n.createSelector)(g,e=>e.length?f(e,()=>!0).results:j);export{w as a,g as b,D as c,P as d,se as e,pe as f,R as g,Ce as h,ue as i};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-76CRIMII.js.map
