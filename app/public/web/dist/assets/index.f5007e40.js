var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(a,t,o)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[t]=o,i=(e,a)=>{for(var t in a||(a={}))n.call(a,t)&&s(e,t,a[t]);if(o)for(var t of o(a))l.call(a,t)&&s(e,t,a[t]);return e},d=(e,o)=>a(e,t(o));import{n as r,o as c,t as p,D as b,T as u,r as g,c as m,d as v,F as f,q as y,w as j,p as I,a as h,b as S,v as O,e as w}from"./vendor.0c6b906a.js";import{a as C}from"./index.26f440dd.js";const k={setup(){const e=localStorage.getItem("senderId"),a=r({tabSelected:"jijin",tabList:[{label:"基金",value:"jijin"},{label:"股票",value:"gupiao"}],result:{jijin:[],gupiao:[]}});c((()=>{t()}));const t=()=>{C.post("/api/getMoneyInfos",{senderId:e}).then((e=>{const{jijin:t,gupiao:o}=e.data;localStorage.setItem("moneyInfoCodes",t.concat(o).map((e=>e.code)).join(",")),a.result={jijin:t.map((e=>d(i({},e),{loading:!1}))),gupiao:o.map((e=>d(i({},e),{loading:!1})))}}))};return d(i({},p(a)),{onChange:e=>{a.tabSelected=e},deleteMoneyInfo:a=>{a.loading=!0,b.confirm({title:"删除自选",message:"确认删除该自选理财信息吗？"}).then((()=>{const o={senderId:e,code:a.code};C.post("/api/deleteMoneyInfo",o).then((()=>{t(),u("删除成功")})).finally((()=>{a.loading=!1}))})).catch((()=>{a.loading=!1}))}})}},x=j();I("data-v-a9701fb6");const P={class:"personal-content"},M={class:"top-search"},_={key:0,class:"box top-tab"},V={class:"row"},D={class:"text"},L=w("删除自选"),q={key:1,class:"box top-tab"};h();const z=x(((e,a,t,o,n,l)=>{const s=g("van-tab"),i=g("van-tabs"),d=g("van-button"),r=g("van-empty");return S(),m("div",P,[v("div",M,[v(i,{modelValue:e.tabSelected,"onUpdate:modelValue":a[1]||(a[1]=a=>e.tabSelected=a),onChange:o.onChange},{default:x((()=>[(S(!0),m(f,null,y(e.tabList,(e=>(S(),m(s,{key:e.value,title:e.label,name:e.value},null,8,["title","name"])))),128))])),_:1},8,["modelValue","onChange"])]),e.result[e.tabSelected]&&e.result[e.tabSelected].length?(S(),m("div",_,[(S(!0),m(f,null,y(e.result[e.tabSelected],(e=>(S(),m("div",{class:"item",key:e.code},[v("div",V,[v("div",D,O(e.code)+" - "+O(e.name),1),v(d,{type:"warning",size:"mini",loading:e.loading,onClick:a=>o.deleteMoneyInfo(e)},{default:x((()=>[L])),_:2},1032,["loading","onClick"])])])))),128))])):(S(),m("div",q,[v(r,{description:"暂无数据"})]))])}));k.render=z,k.__scopeId="data-v-a9701fb6";export default k;