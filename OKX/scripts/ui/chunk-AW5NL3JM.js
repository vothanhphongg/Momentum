import{a as d}from"./chunk-TJCPJQIM.js";import{c as a,f as y}from"./chunk-JCM7SRK2.js";import{H as I}from"./chunk-HPWCPLRR.js";import{Rb as c,_b as f,hd as m,id as u,rc as g,rd as P}from"./chunk-TM67VPZU.js";import{o as p,q as C}from"./chunk-6KXF36WM.js";p();C();P();g();function B({coin:i,walletIdentity:e,options:o={}}){let{needFilterBaseCoin:t=!1,isKeystone:n,isMPC:r,isHardWallet:s}=o,W=n??a(e?.initialType),F=s??y(e?.keyringIdentityType),l=r??d(e?.keyringIdentityType);return!l&&!F?!0:t&&I(i)?!!l:W&&i.baseCoinId===c&&i.coinId===f?!1:l?!Object.values(u).includes(i.protocolId):!Object.values(m).includes(i.protocolId)}function O({coins:i=[],walletIdentity:e,options:o={}}){let t=a(e?.initialType),n=y(e?.keyringIdentityType),r=d(e?.keyringIdentityType);return i.filter(s=>B({coin:s,walletIdentity:e,options:{...o,isMPC:r,isHardWallet:n,isKeystone:t}}))}export{B as a,O as b};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-AW5NL3JM.js.map
