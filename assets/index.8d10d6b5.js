import{m as d,_ as i,s as g}from"./index.77f6552f.js";import{r as f,o as a,t as o,a as s,w as _,T as v,c as b,v as k,x as h,y as x,F as I,z as S,A as m,B as w,C as V,D as C,G as F}from"./elementPlus.9b213846.js";import{_ as T}from"./logo.d56b2740.js";const B={name:"AppMain",computed:{...d(["isScreenFull"]),key(){return this.$route.path}}};function z(e,p,l,u,c,r){const n=f("router-view");return a(),o("section",{class:h(["app-main",{"app-main-fullscreen":e.isScreenFull}])},[s(n,null,{default:_(({Component:t})=>[s(v,{mode:"out-in","enter-active-class":"animate__animated animate__fadeIn animate__faster","leave-active-class":"animate__animated animate__fadeOut animate__faster"},{default:_(()=>[(a(),b(k(t)))]),_:2},1024)]),_:1})],2)}const $=i(B,[["render",z],["__scopeId","data-v-b17fbf54"]]);const A={name:"Topbar",data(){return{isVisible:!1}},computed:{...d(["isScreenFull"]),currentRoute(){return"/"+this.$route.path.split("/")[1]},menuList(){return g.menu||[]}},mounted(){this.isVisible=!0}},L=e=>(C("data-v-b07560f8"),e=e(),F(),e),N={key:0,class:"topbar-wrapper flex-box flex-v-center"},D=L(()=>x("img",{src:T,class:"topbar-logo animate__animated animate__zoomIn animate__faster"},null,-1)),M={class:"menu-list flex-box flex-v-center"};function R(e,p,l,u,c,r){const n=f("router-link");return e.isScreenFull?m("",!0):(a(),o("div",N,[s(n,{key:"collapse",class:"topbar-logo",to:"/"},{default:_(()=>[D]),_:1}),x("ul",M,[(a(!0),o(I,null,S(r.menuList,t=>(a(),b(v,{key:t.path,"enter-active-class":"animate__animated animate__zoomIn animate__faster"},{default:_(()=>[c.isVisible?(a(),o("li",{key:0,class:h(["menu-item",{"menu-item-active animate__bounceIn":r.currentRoute==t.path}])},[s(n,{to:t.path},{default:_(()=>[w(V(t.name),1)]),_:2},1032,["to"])],2)):m("",!0)]),_:2},1024))),128))])]))}const y=i(A,[["render",R],["__scopeId","data-v-b07560f8"]]);const E={name:"Layout",components:{AppMain:$,Topbar:y}},G={class:"app-wrapper"};function O(e,p,l,u,c,r){const n=y,t=$;return a(),o("div",G,[s(n),s(t)])}const J=i(E,[["render",O],["__scopeId","data-v-73b63a2e"]]);export{J as default};