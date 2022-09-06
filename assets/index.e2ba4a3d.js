import{_ as We}from"./index.12e04982.js";import{E as tt,V as c,M as V,T as X,Q as Ce,S as De,a as N,b as Q,C as oe,F as ot,P as nt,c as fe,d as Re,e as Ye,W as at,U as me,f as Oe,g as Ue,B as it,h as Be,i as Le,A as rt,j as Ae,k as st,l as ct,m as lt,n as Ne,o as ut,O as ft,p as ke,q as dt,r as mt,s as pt,R as ht,t as vt,u as ze}from"./threejs.95b28899.js";import{_ as gt}from"./index.2dff9388.js";import{o as wt,t as yt,a as je,b as xt}from"./elementPlus.e1b2604b.js";const Ie={type:"change"},de={type:"start"},Fe={type:"end"};class He extends tt{constructor(x,n){super(),n===void 0&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),n===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=x,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new c,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:V.ROTATE,MIDDLE:V.DOLLY,RIGHT:V.PAN},this.touches={ONE:X.ROTATE,TWO:X.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return s.phi},this.getAzimuthalAngle=function(){return s.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(t){t.addEventListener("keydown",Pe),this._domElementKeyEvents=t},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(Ie),e.update(),r=i.NONE},this.update=function(){const t=new c,o=new Ce().setFromUnitVectors(x.up,new c(0,1,0)),d=o.clone().invert(),p=new c,O=new Ce,Z=2*Math.PI;return function(){const _e=e.object.position;t.copy(_e).sub(e.target),t.applyQuaternion(o),s.setFromVector3(t),e.autoRotate&&r===i.NONE&&H(R()),e.enableDamping?(s.theta+=g.theta*e.dampingFactor,s.phi+=g.phi*e.dampingFactor):(s.theta+=g.theta,s.phi+=g.phi);let I=e.minAzimuthAngle,F=e.maxAzimuthAngle;return isFinite(I)&&isFinite(F)&&(I<-Math.PI?I+=Z:I>Math.PI&&(I-=Z),F<-Math.PI?F+=Z:F>Math.PI&&(F-=Z),I<=F?s.theta=Math.max(I,Math.min(F,s.theta)):s.theta=s.theta>(I+F)/2?Math.max(I,s.theta):Math.min(F,s.theta)),s.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,s.phi)),s.makeSafe(),s.radius*=L,s.radius=Math.max(e.minDistance,Math.min(e.maxDistance,s.radius)),e.enableDamping===!0?e.target.addScaledVector(h,e.dampingFactor):e.target.add(h),t.setFromSpherical(s),t.applyQuaternion(d),_e.copy(e.target).add(t),e.object.lookAt(e.target),e.enableDamping===!0?(g.theta*=1-e.dampingFactor,g.phi*=1-e.dampingFactor,h.multiplyScalar(1-e.dampingFactor)):(g.set(0,0,0),h.set(0,0,0)),L=1,C||p.distanceToSquared(e.object.position)>b||8*(1-O.dot(e.object.quaternion))>b?(e.dispatchEvent(Ie),p.copy(e.object.position),O.copy(e.object.quaternion),C=!1,!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",Me),e.domElement.removeEventListener("pointerdown",xe),e.domElement.removeEventListener("pointercancel",be),e.domElement.removeEventListener("wheel",Ee),e.domElement.removeEventListener("pointermove",ce),e.domElement.removeEventListener("pointerup",le),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",Pe)};const e=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=i.NONE;const b=1e-6,s=new De,g=new De;let L=1;const h=new c;let C=!1;const E=new N,P=new N,D=new N,M=new N,S=new N,u=new N,l=new N,f=new N,T=new N,a=[],k={};function R(){return 2*Math.PI/60/60*e.autoRotateSpeed}function A(){return Math.pow(.95,e.zoomSpeed)}function H(t){g.theta-=t}function W(t){g.phi-=t}const U=function(){const t=new c;return function(d,p){t.setFromMatrixColumn(p,0),t.multiplyScalar(-d),h.add(t)}}(),v=function(){const t=new c;return function(d,p){e.screenSpacePanning===!0?t.setFromMatrixColumn(p,1):(t.setFromMatrixColumn(p,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(d),h.add(t)}}(),z=function(){const t=new c;return function(d,p){const O=e.domElement;if(e.object.isPerspectiveCamera){const Z=e.object.position;t.copy(Z).sub(e.target);let te=t.length();te*=Math.tan(e.object.fov/2*Math.PI/180),U(2*d*te/O.clientHeight,e.object.matrix),v(2*p*te/O.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(U(d*(e.object.right-e.object.left)/e.object.zoom/O.clientWidth,e.object.matrix),v(p*(e.object.top-e.object.bottom)/e.object.zoom/O.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function B(t){e.object.isPerspectiveCamera?L/=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom*t)),e.object.updateProjectionMatrix(),C=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function y(t){e.object.isPerspectiveCamera?L*=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/t)),e.object.updateProjectionMatrix(),C=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function m(t){E.set(t.clientX,t.clientY)}function ae(t){l.set(t.clientX,t.clientY)}function j(t){M.set(t.clientX,t.clientY)}function _(t){P.set(t.clientX,t.clientY),D.subVectors(P,E).multiplyScalar(e.rotateSpeed);const o=e.domElement;H(2*Math.PI*D.x/o.clientHeight),W(2*Math.PI*D.y/o.clientHeight),E.copy(P),e.update()}function ie(t){f.set(t.clientX,t.clientY),T.subVectors(f,l),T.y>0?B(A()):T.y<0&&y(A()),l.copy(f),e.update()}function re(t){S.set(t.clientX,t.clientY),u.subVectors(S,M).multiplyScalar(e.panSpeed),z(u.x,u.y),M.copy(S),e.update()}function se(t){t.deltaY<0?y(A()):t.deltaY>0&&B(A()),e.update()}function ee(t){let o=!1;switch(t.code){case e.keys.UP:z(0,e.keyPanSpeed),o=!0;break;case e.keys.BOTTOM:z(0,-e.keyPanSpeed),o=!0;break;case e.keys.LEFT:z(e.keyPanSpeed,0),o=!0;break;case e.keys.RIGHT:z(-e.keyPanSpeed,0),o=!0;break}o&&(t.preventDefault(),e.update())}function pe(){if(a.length===1)E.set(a[0].pageX,a[0].pageY);else{const t=.5*(a[0].pageX+a[1].pageX),o=.5*(a[0].pageY+a[1].pageY);E.set(t,o)}}function he(){if(a.length===1)M.set(a[0].pageX,a[0].pageY);else{const t=.5*(a[0].pageX+a[1].pageX),o=.5*(a[0].pageY+a[1].pageY);M.set(t,o)}}function ve(){const t=a[0].pageX-a[1].pageX,o=a[0].pageY-a[1].pageY,d=Math.sqrt(t*t+o*o);l.set(0,d)}function Ve(){e.enableZoom&&ve(),e.enablePan&&he()}function Xe(){e.enableZoom&&ve(),e.enableRotate&&pe()}function ge(t){if(a.length==1)P.set(t.pageX,t.pageY);else{const d=ue(t),p=.5*(t.pageX+d.x),O=.5*(t.pageY+d.y);P.set(p,O)}D.subVectors(P,E).multiplyScalar(e.rotateSpeed);const o=e.domElement;H(2*Math.PI*D.x/o.clientHeight),W(2*Math.PI*D.y/o.clientHeight),E.copy(P)}function we(t){if(a.length===1)S.set(t.pageX,t.pageY);else{const o=ue(t),d=.5*(t.pageX+o.x),p=.5*(t.pageY+o.y);S.set(d,p)}u.subVectors(S,M).multiplyScalar(e.panSpeed),z(u.x,u.y),M.copy(S)}function ye(t){const o=ue(t),d=t.pageX-o.x,p=t.pageY-o.y,O=Math.sqrt(d*d+p*p);f.set(0,O),T.set(0,Math.pow(f.y/l.y,e.zoomSpeed)),B(T.y),l.copy(f)}function Ge(t){e.enableZoom&&ye(t),e.enablePan&&we(t)}function Ke(t){e.enableZoom&&ye(t),e.enableRotate&&ge(t)}function xe(t){e.enabled!==!1&&(a.length===0&&(e.domElement.setPointerCapture(t.pointerId),e.domElement.addEventListener("pointermove",ce),e.domElement.addEventListener("pointerup",le)),et(t),t.pointerType==="touch"?Qe(t):qe(t))}function ce(t){e.enabled!==!1&&(t.pointerType==="touch"?Je(t):$e(t))}function le(t){Se(t),a.length===0&&(e.domElement.releasePointerCapture(t.pointerId),e.domElement.removeEventListener("pointermove",ce),e.domElement.removeEventListener("pointerup",le)),e.dispatchEvent(Fe),r=i.NONE}function be(t){Se(t)}function qe(t){let o;switch(t.button){case 0:o=e.mouseButtons.LEFT;break;case 1:o=e.mouseButtons.MIDDLE;break;case 2:o=e.mouseButtons.RIGHT;break;default:o=-1}switch(o){case V.DOLLY:if(e.enableZoom===!1)return;ae(t),r=i.DOLLY;break;case V.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;j(t),r=i.PAN}else{if(e.enableRotate===!1)return;m(t),r=i.ROTATE}break;case V.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;m(t),r=i.ROTATE}else{if(e.enablePan===!1)return;j(t),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&e.dispatchEvent(de)}function $e(t){if(e.enabled!==!1)switch(r){case i.ROTATE:if(e.enableRotate===!1)return;_(t);break;case i.DOLLY:if(e.enableZoom===!1)return;ie(t);break;case i.PAN:if(e.enablePan===!1)return;re(t);break}}function Ee(t){e.enabled===!1||e.enableZoom===!1||r!==i.NONE||(t.preventDefault(),e.dispatchEvent(de),se(t),e.dispatchEvent(Fe))}function Pe(t){e.enabled===!1||e.enablePan===!1||ee(t)}function Qe(t){switch(Te(t),a.length){case 1:switch(e.touches.ONE){case X.ROTATE:if(e.enableRotate===!1)return;pe(),r=i.TOUCH_ROTATE;break;case X.PAN:if(e.enablePan===!1)return;he(),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(e.touches.TWO){case X.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ve(),r=i.TOUCH_DOLLY_PAN;break;case X.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Xe(),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&e.dispatchEvent(de)}function Je(t){switch(Te(t),r){case i.TOUCH_ROTATE:if(e.enableRotate===!1)return;ge(t),e.update();break;case i.TOUCH_PAN:if(e.enablePan===!1)return;we(t),e.update();break;case i.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ge(t),e.update();break;case i.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ke(t),e.update();break;default:r=i.NONE}}function Me(t){e.enabled!==!1&&t.preventDefault()}function et(t){a.push(t)}function Se(t){delete k[t.pointerId];for(let o=0;o<a.length;o++)if(a[o].pointerId==t.pointerId){a.splice(o,1);return}}function Te(t){let o=k[t.pointerId];o===void 0&&(o=new N,k[t.pointerId]=o),o.set(t.pageX,t.pageY)}function ue(t){const o=t.pointerId===a[0].pointerId?a[1]:a[0];return k[o.pointerId]}e.domElement.addEventListener("contextmenu",Me),e.domElement.addEventListener("pointerdown",xe),e.domElement.addEventListener("pointercancel",be),e.domElement.addEventListener("wheel",Ee,{passive:!1}),this.update()}}class Ze extends Q{constructor(x,n={}){super(x);const e=this,i=n.textureWidth!==void 0?n.textureWidth:512,r=n.textureHeight!==void 0?n.textureHeight:512,b=n.clipBias!==void 0?n.clipBias:0,s=n.alpha!==void 0?n.alpha:1,g=n.time!==void 0?n.time:0,L=n.waterNormals!==void 0?n.waterNormals:null,h=n.sunDirection!==void 0?n.sunDirection:new c(.70707,.70707,0),C=new oe(n.sunColor!==void 0?n.sunColor:16777215),E=new oe(n.waterColor!==void 0?n.waterColor:8355711),P=n.eye!==void 0?n.eye:new c(0,0,0),D=n.distortionScale!==void 0?n.distortionScale:20,M=n.side!==void 0?n.side:ot,S=n.fog!==void 0?n.fog:!1,u=new nt,l=new c,f=new c,T=new c,a=new fe,k=new c(0,0,-1),R=new Re,A=new c,H=new c,W=new Re,U=new fe,v=new Ye,z=new at(i,r),B={uniforms:me.merge([Oe.fog,Oe.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new fe},sunColor:{value:new oe(8355711)},sunDirection:{value:new c(.70707,.70707,0)},eye:{value:new c},waterColor:{value:new oe(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.3;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <fog_fragment>
				}`},y=new Ue({fragmentShader:B.fragmentShader,vertexShader:B.vertexShader,uniforms:me.clone(B.uniforms),lights:!0,side:M,fog:S});y.uniforms.mirrorSampler.value=z.texture,y.uniforms.textureMatrix.value=U,y.uniforms.alpha.value=s,y.uniforms.time.value=g,y.uniforms.normalSampler.value=L,y.uniforms.sunColor.value=C,y.uniforms.waterColor.value=E,y.uniforms.sunDirection.value=h,y.uniforms.distortionScale.value=D,y.uniforms.eye.value=P,e.material=y,e.onBeforeRender=function(m,ae,j){if(f.setFromMatrixPosition(e.matrixWorld),T.setFromMatrixPosition(j.matrixWorld),a.extractRotation(e.matrixWorld),l.set(0,0,1),l.applyMatrix4(a),A.subVectors(f,T),A.dot(l)>0)return;A.reflect(l).negate(),A.add(f),a.extractRotation(j.matrixWorld),k.set(0,0,-1),k.applyMatrix4(a),k.add(T),H.subVectors(f,k),H.reflect(l).negate(),H.add(f),v.position.copy(A),v.up.set(0,1,0),v.up.applyMatrix4(a),v.up.reflect(l),v.lookAt(H),v.far=j.far,v.updateMatrixWorld(),v.projectionMatrix.copy(j.projectionMatrix),U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(v.projectionMatrix),U.multiply(v.matrixWorldInverse),u.setFromNormalAndCoplanarPoint(l,f),u.applyMatrix4(v.matrixWorldInverse),R.set(u.normal.x,u.normal.y,u.normal.z,u.constant);const _=v.projectionMatrix;W.x=(Math.sign(R.x)+_.elements[8])/_.elements[0],W.y=(Math.sign(R.y)+_.elements[9])/_.elements[5],W.z=-1,W.w=(1+_.elements[10])/_.elements[14],R.multiplyScalar(2/R.dot(W)),_.elements[2]=R.x,_.elements[6]=R.y,_.elements[10]=R.z+1-b,_.elements[14]=R.w,P.setFromMatrixPosition(j.matrixWorld);const ie=m.getRenderTarget(),re=m.xr.enabled,se=m.shadowMap.autoUpdate;e.visible=!1,m.xr.enabled=!1,m.shadowMap.autoUpdate=!1,m.setRenderTarget(z),m.state.buffers.depth.setMask(!0),m.autoClear===!1&&m.clear(),m.render(ae,v),e.visible=!0,m.xr.enabled=re,m.shadowMap.autoUpdate=se,m.setRenderTarget(ie);const ee=j.viewport;ee!==void 0&&m.state.viewport(ee)}}}Ze.prototype.isWater=!0;class J extends Q{constructor(){const x=J.SkyShader,n=new Ue({name:"SkyShader",fragmentShader:x.fragmentShader,vertexShader:x.vertexShader,uniforms:me.clone(x.uniforms),side:it,depthWrite:!1});super(new Be(1,1,1),n)}}J.prototype.isSky=!0;J.SkyShader={uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new c},up:{value:new c(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPos );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <encodings_fragment>

		}`};var bt="/portfolio-vue/assets/waternormals.add9912b.jpg";let G,K,Y,q,$,ne;const Et={name:"ThreeModel",components:{FullScreenButton:We},data(){return{}},mounted(){this.init(),this.animate()},methods:{initExample(){const w=new Le,x=new rt(250);w.add(x);const n=new Be(100,100,100),e=new Ae({color:255}),i=new Q(n,e);w.add(i);const r=new st(60,40,40),b=new ct({color:16711935,specular:4491502,shininess:12}),s=new Q(r,b);s.translateY(110),w.add(s);const g=new lt(50,50,100,25),L=new Ae({color:16776960}),h=new Q(g,L);h.position.set(120,0,0),w.add(h);const C=new Ne(16777215);C.position.set(400,200,300),w.add(C);const E=new Ne(16777215);E.position.set(-400,-200,-300),w.add(E);const P=new ut(4473924);w.add(P);const D=700,M=600,S=D/M,u=200,l=new ft(-u*S,u*S,u,-u,1,1e3);l.position.set(200,100,200),l.lookAt(w.position);const f=new ke({canvas:this.$refs.container});f.setSize(D,M),f.setClearColor(16777215,1);function T(){f.render(w,l)}T(),new He(l,f.domElement).addEventListener("change",T)},init(){K=new Le,Y=new ke({canvas:this.$refs.container});const{innerWidth:w,innerHeight:x,devicePixelRatio:n}=window;Y.setPixelRatio(n);const e=(Math.floor(x*n)/n).toFixed(2);Y.setSize(w,e),Y.toneMapping=dt,G=new Ye(55,window.innerWidth/window.innerHeight,1,2e4),G.position.set(30,30,100);const i=new mt(1e4,1e4);$=new Ze(i,{textureWidth:512,textureHeight:512,waterNormals:new pt().load(bt,function(h){h.wrapS=h.wrapT=ht}),sunDirection:new c,sunColor:16777215,waterColor:7695,distortionScale:3.7,fog:K.fog!==void 0}),$.rotation.x=-Math.PI/2,K.add($);const r=new J;r.scale.setScalar(1e4),K.add(r);const b=r.material.uniforms;b.turbidity.value=10,b.rayleigh.value=2,b.mieCoefficient.value=.005,b.mieDirectionalG.value=.8;const s={elevation:2,azimuth:180};ne=new c;const g=new vt(Y);function L(){const h=ze.degToRad(90-s.elevation),C=ze.degToRad(s.azimuth);ne.setFromSphericalCoords(1,h,C),r.material.uniforms.sunPosition.value.copy(ne),$.material.uniforms.sunDirection.value.copy(ne).normalize(),K.environment=g.fromScene(r).texture}L(),q=new He(G,Y.domElement),q.maxPolarAngle=Math.PI*.495,q.target.set(0,10,0),q.minDistance=40,q.maxDistance=200,q.update(),window.addEventListener("resize",this.onWindowResize)},onWindowResize(){G.aspect=window.innerWidth/window.innerHeight,G.updateProjectionMatrix(),Y.setSize(window.innerWidth,window.innerHeight)},animate(){requestAnimationFrame(this.animate),this.render()},render(){$.material.uniforms.time.value+=1/60,Y.render(K,G)}}},Pt={class:"three-js-container"},Mt={id:"container",ref:"container"},St={class:"full-screen-btn"};function Tt(w,x,n,e,i,r){const b=We;return wt(),yt("div",Pt,[je("canvas",Mt,null,512),je("div",St,[xt(b)])])}var Ot=gt(Et,[["render",Tt],["__scopeId","data-v-774fd2cf"]]);export{Ot as default};
