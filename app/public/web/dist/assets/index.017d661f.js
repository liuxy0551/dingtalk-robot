import{o as e,p as t,a as s,r as a,b as n,c as o,d as r,w as i,e as l,f as d,g as c,B as u,T as p,h as m,S as f,i as h,j as y,A as _,I as v,E as b,k as E}from"./vendor.e2c80a0b.js";var g="1.7.1";const x=()=>{let e=document.querySelector("html"),t=document.querySelector("body"),s=document.querySelector("#app");e.style.fontSize="37.5px",e.style.width="375px",e.style.height="667px",e.style.margin="0 auto",e.style.transform="translate(0, 5%)",e.style.backgroundColor="#eee",e.childNodes[0].style.transform="translate(0, 0)",t.style.height="100%",s.style.transform="translate(0, 0)"},P=()=>g;const w={setup(){e((()=>{window.console.log(`%cCurrent version: V${P()}`,"font-family: Cabin, Helvetica, Arial, sans-serif;text-align: left;font-size:32px;color:#B21212;"),"pc"===(()=>{const e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"];let t="pc";for(let s of e)if(-1!==navigator.userAgent.indexOf(s)){t="mobile";break}return t})()&&(x(),window.addEventListener("resize",(()=>{x()})))}))}},A=i();t("data-v-71539984");const S={class:"container"},L=l("搜索"),k=l("我的");s();const O=A(((e,t,s,i,l,d)=>{const c=a("router-view"),u=a("van-tabbar-item"),p=a("van-tabbar");return n(),o("div",S,[r(c),r(p,{route:""},{default:A((()=>[r(u,{replace:"",to:"/money",icon:"search"},{default:A((()=>[L])),_:1}),r(u,{replace:"",to:"/personal",icon:"friends-o"},{default:A((()=>[k])),_:1})])),_:1})])}));let j;w.render=O,w.__scopeId="data-v-71539984";const I={},q=function(e,t){if(!t)return e();if(void 0===j){const e=document.createElement("link").relList;j=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in I)return;I[e]=!0;const t=e.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${s}`))return;const a=document.createElement("link");return a.rel=t?"stylesheet":j,t||(a.as="script",a.crossOrigin=""),a.href=e,document.head.appendChild(a),t?new Promise(((e,t)=>{a.addEventListener("load",e),a.addEventListener("error",t)})):void 0}))).then((()=>e()))},C=d({history:c(),routes:[{path:"/",redirect:"/auth"},{path:"/auth",name:"Auth",component:()=>q((()=>import("./index.c50417a8.js")),["/web/assets/index.c50417a8.js","/web/assets/vendor.e2c80a0b.js","/web/assets/vendor.0f9007e7.css","/web/assets/index.aa2c98da.js","/web/assets/index.40764ea2.css"])},{path:"/money",name:"Money",meta:{title:"理财"},component:()=>q((()=>import("./index.c70efdef.js")),["/web/assets/index.c70efdef.js","/web/assets/index.83de2241.css","/web/assets/vendor.e2c80a0b.js","/web/assets/vendor.0f9007e7.css","/web/assets/index.aa2c98da.js","/web/assets/index.40764ea2.css"])},{path:"/personal",name:"Personal",meta:{title:"我的"},component:()=>q((()=>import("./index.1be1156a.js")),["/web/assets/index.1be1156a.js","/web/assets/index.cf1c8c31.css","/web/assets/vendor.e2c80a0b.js","/web/assets/vendor.0f9007e7.css","/web/assets/index.aa2c98da.js","/web/assets/index.40764ea2.css"])}]});C.beforeEach(((e,t)=>{}));var T={install(e){e.use(u).use(p).use(m).use(f).use(h).use(y).use(_).use(v).use(b)}};const V=E(w);V.use(C).use(T),V.mount("#app");export{P as g};
