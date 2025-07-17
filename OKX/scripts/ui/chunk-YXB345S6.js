import{g}from"./chunk-JCM7SRK2.js";import{a as u}from"./chunk-JGEHAFTO.js";import{p as h,q as b}from"./chunk-UVFOW4HH.js";import{kb as f,mb as m,rc as T}from"./chunk-TM67VPZU.js";import{a as K}from"./chunk-VRY2ADKE.js";import{ra as A,y as d}from"./chunk-XDY6V34Y.js";import{o as w,q as l}from"./chunk-6KXF36WM.js";w();l();K();T();A();var P=(o,t)=>async(a,e,c)=>{let r=`0/${a}`,{extendedPublicKey:s}=d(c,{path:t})||{},{hardwareDerivePubKey:i,getAddressByPublicKey:p}=await u(),n=await i(s,r),y=await p(0,{publicKey:n,addressType:g[o]});e[m][o]={path:`${t}/${r}`,publicKey:n,address:y}},D=async(o,t,a)=>{t[m]={};for(let e=0;e<b.length;e++){let{type:c,basePath:r}=b[e];await P(c,r)(o,t,a)}},M=(o,t)=>async(a,e,c)=>{let r=t+a,{extendedPublicKey:s}=d(c,{path:h})||{},{hardwareDerivePubKey:i,getAddressByPublicKey:p}=await u(),n=await i(s,r),y=await p(60,{publicKey:n});e[f][o]={path:`${h}/${r}`,address:y}};export{D as a,M as b};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-YXB345S6.js.map
