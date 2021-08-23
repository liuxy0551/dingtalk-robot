var e=Object.defineProperty,o=Object.defineProperties,n=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,i=(o,n,t)=>n in o?e(o,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[n]=t;import{n as l,o as r,m as d,t as c,D as m,r as f,c as y,d as p,F as I,q as g,s as h,w as u,p as v,a as b,b as C,v as w,e as k}from"./vendor.e2c80a0b.js";import{a as S}from"./index.aa2c98da.js";import{g as j}from"./index.3bd1b882.js";const L={setup(){const e=localStorage.getItem("senderId"),f=localStorage.getItem("moneyInfoCodes"),y=l({typeConfirmVisible:!1,typeActions:[{name:"基金",value:"jijin"},{name:"股票",value:"gupiao"}],moneyInfo:null,keyword:"",result:[],moneyInfoCodeList:[],showRefresh:!1,refreshing:!1});r((()=>{f&&(y.moneyInfoCodeList=f.split(",")),p()}));const p=()=>{const e=j();localStorage.getItem("version")!==e&&(localStorage.setItem("version",e),d(`当前版本：${e}`))};return I=((e,o)=>{for(var n in o||(o={}))a.call(o,n)&&i(e,n,o[n]);if(t)for(var n of t(o))s.call(o,n)&&i(e,n,o[n]);return e})({senderId:e},c(y)),o(I,n({onSearch:e=>{d.loading({message:"加载中...",forbidClick:!0,loadingType:"spinner"}),S.post("/api/getMoneyInfoBySina",{key:e}).then((e=>{e.data.split(";")[0].length<25&&(y.result=[],d("查无结果"));let o=[];e.data.split(";").forEach((e=>{e=e.split(","),o.push({code:e[3],codeB:e[2],name:e[6],selected:y.moneyInfoCodeList.includes(e[2])||y.moneyInfoCodeList.includes(e[3]),loading:!1})})),y.result=o})).finally((()=>{d.clear()}))},showConfirm:e=>{y.moneyInfo=e,y.typeConfirmVisible=!0},createMoneyInfo:o=>{y.moneyInfo.loading=!0;const n={senderId:e,type:o.value,name:y.moneyInfo.name,code:y.moneyInfo["jijin"===o.value?"codeB":"code"],sort:y.moneyInfoCodeList.length};S.post("/api/createMoneyInfo",n).then((()=>{y.moneyInfoCodeList.push(n.code),localStorage.setItem("moneyInfoCodes",y.moneyInfoCodeList.join(",")),d("添加成功"),y.moneyInfo.selected=!0})).finally((()=>{y.moneyInfo.loading=!1}))},deleteMoneyInfo:o=>{o.loading=!0,m.confirm({title:"删除自选",message:"确认删除该自选理财信息吗？"}).then((()=>{const n=y.moneyInfoCodeList.some((e=>e===o.code)),t={senderId:e,code:o[n?"code":"codeB"]};S.post("/api/deleteMoneyInfo",t).then((()=>{y.moneyInfoCodeList.splice(y.moneyInfoCodeList.indexOf(o[n?"code":"codeB"]),1),localStorage.setItem("moneyInfoCodes",y.moneyInfoCodeList.join(",")),d("删除成功"),o.selected=!1})).finally((()=>{o.loading=!1}))})).catch((()=>{o.loading=!1}))},refreshAPP:()=>{y.refreshing=!0,localStorage.removeItem("version"),location.reload(),setTimeout((()=>{y.refreshing=!1}),2500)}}));var I}},P=u();v("data-v-631be8b9");const O={class:"money-content"},x={class:"top-search"},V={class:"box"},M={key:0,class:"row"},A={class:"text"},B=k("添加自选"),_=k("删除自选");b();const U=P(((e,o,n,t,a,s)=>{const i=f("van-search"),l=f("van-button"),r=f("van-icon"),d=f("van-action-sheet");return C(),y("div",O,[p("div",x,[p(i,{modelValue:e.keyword,"onUpdate:modelValue":[o[1]||(o[1]=o=>e.keyword=o),t.onSearch],placeholder:"请输入简称/拼音/代码",onSearch:t.onSearch},null,8,["modelValue","onSearch","onUpdate:modelValue"])]),p("div",V,[(C(!0),y(I,null,g(e.result,(e=>(C(),y("div",{class:"item",key:e.code},[e.code&&e.name?(C(),y("div",M,[p("div",A,w(e.code)+" - "+w(e.name),1),e.selected?(C(),y(l,{key:1,type:"warning",size:"mini",loading:e.loading,onClick:o=>t.deleteMoneyInfo(e)},{default:P((()=>[_])),_:2},1032,["loading","onClick"])):(C(),y(l,{key:0,type:"primary",size:"mini",loading:e.loading,onClick:o=>t.showConfirm(e)},{default:P((()=>[B])),_:2},1032,["loading","onClick"]))])):h("",!0)])))),128))]),e.showRefresh?(C(),y("div",{key:0,class:["refresh-box",{loading:e.refreshing}],onClick:o[2]||(o[2]=(...e)=>t.refreshAPP&&t.refreshAPP(...e))},[p(r,{name:"replay"})],2)):h("",!0),p(d,{show:e.typeConfirmVisible,"onUpdate:show":o[3]||(o[3]=o=>e.typeConfirmVisible=o),actions:e.typeActions,"cancel-text":"取消","close-on-click-action":"",onSelect:t.createMoneyInfo,title:"选择理财类型"},null,8,["show","actions","onSelect"])])}));L.render=U,L.__scopeId="data-v-631be8b9";export default L;
