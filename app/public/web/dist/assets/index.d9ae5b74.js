var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(a,t,n)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n,i=(e,a)=>{for(var t in a||(a={}))o.call(a,t)&&s(e,t,a[t]);if(n)for(var t of n(a))l.call(a,t)&&s(e,t,a[t]);return e},r=(e,n)=>a(e,t(n));import{n as d,o as c,t as p,D as u,T as b,r as g,c as m,d as v,F as f,q as j,w as y,p as I,a as h,b as O,v as S,e as w}from"./vendor.3606503a.js";import{a as C}from"./index.212501a8.js";const P={setup(){const e=localStorage.getItem("senderId"),a=d({tabSelected:"jijin",tabList:[{label:"基金",value:"jijin"},{label:"股票",value:"gupiao"}],result:{jijin:[],gupiao:[]}});c((()=>{t()}));const t=()=>{C.get(`/api/getMoneyInfos?senderId=${e}`).then((e=>{const{jijin:t,gupiao:n}=e.data;localStorage.setItem("moneyInfoCodes",t.concat(n).map((e=>e.code)).join(",")),a.result={jijin:t.map((e=>r(i({},e),{loading:!1}))),gupiao:n.map((e=>r(i({},e),{loading:!1})))}}))};return r(i({},p(a)),{onChange:e=>{a.tabSelected=e},deleteMoneyInfo:a=>{a.loading=!0,u.confirm({title:"删除自选",message:"确认删除该自选理财信息吗？"}).then((()=>{const n={senderId:e,code:a.code};C.post("/api/deleteMoneyInfo",n).then((()=>{t(),b("删除成功")})).finally((()=>{a.loading=!1}))})).catch((()=>{a.loading=!1}))}})}},k=y();I("data-v-79397779");const x={class:"personal-content"},M={class:"top-search"},_={class:"box top-tab"},V={class:"row"},D={class:"text"},L=w("删除自选");h();const q=k(((e,a,t,n,o,l)=>{const s=g("van-tab"),i=g("van-tabs"),r=g("van-button");return O(),m("div",x,[v("div",M,[v(i,{modelValue:e.tabSelected,"onUpdate:modelValue":a[1]||(a[1]=a=>e.tabSelected=a),onChange:n.onChange},{default:k((()=>[(O(!0),m(f,null,j(e.tabList,(e=>(O(),m(s,{key:e.value,title:e.label,name:e.value},null,8,["title","name"])))),128))])),_:1},8,["modelValue","onChange"])]),v("div",_,[(O(!0),m(f,null,j(e.result[e.tabSelected],(e=>(O(),m("div",{class:"item",key:e.code},[v("div",V,[v("div",D,S(e.code)+" - "+S(e.name),1),v(r,{type:"warning",size:"mini",loading:e.loading,onClick:a=>n.deleteMoneyInfo(e)},{default:k((()=>[L])),_:2},1032,["loading","onClick"])])])))),128))])])}));P.render=q,P.__scopeId="data-v-79397779";export default P;
