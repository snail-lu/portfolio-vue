import{_ as i}from"./index.20b757df.js";import{o as e,m as s,z as t,J as n,O as c,I as r,R as l}from"./elementPlus.8e3ee12e.js";const _={key:0,class:"loading-container"},v=l('<div class="loading-icon" data-v-705d456a><div class="shape shape-1" data-v-705d456a></div><div class="shape shape-2" data-v-705d456a></div><div class="shape shape-3" data-v-705d456a></div><div class="shape shape-4" data-v-705d456a></div></div>',1),p={class:"loading-text"},h={key:1,class:"loading-error"},g={__name:"index",props:{loadingStatus:{type:String,default:"\u52A0\u8F7D\u4E2D"}},emits:["refresh"],setup(a,{emit:d}){function o(){d("refresh")}return(u,m)=>a.loadingStatus==="\u52A0\u8F7D\u4E2D"?(e(),s("div",_,[v,t("div",p,n(a.loadingStatus),1)])):a.loadingStatus==="\u52A0\u8F7D\u5931\u8D25"?(e(),s("div",h,[c(" \u52A0\u8F7D\u5931\u8D25\uFF0C"),t("span",{class:"refresh-btn",title:"\u5237\u65B0",onClick:o},"\u5237\u65B0\u91CD\u8BD5")])):r("",!0)}},S=i(g,[["__scopeId","data-v-705d456a"]]);export{S as L};
