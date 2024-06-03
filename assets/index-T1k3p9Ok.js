import{P as y,m as b,G as W,H as x,D as k,S as L,C as R,l as _,q as p,x as f,M as c,w as C,y as S,W as M,c as G}from"./threejs-ZyCy-Q1q.js";import{O as H}from"./OrbitControls-CKF_uHeE.js";import{_ as z}from"./index-BPsOo1ew.js";import{o as P,q as v}from"./elementPlus-OXnB-esK.js";function A(){const e=new y(35,1,.1,100);return e.position.set(-5,5,20),e}function D(){const e=new b(3);return e.position.set(-3.5,0,-3.5),e}function E(){return new W(6)}function $(){const e=new x("white","darkslategray",3),t=new k("white",2);return t.position.set(10,10,10),{ambientLight:e,mainLight:t}}function j(){const e=new L;return e.background=new R("skyblue"),e}function q(){const e=new _(2,2.25,1.5),t=new p(.75,.75,3,12),s=new p(.4,.4,1.75,16),n=new p(.3,.1,.5);return{cabin:e,nose:t,wheel:s,chimney:n}}function B(){const e=new f({color:"firebrick",flatShading:!0}),t=new f({color:"darkslategray",flatShading:!0});return{body:e,detail:t}}function F(){const e=q(),t=B(),s=new c(e.cabin,t.body);s.position.set(1.5,1.4,0);const n=new c(e.chimney,t.detail);n.position.set(-2,1.9,0);const o=new c(e.nose,t.body);o.position.set(-1,1,0),o.rotation.z=Math.PI/2;const i=new c(e.wheel,t.detail);i.position.y=.5,i.rotation.x=Math.PI/2;const u=i.clone();u.position.x=-1;const w=i.clone();w.position.x=-2;const m=i.clone();return m.position.set(1.5,.9,0),m.scale.set(2,1.25,2),{nose:o,cabin:s,chimney:n,smallWheelRear:i,smallWheelCenter:u,smallWheelFront:w,bigWheel:m}}const l=C.degToRad(24);class I extends S{constructor(){super(),this.meshes=F(),this.add(this.meshes.nose,this.meshes.cabin,this.meshes.chimney,this.meshes.smallWheelRear,this.meshes.smallWheelCenter,this.meshes.smallWheelFront,this.meshes.bigWheel)}tick(t){this.meshes.bigWheel.rotation.y+=l*t,this.meshes.smallWheelRear.rotation.y+=l*t,this.meshes.smallWheelCenter.rotation.y+=l*t,this.meshes.smallWheelFront.rotation.y+=l*t}}function T(e,t){const s=new H(e,t);return s.enableDamping=!0,s.target.y=1,s.autoRotate=!0,s.autoRotateSpeed=1,s.tick=()=>s.update(),s}function O(){const e=new M({antialias:!0});return e.physicallyCorrectLights=!0,e}const g=(e,t,s)=>{t.aspect=e.clientWidth/e.clientHeight,t.updateProjectionMatrix(),s.setSize(e.clientWidth,e.clientHeight),s.setPixelRatio(window.devicePixelRatio)};class U{constructor(t,s,n){g(t,s,n),window.addEventListener("resize",()=>{g(t,s,n),this.onResize()})}onResize(){}}const J=new G;class K{constructor(t,s,n){this.camera=t,this.scene=s,this.renderer=n,this.updatables=[]}start(){this.renderer.setAnimationLoop(()=>{this.tick(),this.renderer.render(this.scene,this.camera)})}stop(){this.renderer.setAnimationLoop(null)}tick(){const t=J.getDelta();for(const s of this.updatables)s.tick(t)}}let h,r,d,a;const N={name:"Train",data(){return{}},mounted(){this.init()},methods:{init(){const e=document.querySelector("#train-container");h=A(),r=O(),d=j(),a=new K(h,d,r),e.append(r.domElement);const t=T(h,r.domElement),{ambientLight:s,mainLight:n}=$(),o=new I;a.updatables.push(t,o),d.add(s,n,o),new U(e,h,r),d.add(D(),E()),a.start()},start(){a.start()},stop(){a.stop()}}},Q={class:"three-js-container",id:"train-container"};function V(e,t,s,n,o,i){return P(),v("div",Q)}const te=z(N,[["render",V],["__scopeId","data-v-9833156a"]]);export{te as default};