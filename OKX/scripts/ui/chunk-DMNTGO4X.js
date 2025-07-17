import{c as a,e as d}from"./chunk-XIYLMV6I.js";import{d as p}from"./chunk-PDC447BO.js";import{ec as v}from"./chunk-HPWCPLRR.js";import{H as r,o as m}from"./chunk-PUSMMCUD.js";import{R as g,z as e}from"./chunk-UWJLNJLY.js";import{ea as o}from"./chunk-JT3LNHPY.js";import{b as x}from"./chunk-JWYCKY2V.js";import{f as s,o as _,q as c}from"./chunk-6KXF36WM.js";_();c();var f=s(x()),t=s(v());g();function S(){let w=(0,t.useDispatch)(),{currentNetworkUniqueId:n}=(0,t.useSelector)(p),{deleteRpcNetwork:u}=d();return(0,f.useCallback)(({editRpcInfo:l,onDeleted:i})=>{if(a(l,{uniqueId:n})){r.error({title:e("developer_mode_network_toast_cannot_delete"),top:16});return}let k=m.warn({title:e("extension_wallet_network_modaltitle_delete_confirm"),text:e("extension_wallet_network_modaldesc_delete_confirm"),confirmText:e("extension_wallet_network_text_remove_network"),confirmBtnProps:{type:o.TYPE.red,size:o.SIZE.lg},cancelText:e("developer_mode_network_btn_botcancel"),alignBottom:!1,onConfirm:async()=>{await u(l),r.success(e("developer_mode_network_toast_delete_done")),k.destroy(),i&&i()}})},[w,n])}export{S as a};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-DMNTGO4X.js.map
