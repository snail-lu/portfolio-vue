import{_ as s,o as e,c as g,a as c,w as t,p as m,i as u,F as v,f as _,b as k,e as r,g as d}from"./index.11b51222.js";import{E as p,a as h}from"./el-col.09083494.js";import{_ as n}from"./index.32963882.js";import"./typescript2.b7eef2c1.js";import"./index.58558a70.js";const x={components:{Card:n},data(){return{demoList:[]}},created(){this.getDemoList()},methods:{pushUrl(a){this.$router.push({path:`/demo/${a}`})},async getDemoList(){let a=await this.req({url:"/demo/list"});a.result&&a.result.list&&(this.demoList=a.result.list)}}},w=a=>(m("data-v-5f3feec4"),a=a(),u(),a),I={class:"demo-list-container"},L=w(()=>r("div",{class:"footer"},[d(" Illustration by "),r("a",{class:"link",href:"https://icons8.com/illustrations/",target:"_blank"},"Icons 8"),d(" from "),r("a",{class:"link",href:"https://icons8.com/illustrations",target:"_blank"},"Ouch!")],-1));function y(a,$,B,E,i,C){const l=n,b=p,f=h;return e(),g("div",I,[c(f,{class:"demo-list",gutter:40},{default:t(()=>[(e(!0),g(v,null,_(i.demoList,o=>(e(),k(b,{class:"demo-item",key:o.path,span:8},{default:t(()=>[c(l,{data:o},null,8,["data"])]),_:2},1024))),128))]),_:1}),L])}var q=s(x,[["render",y],["__scopeId","data-v-5f3feec4"]]);export{q as default};