import{c as _,y as M,l as x,f as S,h as l,T as p,i as w,M as f,x as h,V as g,m as L,z as y}from"./threejs.3bf0cb79.js";import{O as R}from"./OrbitControls.07551cf4.js";import{_ as b}from"./index.bca012f4.js";import{o as k,t as v}from"./elementPlus.012b8bf8.js";function A(){const{innerWidth:t,innerHeight:n}=window,e=new _(45,t/n,.1,1e3);return e.position.set(10,5,20),e}function E(){const t=new M(16777215);t.position.set(-3,0,20),t.intensity=2,t.castShadow=!0;const n=new x(13421772);return n.intensity=.1,{mainLight:t,ambientLight:n}}function G(){return new S}function P(){return new l(.82,16,16)}const T="/portfolio-vue/assets/moon.7f95972e.jpg";function z(){const t=new p;return new w({shininess:5,map:t.load(T)})}function I(){const t=P(),n=z(),e=new f(t,n);e.receiveShadow=!0,e.castShadow=!0;const o=new h;return e.tick=()=>{const s=o.getElapsedTime();e.position.set(Math.sin(s)*7,0,Math.cos(s)*7)},e}function O(){return new l(2.5,16,16)}const C="/portfolio-vue/assets/earth.ebd53049.jpg";function D(){const t=new p;return new w({shininess:5,map:t.load(C)})}function $(){const t=O(),n=D(),e=new f(t,n);e.receiveShadow=!0,e.castShadow=!0;let o=0;const s=new h;return e.tick=()=>{const r=new g(0,1,0),m=s.getElapsedTime();e.rotateOnAxis(r,(m-o)*Math.PI/20),o=m},e}function j(t,n){const e=new R(t,n);return e.maxPolarAngle=Math.PI*.495,e.target.set(0,0,0),e.enableDamping=!0,e.tick=()=>e.update(),e}function U(){const t=new L;return t.shadowMap.enabled=!0,t.shadowMap.type=y,t}const u=({clientWidth:t,clientHeight:n},e,o)=>{e.aspect=t/n,e.updateProjectionMatrix(),o.setSize(t,n),o.setPixelRatio(window.devicePixelRatio)};class B{constructor(n,e,o){u(n,e,o),window.addEventListener("resize",()=>{u(n,e,o),this.onResize()})}onResize(){}}const H=new h;class N{constructor(n,e,o){this.camera=n,this.scene=e,this.renderer=o,this.updatables=[]}start(){this.renderer.setAnimationLoop(()=>{this.tick(),this.renderer.render(this.scene,this.camera)})}stop(){this.renderer.setAnimationLoop(null)}tick(){const n=H.getDelta();for(const e of this.updatables)e.tick(n)}}let i,a,c,d;const V={name:"EarthMoon",data(){return{}},mounted(){this.init()},methods:{init(){const t=document.querySelector("#earth-moon-container");i=A(),c=U(),a=G(),d=new N(i,a,c),t.append(c.domElement);const n=j(i,c.domElement),{mainLight:e,ambientLight:o}=E();a.add(e,o),new B(t,i,c);const s=new I;a.add(s);const r=new $;a.add(r),d.updatables.push(n,s,r),this.start()},start(){d.start()},stop(){d.stop()}}},q={class:"earth-moon-container",id:"earth-moon-container"};function F(t,n,e,o,s,r){return k(),v("div",q)}const X=b(V,[["render",F],["__scopeId","data-v-8340692e"]]);export{X as default};
