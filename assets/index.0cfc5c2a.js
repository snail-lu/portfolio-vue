import{h as p,r as g,o as t,t as s,a as o,w as f,T as w,c as C,v as T,x as v,u as n,k as F,y as z,z as A,A as B,B as $,C as u,F as D,D as L,G as M,H as N,I as R,J as V,K as q}from"./elementPlus.6949a43e.js";import{_ as h,u as k,a as E,b as G,s as H}from"./index.8df952e0.js";import{_ as J}from"./logo.d56b2740.js";const K={__name:"AppMain",setup(a){const c=k(),_=p(()=>c.state.isScreenFull);return(x,y)=>{const m=g("router-view");return t(),s("section",{class:v(["app-main",{"app-main-fullscreen":n(_)}])},[o(m,null,{default:f(({Component:r})=>[o(w,{mode:"out-in","enter-active-class":"animate__animated animate__fadeIn animate__faster","leave-active-class":"animate__animated animate__fadeOut animate__faster"},{default:f(()=>[(t(),C(T(r)))]),_:2},1024)]),_:1})],2)}}},O=h(K,[["__scopeId","data-v-7155f5e4"]]);const U=a=>(V("data-v-1f7f9532"),a=a(),q(),a),W={class:"topbar-wrapper flex-box flex-v-center"},j=U(()=>u("img",{src:J,class:"topbar-logo animate__animated animate__zoomIn animate__faster"},null,-1)),P={class:"menu-list flex-box flex-v-center"},Q=["onClick"],X={__name:"Topbar",setup(a){const c=E(),_=p(()=>"/"+c.path.split("/")[1]),x=p(()=>H.menu||[]),y=k(),m=p(()=>y.state.isScreenFull),r=F(0);function S(){const i=document.querySelector(".menu-item-active"),{offsetLeft:d,offsetWidth:l}=i;console.log(d,l);const e=d+(l-50)/2;r.value=`${e}px`}z(()=>{setTimeout(()=>{S()},300)}),A(()=>{S()});const I=G(),b=i=>{I.push(i)};return(i,d)=>{const l=g("router-link");return B((t(),s("nav",W,[o(l,{key:"collapse",class:"topbar-logo",to:"/"},{default:f(()=>[j]),_:1}),u("ul",P,[(t(!0),s(D,null,L(n(x),e=>(t(),s("li",{class:v(["menu-item animate__animated animate__zoomIn animate__faster",{"menu-item-active":n(_)==e.path}]),key:e.path,onClick:te=>b(e.path)},[e.icon?(t(),s("i",{key:0,class:v(["iconfont menu-item-icon",e.icon])},null,2)):M("",!0),u("span",null,N(e.name),1)],10,Q))),128)),u("span",{class:"menu-item-active-bg",style:R({left:n(r)})},null,4)])],512)),[[$,!n(m)]])}}},Y=h(X,[["__scopeId","data-v-1f7f9532"]]);const Z={class:"app-wrapper"},ee={__name:"index",setup(a){return(c,_)=>(t(),s("div",Z,[o(Y),o(O)]))}},oe=h(ee,[["__scopeId","data-v-95c2c897"]]);export{oe as default};
