import{_ as L}from"./index.89375212.js";/* empty css                     *//* empty css                    *//* empty css                */import{f as k,i as F,d as T,a as N,_ as O}from"./file.4201dd3f.js";/* empty css                        *//* empty css                  *//* empty css                       *//* empty css                 *//* empty css                 */import{g as h}from"./date.9a6a4d57.js";import{D as B}from"./index.fa28b543.js";import{O as C,f as j,b as D,k as f,S as G,U as H,V as S,W,X,R as Y,Y as Z,Z as $,_ as q,o as m,c as i,w as t,a,N as p,H as g}from"./elementPlus.e195b922.js";const z={__name:"index",setup(A){const U={title:"\u56FE\u7247\u6C34\u5370",url:""},x=C(),e=j({text:h(),imgUrl:"https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF",transformedImgUrl:"",type:1});D(()=>e.type,()=>{e.transformedImgUrl=""});const _=f([]),d=f("");async function b(n){console.log(n,"upload file"),d.value=URL.createObjectURL(n.raw);let o=await k(n.raw);const c=F(o,e.text),l=T(c,"a"),r=URL.createObjectURL(l);e.transformedImgUrl=r,_.value=[r]}async function v(){if(e.imgUrl){const n=await N(e.imgUrl,e.text),o=URL.createObjectURL(n);e.transformedImgUrl=o,_.value=[o]}else x.proxy.$message.error("\u8BF7\u8F93\u5165\u7F51\u7EDC\u56FE\u7247\u5730\u5740")}return(n,o)=>{const c=G,l=H,r=S,y=W,w=X,u=Y,I=O,V=Z,R=$,E=q;return m(),i(B,{data:U},{default:t(()=>[a(E,{model:e,"label-width":"120px"},{default:t(()=>[a(l,{label:"\u6C34\u5370\u5185\u5BB9\uFF1A"},{default:t(()=>[a(c,{modelValue:e.text,"onUpdate:modelValue":o[0]||(o[0]=s=>e.text=s)},null,8,["modelValue"])]),_:1}),a(l,{label:"\u56FE\u7247\u7C7B\u578B\uFF1A"},{default:t(()=>[a(y,{modelValue:e.type,"onUpdate:modelValue":o[1]||(o[1]=s=>e.type=s)},{default:t(()=>[a(r,{label:1},{default:t(()=>[p("\u7F51\u7EDC\u56FE\u7247")]),_:1}),a(r,{label:2},{default:t(()=>[p("\u672C\u5730\u56FE\u7247")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e.type==1?(m(),i(l,{key:0,label:"\u56FE\u7247\u5730\u5740\uFF1A"},{default:t(()=>[a(c,{modelValue:e.imgUrl,"onUpdate:modelValue":o[2]||(o[2]=s=>e.imgUrl=s)},{append:t(()=>[a(w,{onClick:v},{default:t(()=>[p("\u6DFB\u52A0\u6C34\u5370")]),_:1})]),_:1},8,["modelValue"])]),_:1})):g("",!0),e.type==2?(m(),i(l,{key:1,label:"\u672C\u5730\u56FE\u7247\uFF1A"},{default:t(()=>[a(R,{class:"avatar-uploader",action:"#","auto-upload":!1,"on-change":b,"show-file-list":!1},{default:t(()=>[d.value?(m(),i(u,{key:0,src:d.value,class:"avatar",fit:"contain"},null,8,["src"])):(m(),i(V,{key:1,class:"avatar-uploader-icon"},{default:t(()=>[a(I)]),_:1}))]),_:1})]),_:1})):g("",!0),a(l,{label:"\u6C34\u5370\u6548\u679C\uFF1A"},{default:t(()=>[a(u,{style:{width:"150px",height:"150px"},src:e.transformedImgUrl,"preview-src-list":_.value,fit:"contain"},null,8,["src","preview-src-list"])]),_:1})]),_:1},8,["model"])]),_:1})}}},me=L(z,[["__scopeId","data-v-dea32bc4"]]);export{me as default};
