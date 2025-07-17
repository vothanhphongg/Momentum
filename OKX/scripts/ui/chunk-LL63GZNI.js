import{a as n}from"./chunk-BSFXZ46S.js";import{e as o}from"./chunk-ZMCTBWUY.js";import{o as s,q as m}from"./chunk-6KXF36WM.js";s();m();var p=({SolanaConnection:c,chainId:a=n.SOLANA})=>{let i={[n.SOLANA]:o.OKX_CHAIN_RPC,[n.SONIC_DEV]:o.SONIC_DEV_RPC,[n.SOON]:o.SOON_RPC,[n.ECLIPSE]:o.ECLIPSE_RPC},t=`${window.location.origin}${i[a]}`;return new c(t)},g=async({accountAddress:c})=>{let{Connection:a,PublicKey:i}=await import("./index.browser.esm-7GIYCHT7.js"),e=p({SolanaConnection:a}),t=await e.getAccountInfo(new i(c)),r=await e.getMinimumBalanceForRentExemption(t?.data?.length);return t.lamports>=r};export{p as a,g as b};

window.inOKXExtension = true;
window.inMiniApp = false;
window.ASSETS_BUILD_TYPE = "publish";

//# sourceMappingURL=chunk-LL63GZNI.js.map
