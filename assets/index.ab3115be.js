import{r as _}from"./index.1d8bf81b.js";import{_ as p}from"./index.816e0842.js";import{o as i,m as l,z as e,y as h,J as c,L as m,M as u}from"./elementPlus.8845be7b.js";const f="/portfolio/assets/smile.63fc0bdb.svg",v="/portfolio/assets/wink.181984b7.svg";const g={props:{data:{type:Object}},data(){return{isLoading:!0,isError:!1,colorIndex:0}},created(){this.colorIndex=_(1,30)},methods:{pushUrl(){const{data:s}=this;"url"in s||"reposity"in s?window.open(s.url||s.reposity,"_blank"):this.$router.push({path:`/demo/${s.path}`})},load(){this.isLoading=!1},error(){this.isError=!0,this.isLoading=!1}}},n=s=>(m("data-v-46822d90"),s=s(),u(),s),x=["src"],y={key:1,class:"placeholder-cover"},b=n(()=>e("img",{class:"placeholder-cover1",src:f},null,-1)),k=n(()=>e("img",{class:"placeholder-cover2",src:v},null,-1)),I=[b,k],L={class:"card-info"},E={class:"card-info-title"},w={class:"card-info-desc"};function C(s,o,a,S,d,r){return i(),l("div",{class:"card flex-box-column",onClick:o[2]||(o[2]=(...t)=>r.pushUrl&&r.pushUrl(...t))},[e("div",{class:h(`header bg-color${d.colorIndex} ${d.isLoading?"animated-bg":""}`)},[d.isError?(i(),l("div",y,I)):(i(),l("img",{key:0,class:"cover",src:a.data.coverUrl,onLoad:o[0]||(o[0]=(...t)=>r.load&&r.load(...t)),onError:o[1]||(o[1]=(...t)=>r.error&&r.error(...t)),loading:"lazy"},null,40,x))],2),e("div",L,[e("div",E,c(a.data.title),1),e("div",w,c(a.data.desc),1)])])}const D=p(g,[["render",C],["__scopeId","data-v-46822d90"]]);export{D as C};
