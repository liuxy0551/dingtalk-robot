import{o as e,D as t,u as o,m as s}from"./vendor.0c6b906a.js";import{a as n}from"./index.26f440dd.js";const a={setup(){const a=o(),d=s(),{senderNick:r}=a.query;let i;e((()=>{let e=location.hash.split("senderId=");if(e&&e.length>1){let t=e[1].split("&senderNick=");i=t.length?t[0]:""}localStorage.setItem("senderId",i),l(),t.alert({message:`【${r}】的理财信息`}).then((()=>{d.push({name:"Money"})}))}));const l=()=>{n.post("/api/getMoneyInfos",{senderId:i}).then((e=>{const{jijin:t,gupiao:o}=e.data;localStorage.setItem("moneyInfoCodes",t.concat(o).map((e=>e.code)).join(","))}))}}};export default a;
