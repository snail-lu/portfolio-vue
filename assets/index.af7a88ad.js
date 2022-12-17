import{_ as N}from"./index.89375212.js";/* empty css                    */import{o as p,m as h,D as _,$ as M,a0 as q,a1 as G,a2 as J,a3 as K,k as g,h as b,b as A,u as y,q as Z,J as Q,c as D,w as C,f as z,a as O,F as S,G as W,Z as ee}from"./elementPlus.e195b922.js";import{_ as te}from"./index.d893d452.js";const ne={viewBox:"0 0 1024 1024",width:"1.2em",height:"1.2em"},re=_("path",{fill:"currentColor",d:"M160 160v704h704V160H160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32z"},null,-1),se=_("path",{fill:"currentColor",d:"M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64zM185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472l122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888l49.92 39.936l-215.808 269.824l-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072l-.64-.512a32 32 0 0 0-44.8 5.952L185.408 876.992z"},null,-1),oe=[re,se];function ie(t,e){return p(),h("svg",ne,oe)}const ae={name:"ep-picture",render:ie};var H;const x=typeof window<"u",le=t=>typeof t=="string",$=()=>{};x&&((H=window==null?void 0:window.navigator)==null?void 0:H.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function U(t){return M()?(q(t),!0):!1}var ue=Object.defineProperty,ce=Object.defineProperties,de=Object.getOwnPropertyDescriptors,T=Object.getOwnPropertySymbols,pe=Object.prototype.hasOwnProperty,_e=Object.prototype.propertyIsEnumerable,k=(t,e,n)=>e in t?ue(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,fe=(t,e)=>{for(var n in e||(e={}))pe.call(e,n)&&k(t,n,e[n]);if(T)for(var n of T(e))_e.call(e,n)&&k(t,n,e[n]);return t},ve=(t,e)=>ce(t,de(e));function he(t){if(!G(t))return J(t);const e=Array.isArray(t.value)?new Array(t.value.length):{};for(const n in t.value)e[n]=K(()=>({get(){return t.value[n]},set(r){if(Array.isArray(t.value)){const s=[...t.value];s[n]=r,t.value=s}else{const s=ve(fe({},t.value),{[n]:r});Object.setPrototypeOf(s,t.value),t.value=s}}}));return e}function F(t){var e;const n=y(t);return(e=n==null?void 0:n.$el)!=null?e:n}const I=x?window:void 0;x&&window.document;x&&window.navigator;x&&window.location;function P(...t){let e,n,r,s;if(le(t[0])?([n,r,s]=t,e=I):[e,n,r,s]=t,!e)return $;let a=$;const o=A(()=>F(e),c=>{a(),c&&(c.addEventListener(n,r,s),a=()=>{c.removeEventListener(n,r,s),a=$})},{immediate:!0,flush:"post"}),l=()=>{o(),a()};return U(l),l}const L=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},E="__vueuse_ssr_handlers__";L[E]=L[E]||{};L[E];var ge=Object.defineProperty,ye=Object.defineProperties,me=Object.getOwnPropertyDescriptors,B=Object.getOwnPropertySymbols,we=Object.prototype.hasOwnProperty,xe=Object.prototype.propertyIsEnumerable,V=(t,e,n)=>e in t?ge(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,be=(t,e)=>{for(var n in e||(e={}))we.call(e,n)&&V(t,n,e[n]);if(B)for(var n of B(e))xe.call(e,n)&&V(t,n,e[n]);return t},Oe=(t,e)=>ye(t,me(e));function $e(t,e={}){var n,r;const s=(n=e.draggingElement)!=null?n:I,a=g((r=e.initialValue)!=null?r:{x:0,y:0}),o=g(),l=i=>e.pointerTypes?e.pointerTypes.includes(i.pointerType):!0,c=i=>{y(e.preventDefault)&&i.preventDefault(),y(e.stopPropagation)&&i.stopPropagation()},v=i=>{var d;if(!l(i)||y(e.exact)&&i.target!==y(t))return;const m=y(t).getBoundingClientRect(),w={x:i.pageX-m.left,y:i.pageY-m.top};((d=e.onStart)==null?void 0:d.call(e,w,i))!==!1&&(o.value=w,c(i))},u=i=>{var d;!l(i)||!o.value||(a.value={x:i.pageX-o.value.x,y:i.pageY-o.value.y},(d=e.onMove)==null||d.call(e,a.value,i),c(i))},f=i=>{var d;!l(i)||!o.value||(o.value=void 0,(d=e.onEnd)==null||d.call(e,a.value,i),c(i))};return x&&(P(t,"pointerdown",v,!0),P(s,"pointermove",u,!0),P(s,"pointerup",f,!0)),Oe(be({},he(a)),{position:a,isDragging:b(()=>!!o.value),style:b(()=>`left:${a.value.x}px;top:${a.value.y}px;`)})}var X=Object.getOwnPropertySymbols,Pe=Object.prototype.hasOwnProperty,De=Object.prototype.propertyIsEnumerable,Le=(t,e)=>{var n={};for(var r in t)Pe.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&X)for(var r of X(t))e.indexOf(r)<0&&De.call(t,r)&&(n[r]=t[r]);return n};function Ee(t,e,n={}){const r=n,{window:s=I}=r,a=Le(r,["window"]);let o;const l=s&&"ResizeObserver"in s,c=()=>{o&&(o.disconnect(),o=void 0)},v=A(()=>F(t),f=>{c(),l&&s&&f&&(o=new ResizeObserver(e),o.observe(f,a))},{immediate:!0,flush:"post"}),u=()=>{c(),v()};return U(u),{isSupported:l,stop:u}}var Y;(function(t){t.UP="UP",t.RIGHT="RIGHT",t.DOWN="DOWN",t.LEFT="LEFT",t.NONE="NONE"})(Y||(Y={}));const Ne={__name:"index",props:{w:{type:Number,default:200},h:{type:Number,default:200},x:{type:Number,default:0},y:{type:Number,default:0}},setup(t){const e=t,n=g(null),r=g(null),s=g(""),a=g(e.w),o=g(e.h),{x:l,y:c,style:v}=$e(n,{initialValue:{x:e.x,y:e.y}});Ee(r,i=>{const d=i[0],{width:m,height:w}=d.contentRect;m&&w&&(a.value=m,o.value=w),s.value=`width: ${m}, height: ${w}`});const u=b(()=>`width:${a.value-3}px;height:${o.value-3}px`),f=b(()=>`${v.value}${u.value}`);return(i,d)=>(p(),h("div",{style:Q(y(f)),class:"draggable-resizable-box"},[_("div",{ref_key:"dragger",ref:n,class:"dragger"},null,512),Z(i.$slots,"default",{},void 0,!0),_("textarea",{ref_key:"resizer",ref:r,class:"resizer",disabled:""},null,512)],4))}},R=N(Ne,[["__scopeId","data-v-e5861628"]]);const Ie={components:{DraggableResizableBox:R},props:{src:{type:String,default:""},startX:{type:Number,default:0},startY:{type:Number,default:0},initialWidth:{type:Number,default:200},initialHeight:{type:Number,default:200}},data(){return{x:this.startX,y:this.startY,width:this.initialWidth,height:this.initialHeight}},methods:{onResize(t,e,n,r){this.x=t,this.y=e,this.width=n,this.height=r},onDrag(t,e){this.x=t,this.y=e},onDelete(){this.$emit("onDelete")},onImgLoad(t){console.log(t,"img data")}}},ze={class:"my-photo"},Se=["src"];function We(t,e,n,r,s,a){const o=R;return p(),D(o,{x:s.x,y:s.y,w:s.width,h:s.height},{default:C(()=>[_("div",ze,[_("div",{class:"close-icon",title:"\u5220\u9664",onClick:e[0]||(e[0]=(...l)=>a.onDelete&&a.onDelete(...l))},"\xD7"),_("img",{class:"pic",src:n.src,onLoad:e[1]||(e[1]=(...l)=>a.onImgLoad&&a.onImgLoad(...l)),draggable:"false"},null,40,Se)])]),_:1},8,["x","y","w","h"])}const j=N(Ie,[["render",We],["__scopeId","data-v-0b0bb36d"]]),He="/portfolio/assets/photo-1.e11df314.jpg",Te="/portfolio/assets/photo-2.ebdbf832.jpg",ke="/portfolio/assets/photo-3.45cd3c2e.jpg";const Be={class:"photo-wall-container"},Ve={class:"btn-groups flex-box flex-h-center flex-v-center"},Xe={class:"btn"},Ye={key:0,class:"photo-list"},je={key:1,class:"photo-list"},Ae={__name:"index",setup(t){const e=z([]),n=z([{uid:1,src:He,initialWidth:577,initialHeight:346,startX:430,startY:330},{uid:2,src:Te,initialWidth:426,initialHeight:258,startX:830,startY:68},{uid:3,src:ke,initialWidth:403,initialHeight:231,startX:147,startY:88}]);function r(o,l){this.fileList=l}function s(o){let l=-1;this.fileList.length>0?(l=this.fileList.findIndex(c=>c.uid===o),this.fileList.splice(l,1)):(l=this.exampleList.findIndex(c=>c.uid===o),this.exampleList.splice(l,1))}function a(o){return URL.createObjectURL(o)}return(o,l)=>{const c=ae,v=ee;return p(),h("div",Be,[_("div",Ve,[O(v,{action:"#",multiple:"","auto-upload":!1,"on-change":r,"show-file-list":!1},{default:C(()=>[O(c,{class:"btn el-icon-picture-outline upload-btn",title:"\u6253\u5F00\u672C\u5730\u56FE\u7247"})]),_:1}),_("div",Xe,[O(te)])]),e.length==0?(p(),h("div",Ye,[(p(!0),h(S,null,W(n,u=>(p(),D(j,{src:u.src,key:u.uid,"start-x":u.startX,"start-y":u.startY,"initial-width":u.initialWidth,"initial-height":u.initialHeight,onOnDelete:f=>s(u.uid)},null,8,["src","start-x","start-y","initial-width","initial-height","onOnDelete"]))),128))])):(p(),h("div",je,[(p(!0),h(S,null,W(e,u=>(p(),D(j,{src:a(u.raw),key:u.uid,onOnDelete:f=>s(u.uid)},null,8,["src","onOnDelete"]))),128))]))])}}},Me=N(Ae,[["__scopeId","data-v-eec16d95"]]);export{Me as default};
