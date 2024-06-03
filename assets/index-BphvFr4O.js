import{P as M,z as S,s as g,S as x,o as l,T as p,p as w,M as f,c as h,V as L,W as _,E}from"./threejs-ZyCy-Q1q.js";import{O as R}from"./OrbitControls-CKF_uHeE.js";import{_ as k}from"./index-qd-9JBwJ.js";import{o as A,q as b}from"./elementPlus-OXnB-esK.js";function y(){const{innerWidth:t,innerHeight:o}=window,e=new M(45,t/o,.1,1e3);return e.position.set(10,5,20),e}function G(){const t=new S(16777215);t.position.set(-3,0,20),t.intensity=2,t.castShadow=!0;const o=new g(13421772);return o.intensity=.1,{mainLight:t,ambientLight:o}}function P(){return new x}function v(){return new l(.82,16,16)}const C="/portfolio-vue/assets/moon-CELKnLwA.jpg";function T(){const t=new p;return new w({shininess:5,map:t.load(C)})}function z(){const t=v(),o=T(),e=new f(t,o);e.receiveShadow=!0,e.castShadow=!0;const n=new h;return e.tick=()=>{const s=n.getElapsedTime();e.position.set(Math.sin(s)*7,0,Math.cos(s)*7)},e}function I(){return new l(2.5,16,16)}const O="/portfolio-vue/assets/earth-CmYohgJj.jpg";function D(){const t=new p;return new w({shininess:5,map:t.load(O)})}function $(){const t=I(),o=D(),e=new f(t,o);e.receiveShadow=!0,e.castShadow=!0;let n=0;const s=new h;return e.tick=()=>{const r=new L(0,1,0),m=s.getElapsedTime();e.rotateOnAxis(r,(m-n)*Math.PI/20),n=m},e}function j(t,o){const e=new R(t,o);return e.maxPolarAngle=Math.PI*.495,e.target.set(0,0,0),e.enableDamping=!0,e.tick=()=>e.update(),e}function U(){const t=new _;return t.shadowMap.enabled=!0,t.shadowMap.type=E,t}const u=({clientWidth:t,clientHeight:o},e,n)=>{e.aspect=t/o,e.updateProjectionMatrix(),n.setSize(t,o),n.setPixelRatio(window.devicePixelRatio)};class q{constructor(o,e,n){u(o,e,n),window.addEventListener("resize",()=>{u(o,e,n),this.onResize()})}onResize(){}}const B=new h;class H{constructor(o,e,n){this.camera=o,this.scene=e,this.renderer=n,this.updatables=[]}start(){this.renderer.setAnimationLoop(()=>{this.tick(),this.renderer.render(this.scene,this.camera)})}stop(){this.renderer.setAnimationLoop(null)}tick(){const o=B.getDelta();for(const e of this.updatables)e.tick(o)}}let i,a,c,d;const N={name:"EarthMoon",data(){return{}},mounted(){this.init()},methods:{init(){const t=document.querySelector("#earth-moon-container");i=y(),c=U(),a=P(),d=new H(i,a,c),t.append(c.domElement);const o=j(i,c.domElement),{mainLight:e,ambientLight:n}=G();a.add(e,n),new q(t,i,c);const s=new z;a.add(s);const r=new $;a.add(r),d.updatables.push(o,s,r),this.start()},start(){d.start()},stop(){d.stop()}}},V={class:"earth-moon-container",id:"earth-moon-container"};function W(t,o,e,n,s,r){return A(),b("div",V)}const Q=k(N,[["render",W],["__scopeId","data-v-a3ae0d98"]]);export{Q as default};
