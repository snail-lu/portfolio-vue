import{_ as ne}from"./index-CGaWzxvd.js";import{M as T,V as o,C as H,d as me,e as U,P as ae,f as de,U as j,g as q,h as ie,i as ve,j as Z,k as pe,l as re,S as X,m as he,n as Y,o as ge,p as we,q as xe,r as J,s as ye,O as Se,W as Q,t as Me,u as Ce,T as _e,R as Pe,v as Ee,w as ee}from"./threejs-ZyCy-Q1q.js";import{O as te}from"./OrbitControls-CKF_uHeE.js";import{_ as be}from"./index-BPsOo1ew.js";import{o as Re,q as De,K as oe,a as ze}from"./elementPlus-OXnB-esK.js";class se extends T{constructor(u,e={}){super(u);const r=this,w=e.textureWidth!==void 0?e.textureWidth:512,f=e.textureHeight!==void 0?e.textureHeight:512,m=e.clipBias!==void 0?e.clipBias:0,g=e.alpha!==void 0?e.alpha:1,E=e.time!==void 0?e.time:0,b=e.waterNormals!==void 0?e.waterNormals:null,v=e.sunDirection!==void 0?e.sunDirection:new o(.70707,.70707,0),x=new H(e.sunColor!==void 0?e.sunColor:16777215),L=new H(e.waterColor!==void 0?e.waterColor:8355711),F=e.eye!==void 0?e.eye:new o(0,0,0),B=e.distortionScale!==void 0?e.distortionScale:20,A=e.side!==void 0?e.side:me,k=e.fog!==void 0?e.fog:!1,s=new ve,i=new o,l=new o,y=new o,S=new U,N=new o(0,0,-1),p=new Z,R=new o,I=new o,D=new Z,G=new U,a=new ae,$=new de(w,f),O={uniforms:j.merge([q.fog,q.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new U},sunColor:{value:new H(8355711)},sunDirection:{value:new o(.70707,.70707,0)},eye:{value:new o},waterColor:{value:new H(5592405)}}]),vertexShader:`
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
				}`},c=new ie({fragmentShader:O.fragmentShader,vertexShader:O.vertexShader,uniforms:j.clone(O.uniforms),lights:!0,side:A,fog:k});c.uniforms.mirrorSampler.value=$.texture,c.uniforms.textureMatrix.value=G,c.uniforms.alpha.value=g,c.uniforms.time.value=E,c.uniforms.normalSampler.value=b,c.uniforms.sunColor.value=x,c.uniforms.waterColor.value=L,c.uniforms.sunDirection.value=v,c.uniforms.distortionScale.value=B,c.uniforms.eye.value=F,r.material=c,r.onBeforeRender=function(t,le,M){if(l.setFromMatrixPosition(r.matrixWorld),y.setFromMatrixPosition(M.matrixWorld),S.extractRotation(r.matrixWorld),i.set(0,0,1),i.applyMatrix4(S),R.subVectors(l,y),R.dot(i)>0)return;R.reflect(i).negate(),R.add(l),S.extractRotation(M.matrixWorld),N.set(0,0,-1),N.applyMatrix4(S),N.add(y),I.subVectors(l,N),I.reflect(i).negate(),I.add(l),a.position.copy(R),a.up.set(0,1,0),a.up.applyMatrix4(S),a.up.reflect(i),a.lookAt(I),a.far=M.far,a.updateMatrixWorld(),a.projectionMatrix.copy(M.projectionMatrix),G.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),G.multiply(a.projectionMatrix),G.multiply(a.matrixWorldInverse),s.setFromNormalAndCoplanarPoint(i,l),s.applyMatrix4(a.matrixWorldInverse),p.set(s.normal.x,s.normal.y,s.normal.z,s.constant);const d=a.projectionMatrix;D.x=(Math.sign(p.x)+d.elements[8])/d.elements[0],D.y=(Math.sign(p.y)+d.elements[9])/d.elements[5],D.z=-1,D.w=(1+d.elements[10])/d.elements[14],p.multiplyScalar(2/p.dot(D)),d.elements[2]=p.x,d.elements[6]=p.y,d.elements[10]=p.z+1-m,d.elements[14]=p.w,F.setFromMatrixPosition(M.matrixWorld);const ce=t.getRenderTarget(),ue=t.xr.enabled,fe=t.shadowMap.autoUpdate;r.visible=!1,t.xr.enabled=!1,t.shadowMap.autoUpdate=!1,t.setRenderTarget($),t.state.buffers.depth.setMask(!0),t.autoClear===!1&&t.clear(),t.render(le,a),r.visible=!0,t.xr.enabled=ue,t.shadowMap.autoUpdate=fe,t.setRenderTarget(ce);const K=M.viewport;K!==void 0&&t.state.viewport(K)}}}se.prototype.isWater=!0;class W extends T{constructor(){const u=W.SkyShader,e=new ie({name:"SkyShader",fragmentShader:u.fragmentShader,vertexShader:u.vertexShader,uniforms:j.clone(u.uniforms),side:pe,depthWrite:!1});super(new re(1,1,1),e)}}W.prototype.isSky=!0;W.SkyShader={uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new o},up:{value:new o(0,1,0)}},vertexShader:`
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

		}`};const Te="/portfolio-vue/assets/waternormals-Dfm-ILpY.jpg";let C,_,h,P,z,V;const We={name:"ThreeModel",components:{FullScreenButton:ne},data(){return{}},mounted(){this.init(),this.animate()},methods:{initExample(){const n=new X,u=new he(250);n.add(u);const e=new re(100,100,100),r=new Y({color:255}),w=new T(e,r);n.add(w);const f=new ge(60,40,40),m=new we({color:16711935,specular:4491502,shininess:12}),g=new T(f,m);g.translateY(110),n.add(g);const E=new xe(50,50,100,25),b=new Y({color:16776960}),v=new T(E,b);v.position.set(120,0,0),n.add(v);const x=new J(16777215);x.position.set(400,200,300),n.add(x);const L=new J(16777215);L.position.set(-400,-200,-300),n.add(L);const F=new ye(4473924);n.add(F);const B=700,A=600,k=B/A,s=200,i=new Se(-s*k,s*k,s,-s,1,1e3);i.position.set(200,100,200),i.lookAt(n.position);const l=new Q({canvas:this.$refs.container});l.setSize(B,A),l.setClearColor(16777215,1);function y(){l.render(n,i)}y(),new te(i,l.domElement).addEventListener("change",y)},init(){_=new X,h=new Q({canvas:this.$refs.container});const{innerWidth:n,innerHeight:u,devicePixelRatio:e}=window;h.setPixelRatio(e);const r=(Math.floor(u*e)/e).toFixed(2);h.setSize(n,r),h.toneMapping=Me,C=new ae(55,window.innerWidth/window.innerHeight,1,2e4),C.position.set(30,30,100);const w=new Ce(1e4,1e4);z=new se(w,{textureWidth:512,textureHeight:512,waterNormals:new _e().load(Te,function(v){v.wrapS=v.wrapT=Pe}),sunDirection:new o,sunColor:16777215,waterColor:7695,distortionScale:3.7,fog:_.fog!==void 0}),z.rotation.x=-Math.PI/2,_.add(z);const f=new W;f.scale.setScalar(1e4),_.add(f);const m=f.material.uniforms;m.turbidity.value=10,m.rayleigh.value=2,m.mieCoefficient.value=.005,m.mieDirectionalG.value=.8;const g={elevation:2,azimuth:180};V=new o;const E=new Ee(h);function b(){const v=ee.degToRad(90-g.elevation),x=ee.degToRad(g.azimuth);V.setFromSphericalCoords(1,v,x),f.material.uniforms.sunPosition.value.copy(V),z.material.uniforms.sunDirection.value.copy(V).normalize(),_.environment=E.fromScene(f).texture}b(),P=new te(C,h.domElement),P.maxPolarAngle=Math.PI*.495,P.target.set(0,10,0),P.minDistance=40,P.maxDistance=200,P.update(),window.addEventListener("resize",this.onWindowResize)},onWindowResize(){C.aspect=window.innerWidth/window.innerHeight,C.updateProjectionMatrix(),h.setSize(window.innerWidth,window.innerHeight)},animate(){requestAnimationFrame(this.animate),this.render()},render(){z.material.uniforms.time.value+=1/60,h.render(_,C)}}},Le={class:"three-js-container"},Fe={id:"container",ref:"container"},Be={class:"full-screen-btn"};function Ae(n,u,e,r,w,f){const m=ne;return Re(),De("div",Le,[oe("canvas",Fe,null,512),oe("div",Be,[ze(m)])])}const Ve=be(We,[["render",Ae],["__scopeId","data-v-fed82fd4"]]);export{Ve as default};
