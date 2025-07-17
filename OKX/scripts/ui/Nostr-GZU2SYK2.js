import{o as e,q as c}from"./chunk-6KXF36WM.js";e();c();var o={signMessage:async({provider:t,message:s})=>{let{nostr:n}=t||{},{sig:i}=await n.signEvent(s);return i},async getPublicKey({provider:t}){let{nostr:s}=t||{};return await s?.getPublicKey()}},r=o;export{r as default};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=Nostr-GZU2SYK2.js.map
