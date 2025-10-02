/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$5=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$6=new WeakMap;let n$4=class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e$5&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$6.set(s,t))}return t}toString(){return this.cssText}};const r$7=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$2=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$5)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o)}},c$2=e$5?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$7(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;const{is:i$1,defineProperty:e$4,getOwnPropertyDescriptor:r$6,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$5,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f$1=(t,s)=>!i$1(t,s),y$1={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let b$1=class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$4(this.prototype,t,r)}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$6(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t}};return{get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$1(t),...o$5(t)];for(const i of s)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s))}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,s,i){this._$AK(t,i)}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(this[t],s))return;this.P(t,s,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i)}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(s)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}};b$1.elementStyles=[],b$1.shadowRootOptions={mode:"open"},b$1[d$1("elementProperties")]=new Map,b$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:b$1}),(a$1.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t$2=globalThis,i=t$2.trustedTypes,s$1=i?i.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$3="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$4="?"+h,n$2=`<${o$4}>`,r$5=document,l=()=>r$5.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),b=y(2),w=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),A=new WeakMap,E=r$5.createTreeWalker(r$5,129);function C(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const P=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$2:d>=0?(o.push(a),s.slice(0,d)+e$3+s.slice(d)+h+x):s+h+(-2===d?i:x)}return[C(t,l+(t[s]||"<?>")+(2===i?"</svg>":"")),o]};class V{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=P(t,s);if(this.el=V.createElement(f,n),E.currentNode=this.el.content,2===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=E.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$3)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?k:"?"===e[1]?H:"@"===e[1]?I:R}),r.removeAttribute(t)}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i?i.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),E.nextNode(),d.push({type:2,index:++c});r.append(t[s],l())}}}else if(8===r.nodeType)if(r.data===o$4)d.push({type:2,index:c});else{let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1}c++}}static createElement(t,i){const s=r$5.createElement("template");return s.innerHTML=t,s}}function N(t,i,s=t,e){if(i===w)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=N(t,h._$AS(t,i.values),h,e)),i}class S{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$5).importNode(i,!0);E.currentNode=e;let h=E.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new M(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new L(h,this,t)),this._$AV.push(i),l=s[++n]}o!==l?.index&&(h=E.nextNode(),o++)}return E.currentNode=r$5,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),c(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==w&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==T&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$5.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V.createElement(C(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new S(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new V(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new M(this.S(l()),this.S(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=T}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=N(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=N(this,e[s+n],i,n),r===w&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===T?t=T:t!==T&&(t+=(r??"")+h[n+1]),this._$AH[n]=r}o&&!e&&this.j(t)}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class k extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===T?void 0:t}}class H extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T)}}class I extends R{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5}_$AI(t,i=this){if((t=N(this,t,i,0)??T)===w)return;const s=this._$AH,e=t===T&&s!==T||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==T&&(s===T||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}}const z={P:e$3,A:h,C:o$4,M:1,L:P,R:S,D:u,V:N,I:M,H:R,N:H,U:I,B:k,F:L},Z=t$2.litHtmlPolyfillSupport;Z?.(V,M),(t$2.litHtmlVersions??=[]).push("3.1.4");const j=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new M(i.insertBefore(l(),t),t,void 0,s??{})}return h._$AI(t),h
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */};class s extends b$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=j(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}}s._$litElement$=!0,s[("finalized","finalized")]=!0,globalThis.litElementHydrateSupport?.({LitElement:s});const r$4=globalThis.litElementPolyfillSupport;r$4?.({LitElement:s});const o$3={_$AK:(t,e,i)=>{t._$AK(e,i)},_$AL:t=>t._$AL};(globalThis.litElementVersions??=[]).push("4.0.6");
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$2=!1;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t$1=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;const o$1={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1},r$3=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return{set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t)},init(e){return void 0!==e&&this.P(o,void 0,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t)}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return(e,o)=>"object"==typeof o?r$3(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:!0}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function r$2(r){return n$1({...r,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t(t){return(n,o)=>{const c="function"==typeof n?n:n[o];Object.assign(c,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$2=(e,t,c)=>(c.configurable=!0,c.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,c),c)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;function e$1(e,r){return(n,s,i)=>{const o=t=>t.renderRoot?.querySelector(e)??null;if(r){const{get:e,set:r}="object"==typeof s?n:i??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return e$2(n,s,{get(){let t=e.call(this);return void 0===t&&(t=o(this),(null!==t||this.hasUpdated)&&r.call(this,t)),t}})}return e$2(n,s,{get(){return o(this)}})}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let e;function r$1(r){return(n,o)=>e$2(n,o,{get(){return(this.renderRoot??(e??=document.createDocumentFragment())).querySelectorAll(r)}})
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function r(r){return(n,e)=>e$2(n,e,{async get(){return await this.updateComplete,this.renderRoot?.querySelector(r)??null}})
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function o(o){return(e,n)=>{const{slot:r,selector:s}=o??{},c="slot"+(r?`[name=${r}]`:":not([name])");return e$2(e,n,{get(){const t=this.renderRoot?.querySelector(c),e=t?.assignedElements(o)??[];return void 0===s?e:e.filter((t=>t.matches(s)))}})}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function n(n){return(o,r)=>{const{slot:e}=n??{},s="slot"+(e?`[name=${e}]`:":not([name])");return e$2(o,r,{get(){const t=this.renderRoot?.querySelector(s);return t?.assignedNodes(n)??[]}})}}class KanbanController{constructor(host){(this.host=host).addController(this)}hostConnected(){}hostDisconnected(){}getItems(columnId){const data=Object.assign({},this.host.data);if(!data.columns){return[]}const column=data.columns.find((column=>column.id===columnId));if(!column){return[]}return column.items}insertItem(columnId,item){const data=Object.assign({},this.host.data);if(!data.columns){throw new Error("No columns available.")}const column=data.columns.find((column=>column.id===columnId));if(!column){throw new Error("Column does not exist.")}column.items.push(item);this._saveData(data);return item}updateColumn(columnId,newTitle){const data=Object.assign({},this.host.data);if(!data.columns){throw new Error("No columns available.")}const column=data.columns.find((column=>column.id===columnId));if(!column){throw new Error("Column not found.")}column.title=newTitle===undefined?column.title:newTitle;this._saveData(data)}updateItem(itemId,newProps){const data=Object.assign({},this.host.data);if(!data.columns){throw new Error("No columns available.")}const result=this._findItemAndColumn(data.columns,itemId);if(!result){throw new Error("Item not found.")}const[item,currentColumn]=result;item.content=newProps.content===undefined?item.content:newProps.content;if(newProps.columnId!==undefined&&newProps.position!==undefined){if(!data.columns){throw new Error("No columns available.")}const targetColumn=data.columns.find((column=>column.id===newProps.columnId));if(!targetColumn){throw new Error("Target column not found.")}currentColumn.items.splice(currentColumn.items.indexOf(item),1);targetColumn.items.splice(newProps.position,0,item)}this._saveData(data)}deleteItem(itemId){const data=Object.assign({},this.host.data);if(!data.columns){console.warn("No columns available to delete from");return}for(const column of data.columns){const item=column.items.find((item=>item.id===itemId));if(item){column.items.splice(column.items.indexOf(item),1)}}this._saveData(data)}_findItemAndColumn(columns,itemId){for(const column of columns){const item=column.items.find((item=>item.id===itemId));if(item){return[item,column]}}return null}_saveData(data){this.host.textContent=JSON.stringify(data);const oldData=this.host.data;this.host.data=data;this.host.requestUpdate("data",oldData);this.host.dispatchEvent(new CustomEvent("kanban-save",{detail:data,bubbles:true,composed:true}))}}var __decorate$3=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Item=class Item extends s{constructor(){super();this._dragPreview=null;this._dragEndHandler=()=>{var _a;(_a=this._itemElement)===null||_a===void 0?void 0:_a.classList.remove("dragging");if(this._dragPreview&&this._dragPreview.parentNode){this._dragPreview.parentNode.removeChild(this._dragPreview);this._dragPreview=null}}}update(changedProperties){super.update(changedProperties);if(changedProperties.has("content")&&this._input.innerText!==this.content){this._input.innerText=this.content}}render(){return x`<div
      class="kanban__item"
      data-id="${this.id}"
      id="item-${this.id}"
      @dragstart="${this._dragStartHandler}"
      draggable="true"
    >
      <div
        class="kanban__item-input"
        @drop="${this._dropHandler}"
        @blur="${this._blurHandler}"
        contenteditable
      ></div>
      <div class="kanban__item-delete" @click="${this._deleteHandler}">🗑️</div>
    </div>`}_blurHandler(){const newContent=this._input.innerText.trim();if(newContent==this.content){return}this.dispatchEvent(new CustomEvent("kanban-item-update",{bubbles:true,composed:true,detail:{id:this.id,content:newContent}}))}_deleteHandler(_e){this.dispatchEvent(new CustomEvent("kanban-item-delete",{bubbles:true,composed:true,detail:{id:this.id}}))}_dragStartHandler(e){if(!e.dataTransfer){return}e.dataTransfer.setData("text/plain",this.id);e.dataTransfer.effectAllowed="move";this._createDragPreview(e);this._itemElement.classList.add("dragging");this.addEventListener("dragend",this._dragEndHandler,{once:true})}_createDragPreview(e){this._dragPreview=this._itemElement.cloneNode(true);this._dragPreview.style.position="absolute";this._dragPreview.style.top="-1000px";this._dragPreview.style.opacity="0.8";this._dragPreview.style.transform="rotate(2deg)";this._dragPreview.style.boxShadow="0 8px 24px rgba(0, 0, 0, 0.3)";this._dragPreview.style.width=`${this._itemElement.offsetWidth}px`;this._dragPreview.style.pointerEvents="none";document.body.appendChild(this._dragPreview);if(e.dataTransfer){e.dataTransfer.setDragImage(this._dragPreview,this._itemElement.offsetWidth/2,this._itemElement.offsetHeight/2)}setTimeout((()=>{if(this._dragPreview&&this._dragPreview.parentNode){this._dragPreview.parentNode.removeChild(this._dragPreview);this._dragPreview=null}}),0)}_dropHandler(e){e.preventDefault()}};Item.styles=i$2`
    :host {
      position: relative;
    }

    :host * {
      font-family: inherit;
    }

    .kanban__item {
      transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
    }

    .kanban__item.dragging {
      opacity: 0.4;
      transform: scale(0.95);
    }

    .kanban__item.dropping {
      animation: drop-bounce 0.5s ease;
    }

    @keyframes drop-bounce {
      0% {
        transform: scale(1.05);
        opacity: 0.8;
      }
      50% {
        transform: scale(0.98);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .kanban__item-input {
      padding: 10px 15px;
      box-sizing: border-box;
      background: white;
      border-radius: 5px;
      cursor: pointer;
      background: rgba(120, 120, 120, 0.1);
    }

    .kanban__item-delete {
      cursor: pointer;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.5);
      user-select: none;
      border-radius: 15px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 5px;
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 10px;
      color: darkred;
    }
  `;__decorate$3([n$1()],Item.prototype,"id",void 0);__decorate$3([n$1()],Item.prototype,"content",void 0);__decorate$3([e$1(".kanban__item-input")],Item.prototype,"_input",void 0);__decorate$3([e$1(".kanban__item")],Item.prototype,"_itemElement",void 0);Item=__decorate$3([t$1("kanban-item")],Item);var Item$1=Item;var __decorate$2=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let DropZone=class DropZone extends s{constructor(){super(...arguments);this._dragOverHandler=e=>{e.preventDefault();this._dropzone.classList.add("kanban__dropzone--active")};this._dragLeaveHandler=_e=>{this._dropzone.classList.remove("kanban__dropzone--active")};this._dropHandler=e=>{e.preventDefault();if(!e.dataTransfer){return}this._dropzone.classList.add("kanban__dropzone--dropping");this._dropzone.classList.remove("kanban__dropzone--active");const itemId=e.dataTransfer.getData("text/plain");this.dispatchEvent(new CustomEvent("kanban-item-drop",{bubbles:true,composed:true,detail:{dropzone:this,itemId:itemId}}));setTimeout((()=>{var _a;(_a=this._dropzone)===null||_a===void 0?void 0:_a.classList.remove("kanban__dropzone--dropping")}),300)}}render(){return x`
      <div class="kanban__dropzone">
        <div class="kanban__dropzone-content"></div>
      </div>
    `}connectedCallback(){super.connectedCallback();this.addEventListener("dragover",this._dragOverHandler);this.addEventListener("dragleave",this._dragLeaveHandler);this.addEventListener("drop",this._dropHandler)}disconnectedCallback(){super.disconnectedCallback();this.removeEventListener("dragover",this._dragOverHandler);this.removeEventListener("dragleave",this._dragLeaveHandler);this.removeEventListener("drop",this._dropHandler)}};DropZone.styles=i$2`
    .kanban__dropzone {
      height: 10px;
      transition: background 0.15s, height 0.15s;
    }

    .kanban__dropzone--active {
      padding: 10px 0;
      height: 38px;
    }

    .kanban__dropzone--active .kanban__dropzone-content {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.25);
      border-radius: 5px;
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        background: rgba(0, 0, 0, 0.25);
        transform: scale(1);
      }
      50% {
        background: rgba(66, 153, 225, 0.4);
        transform: scale(1.02);
      }
    }

    .kanban__dropzone--dropping .kanban__dropzone-content {
      animation: drop-flash 0.3s ease;
    }

    @keyframes drop-flash {
      0% {
        background: rgba(66, 153, 225, 0.6);
        transform: scale(1.05);
      }
      100% {
        background: rgba(66, 153, 225, 0.2);
        transform: scale(1);
      }
    }
  `;__decorate$2([e$1(".kanban__dropzone")],DropZone.prototype,"_dropzone",void 0);DropZone=__decorate$2([t$1("kanban-dropzone")],DropZone);var DropZone$1=DropZone;var __decorate$1=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Column=class Column extends s{update(changedProperties){super.update(changedProperties);if(changedProperties.has("title")&&this._input.innerText!==this.title){this._input.innerText=this.title}}render(){return x` <div
        class="kanban__column-title"
        @blur="${this._blurHandler}"
        contenteditable
      ></div>
      <div class="kanban__column-items">
        <kanban-dropzone></kanban-dropzone>
        ${this.items.map((item=>x`<kanban-item
                id="${item.id}"
                content="${item.content}"
              ></kanban-item>
              <kanban-dropzone></kanban-dropzone>`))}
      </div>
      <button class="kanban__add-item" @click="${this._addItem}" type="button">
        + Add
      </button>`}_blurHandler(){const newTitle=this._input.innerText.trim();if(newTitle===this.title){return}this.dispatchEvent(new CustomEvent("kanban-column-update",{bubbles:true,composed:true,detail:{id:this.id,title:newTitle}}))}_generateUniqueId(){const timestamp=Date.now();const randomComponent=Math.random().toString(36).substring(2,11);return`${timestamp}-${randomComponent}`}_addItem(_e){const newItem={id:this._generateUniqueId(),content:""};this.dispatchEvent(new CustomEvent("kanban-item-add",{bubbles:true,composed:true,detail:{columnId:this.id,item:newItem}}))}};Column.styles=i$2`
    :host {
      flex: 1;
      font-family: inherit;
    }

    :host * {
      font-family: inherit;
    }

    .kanban__column-title {
      margin-bottom: 20px;
      font-size: 30px;
      color: inherit;
    }

    .kanban__add-item {
      width: 100%;
      padding: 10px 5px;
      margin-top: 10px;
      font-size: 16px;
      color: inherit;
      background: rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: inherit;
    }

    .kanban__add-item:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  `;__decorate$1([n$1()],Column.prototype,"id",void 0);__decorate$1([n$1()],Column.prototype,"title",void 0);__decorate$1([n$1({type:Array,reflect:true,converter:{fromAttribute:value=>{if(!value)return[];try{return JSON.parse(value)}catch(_a){return[]}},toAttribute:value=>JSON.stringify(value)}})],Column.prototype,"items",void 0);__decorate$1([e$1(".kanban__column-title")],Column.prototype,"_input",void 0);Column=__decorate$1([t$1("kanban-column")],Column);var Column$1=Column;var __decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let KanbanBoard=class KanbanBoard extends s{constructor(data){super();this.kanbanAPI=new KanbanController(this);this.data={columns:[{id:"1",title:"Todo",items:[]},{id:"2",title:"Doing",items:[]},{id:"3",title:"Done",items:[]}]};this._pendingDeleteId=null;this._handleDialogBackdropClick=e=>{const dialogDimensions=this._dialog.getBoundingClientRect();if(e.clientX<dialogDimensions.left||e.clientX>dialogDimensions.right||e.clientY<dialogDimensions.top||e.clientY>dialogDimensions.bottom){this._dialog.close("cancel")}};this._handleDialogConfirm=event=>{event.preventDefault();this._dialog.close(this._dialogConfirmButton.value)};this._handleDialogClose=_event=>{if(this._dialog.returnValue==="yes"&&this._pendingDeleteId){this.kanbanAPI.deleteItem(this._pendingDeleteId);this._pendingDeleteId=null}};this._itemDropHandler=e=>{const dropzone=e.detail.dropzone;const columnId=this._getColumnIdFromDropzone(dropzone);if(!columnId){console.error("Could not determine column ID from dropzone");return}const dropZonesInColumn=Array.from(dropzone.parentElement.querySelectorAll("kanban-dropzone"));const droppedIndex=dropZonesInColumn.indexOf(dropzone);const itemId=e.detail.itemId;this.kanbanAPI.updateItem(itemId,{columnId:columnId,position:droppedIndex});this._animateDroppedItem(itemId)};this._itemUpdateHandler=e=>{this.kanbanAPI.updateItem(e.detail.id,{content:e.detail.content})};this._itemDeleteHandler=e=>{this._pendingDeleteId=e.detail.id;this._dialog.showModal()};this._itemAddHandler=e=>{this.kanbanAPI.insertItem(e.detail.columnId,e.detail.item)};this._columnUpdateHandler=e=>{this.kanbanAPI.updateColumn(e.detail.id,e.detail.title)};const defaultData={columns:[{id:"1",title:"Todo",items:[]},{id:"2",title:"Doing",items:[]},{id:"3",title:"Done",items:[]}]};this.data=data;if(!data||!data.columns||!Array.isArray(data.columns)||data.columns.length===0){this.data=defaultData}}connectedCallback(){super.connectedCallback();this.updateComplete.then((()=>{this._setupDialogListeners()}))}disconnectedCallback(){super.disconnectedCallback();this._cleanupDialogListeners()}_setupDialogListeners(){if(!this._dialog||!this._dialogConfirmButton){return}this._dialog.addEventListener("click",this._handleDialogBackdropClick);this._dialogConfirmButton.addEventListener("click",this._handleDialogConfirm);this._dialog.addEventListener("close",this._handleDialogClose)}_cleanupDialogListeners(){if(!this._dialog||!this._dialogConfirmButton){return}this._dialog.removeEventListener("click",this._handleDialogBackdropClick);this._dialogConfirmButton.removeEventListener("click",this._handleDialogConfirm);this._dialog.removeEventListener("close",this._handleDialogClose)}render(){var _a,_b;return x`<div
        class="kanban"
        @kanban-item-drop="${this._itemDropHandler}"
        @kanban-item-update="${this._itemUpdateHandler}"
        @kanban-item-delete="${this._itemDeleteHandler}"
        @kanban-item-add="${this._itemAddHandler}"
        @kanban-column-update="${this._columnUpdateHandler}"
      >
        ${(_b=(_a=this.data)===null||_a===void 0?void 0:_a.columns)===null||_b===void 0?void 0:_b.map((column=>x`<kanban-column
            id="${column.id}"
            title="${column.title}"
            items="${JSON.stringify(column.items)}"
          ></kanban-column>`))}
      </div>
      <!-- A modal dialog containing a form -->
      <dialog>
        <form>
          <p>Are you sure you want to delete this item?</p>
          <div>
            <button value="cancel" formmethod="dialog">Cancel</button>
            <button value="yes">Confirm</button>
          </div>
        </form>
      </dialog>`}_getColumnIdFromDropzone(dropzone){const parent=dropzone.parentElement;if(!parent)return null;const parentNode=parent.parentNode;if(!parentNode)return null;if(!("host"in parentNode))return null;const host=parentNode.host;if(!host)return null;if(!("id"in host))return null;const id=host.id;return id||null}_animateDroppedItem(itemId){setTimeout((()=>{var _a;const itemElement=(_a=this.shadowRoot)===null||_a===void 0?void 0:_a.querySelector(`#item-${itemId}`);if(itemElement){itemElement.classList.add("dropping");setTimeout((()=>{itemElement.classList.remove("dropping")}),500)}}),50)}};KanbanBoard.styles=i$2`
    :host {
      display: block;
      width: 100%;
      height: auto;
      text-wrap: initial;
      white-space-collapse: initial;
    }

    .kanban {
      display: flex;
      padding: 30px;
      border-radius: 5px;
    }

    :host * {
      font-family: inherit;
    }

    kanban-column:not(:first-child) {
      padding-left: 15px;
    }

    kanban-column:not(:last-child) {
      border-right: 1px solid rgba(120, 120, 120, 0.9);
      padding-right: 15px;
    }

    dialog {
      z-index: 10;
      margin-top: 10px;
      border: none;
      border-radius: 1rem;
      margin: auto;
      padding: 40px;
    }

    dialog::backdrop {
      background-color: rgba(120, 120, 120, 0.25);
    }

    dialog button {
      width: 45%;
      padding: 10px 5px;
      margin-top: 10px;
      font-size: 16px;
      color: inherit;
      background: rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: inherit;
    }

    dialog button:not(:last-child) {
      margin-right: 15px;
    }

    dialog button:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  `;__decorate([n$1({reflect:true,type:Object,converter:{toAttribute:value=>encodeURIComponent(JSON.stringify(value)),fromAttribute:value=>JSON.parse(decodeURIComponent(String(value)))}})],KanbanBoard.prototype,"data",void 0);__decorate([e$1("dialog")],KanbanBoard.prototype,"_dialog",void 0);__decorate([e$1("dialog button[value='yes']")],KanbanBoard.prototype,"_dialogConfirmButton",void 0);KanbanBoard=__decorate([t$1("kanban-board")],KanbanBoard);export{Column$1 as Column,DropZone$1 as DropZone,Item$1 as Item,KanbanBoard};
//# sourceMappingURL=demo.js.map
