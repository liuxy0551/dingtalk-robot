import{o as e,p as t,a as s,r as a,b as r,c as n,d as o,w as i,e as l,f as d,g as c,B as u,T as p,h as m,S as h,i as f,j as y,A as _,I as b,E as v,k as E}from"./vendor.e2c80a0b.js";var P="1.6.5";const g=()=>{let e=document.querySelector("html"),t=document.querySelector("body"),s=document.querySelector("#app");e.style.fontSize="37.5px",e.style.width="375px",e.style.height="667px",e.style.margin="0 auto",e.style.transform="translate(0, 5%)",e.style.backgroundColor="#eee",e.childNodes[0].style.transform="translate(0, 0)",t.style.height="100%",s.style.transform="translate(0, 0)"},x=()=>P;const S={setup(){e((()=>{"pc"===(()=>{const e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"];let t="pc";for(let s of e)if(-1!==navigator.userAgent.indexOf(s)){t="mobile";break}return t})()&&(g(),window.addEventListener("resize",(()=>{g()})))}))}},w=i();t("data-v-ad5f757e");const A={class:"container"},L=l("搜索"),k=l("我的");s();const O=w(((e,t,s,i,l,d)=>{const c=a("router-view"),u=a("van-tabbar-item"),p=a("van-tabbar");return r(),n("div",A,[o(c),o(p,{route:""},{default:w((()=>[o(u,{replace:"",to:"/money",icon:"search"},{default:w((()=>[L])),_:1}),o(u,{replace:"",to:"/personal",icon:"friends-o"},{default:w((()=>[k])),_:1})])),_:1})])}));let j;S.render=O,S.__scopeId="data-v-ad5f757e";const I={},q=function(e,t){if(!t)return e();if(void 0===j){const e=document.createElement("link").relList;j=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in I)return;I[e]=!0;const t=e.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${s}`))return;const a=document.createElement("link");return a.rel=t?"stylesheet":j,t||(a.as="script",a.crossOrigin=""),a.href=e,document.head.appendChild(a),t?new Promise(((e,t)=>{a.addEventListener("load",e),a.addEventListener("error",t)})):void 0}))).then((()=>e()))},T=d({history:c(),routes:[{path:"/",redirect:"/auth"},{path:"/auth",name:"Auth",component:()=>q((()=>import("./index.c50417a8.js")),["/web/assets/index.c50417a8.js","/web/assets/vendor.e2c80a0b.js","/web/assets/vendor.0f9007e7.css","/web/assets/index.aa2c98da.js","/web/assets/index.40764ea2.css"])},{path:"/money",name:"Money",meta:{title:"理财"},component:()=>q((()=>import("./index.b4ec19ba.js")),["/web/assets/index.b4ec19ba.js","/web/assets/index.9c953260.css","/web/assets/vendor.e2c80a0b.js","/web/assets/vendor.0f9007e7.css","/web/assets/index.aa2c98da.js","/web/assets/index.40764ea2.css"])},{path:"/personal",name:"Personal",meta:{title:"我的"},component:()=>q((()=>import("./index.f167ab2a.js")),["/web/assets/index.f167ab2a.js","/web/assets/index.6b1e8c00.css","/web/assets/vendor.e2c80a0b.js","/web/assets/vendor.0f9007e7.css","/web/assets/index.aa2c98da.js","/web/assets/index.40764ea2.css"])}]});T.beforeEach(((e,t)=>{}));var D={install(e){e.use(u).use(p).use(m).use(h).use(f).use(y).use(_).use(b).use(v)}};const R=E(S);R.use(T).use(D),R.mount("#app");export{x as g};
