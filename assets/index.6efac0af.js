import{_ as u}from"./index.bca012f4.js";/* empty css               */import{_ as l}from"./index.4a740d50.js";import{o as s,t as a,a as c,w as r,F as m,z as h,H as f,c as g,D as k,G as x,y as e,A as n,I}from"./elementPlus.012b8bf8.js";import"./index.accdd598.js";const j={components:{Card:l},data(){return{projectsList:[]}},created(){this.getProjectList()},methods:{pushUrl(t){this.$router.push({path:`/demo/${t}`})},async getProjectList(){let t=await this.req({url:"/project/list"});t.result&&t.result.list&&(this.projectsList=t.result.list)}}},v=t=>(k("data-v-a1d5391c"),t=t(),x(),t),w={class:"demo-list-container"},y=v(()=>e("div",{class:"footer"},[n(" Illustration by "),e("a",{class:"link",href:"https://icons8.com/illustrations/",target:"_blank"},"Icons 8"),n(" from "),e("a",{class:"link",href:"https://icons8.com/illustrations",target:"_blank"},"Ouch!")],-1));function L(t,$,B,b,i,C){const _=l,p=I,d=f;return s(),a("div",w,[c(d,{class:"demo-list",gutter:40},{default:r(()=>[(s(!0),a(m,null,h(i.projectsList,o=>(s(),g(p,{class:"demo-item",key:o.path,span:8},{default:r(()=>[c(_,{data:o},null,8,["data"])]),_:2},1024))),128))]),_:1}),y])}const P=u(j,[["render",L],["__scopeId","data-v-a1d5391c"]]);export{P as default};
