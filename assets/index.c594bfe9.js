import{D as v}from"./index.7681396d.js";import{_ as w}from"./index.8184200a.js";/* empty css                 */import{o as h,m as u,z as s,J as p,a5 as d,K as X,r as D,a6 as I,c as _,w as b,D as V,F as B,H as f,G as x,O as S,a as k,L as M,M as L}from"./elementPlus.8845be7b.js";const U={name:"HotSpotItem",props:{areaInit:{type:Object,default:()=>{}},id:{type:Number,default:null}},data(){return{area:this.areaInit}},methods:{del(){this.$emit("del",this.id)},mouseDown(e){if(this.startX=e.clientX,this.startY=e.clientY,!document.onmousemove){const t=this.area.startX,i=this.area.startY;document.onmousemove=r=>{this.area.startX=t+r.clientX-this.startX,this.area.startY=i+r.clientY-this.startY}}},mouseUp(){document.onmousemove=null},shapeDown(e){if(this.start1X=e.clientX,this.start1Y=e.clientY,!document.onmousemove){const t=this.areaInit.width,i=this.areaInit.height;document.onmousemove=r=>{this.area.width=t+r.clientX-this.start1X,this.area.height=i+r.clientY-this.start1Y}}}}},F={class:"promptText"};function H(e,t,i,r,a,n){return h(),u("div",{class:"areaBox",style:X({width:i.areaInit.width+"px",height:i.areaInit.height+"px",left:i.areaInit.startX+"px",top:i.areaInit.startY+"px"}),onDblclick:t[3]||(t[3]=o=>e.editBoxShow=!0),onMousedown:t[4]||(t[4]=d(o=>n.mouseDown(o),["left","stop"])),onMouseup:t[5]||(t[5]=d(o=>n.mouseUp(o),["left","stop"]))},[s("span",F,"\u70ED\u533A"+p(i.id+1),1),s("div",{class:"del",onClick:t[0]||(t[0]=d(o=>n.del(),["stop"]))},"\xD7"),s("div",{class:"shape",onMousedown:t[1]||(t[1]=d(o=>n.shapeDown(o),["left","stop"])),onMouseup:t[2]||(t[2]=d(o=>n.mouseUp(o),["left","stop"]))},null,32)],36)}const N=w(U,[["render",H],["__scopeId","data-v-a2e1aca8"]]);const C={components:{Demo:v,HotSpotItem:N},data(){return{demoInfo:{title:"\u7ED8\u5236\u70ED\u533A",url:""},spotDataList:[],startX:0,startY:0,width:0,height:0,drawBoxVisible:!1}},methods:{mouseDown(e){this.drawBoxVisible=!0,this.startX=e.layerX,this.startY=e.layerY,document.onmousemove||(document.onmousemove=t=>{this.width=t.layerX-this.startX,this.height=t.layerY-this.startY})},mouseMove(e){this.drawBoxVisible&&(this.width=e.layerX-this.startX,this.height=e.layerY-this.startY)},mouseUp(e){document.onmousemove=null;const{drawBoxVisible:t,startX:i,startY:r,width:a,height:n}=this;if(t&&a>10&&n>10){const o={startX:i,startY:r,width:a,height:n,link:""};this.spotDataList.push(o)}this.drawBoxVisible=!1,this.startX=0,this.startY=0,this.width=0,this.height=0},delSpot(e){this.spotDataList.splice(e,1)}}},m=e=>(M("data-v-9c984629"),e=e(),L(),e),j={class:"hot-spot-list flex-box flex-wrap"},z={class:"info-header"},E={class:"info-content flex-box flex-v-center"},O=m(()=>s("div",{class:"label"},"\u8D77\u70B9\u5750\u6807\uFF1A",-1)),T={class:"info-content flex-box flex-v-center"},G=m(()=>s("div",{class:"label"},"\u70ED\u533A\u5BBD/\u9AD8\uFF1A",-1)),J={class:"info-content flex-box flex-v-center"},K=m(()=>s("div",{class:"label"},"\u70ED\u533A\u94FE\u63A5\uFF1A",-1));function q(e,t,i,r,a,n){const o=D("hot-spot-item"),Y=I,g=v;return h(),_(g,{data:a.demoInfo},{default:b(()=>[s("div",{class:"img-box",onMouseup:t[1]||(t[1]=d(l=>n.mouseUp(l),["left","stop"]))},[s("img",{class:"img",src:"https://s1.ax1x.com/2022/08/15/vdFt5F.jpg",alt:"",onMousedown:t[0]||(t[0]=d(l=>n.mouseDown(l),["left","stop"]))},null,32),V(s("div",{class:"spot",style:X({width:a.width+"px",height:a.height+"px",left:a.startX+"px",top:a.startY+"px"})},null,4),[[B,a.drawBoxVisible]]),(h(!0),u(x,null,f(a.spotDataList,(l,c)=>(h(),_(o,{id:c,key:c,"area-init":l,onDel:n.delSpot},null,8,["id","area-init","onDel"]))),128))],32),s("div",j,[(h(!0),u(x,null,f(a.spotDataList,(l,c)=>(h(),u("div",{class:"hot-spot-item",key:c},[s("div",z,"\u70ED\u533A"+p(c+1),1),s("div",E,[O,s("div",null,p(`(${l.startX},${l.startY})`),1)]),s("div",T,[G,S(" "+p(`${l.width}/${l.height}`),1)]),s("div",J,[K,k(Y,{modelValue:l.link,"onUpdate:modelValue":y=>l.link=y,class:"flex-item-1",placeholder:"\u8BF7\u8F93\u5165\u70ED\u533A\u94FE\u63A5"},null,8,["modelValue","onUpdate:modelValue"])])]))),128))])]),_:1},8,["data"])}const W=w(C,[["render",q],["__scopeId","data-v-9c984629"]]);export{W as default};