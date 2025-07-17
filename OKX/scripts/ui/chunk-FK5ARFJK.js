import{Ba as i}from"./chunk-HPWCPLRR.js";import{s,t as e}from"./chunk-N2BCRNDB.js";import{o as n,q as u}from"./chunk-6KXF36WM.js";n();u();var p=async({chainId:c,address:o,contractAddress:m,coinId:S})=>{let E=await i({chainId:c,address:o,contractAddress:m,coinId:S}),{status:r,alertMessage:d,url:R,register:a}=E||{},t={alertMessage:d,url:R,register:a,status:e.PROCESSING};return a||r===s.SUCCESS?(t.status=e.COMPLETED,t):((r===s.NONE||r===s.TIMEOUT||r===s.ERROR)&&(t.status=e.NOT_STARTED),t)};export{p as a};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-FK5ARFJK.js.map
