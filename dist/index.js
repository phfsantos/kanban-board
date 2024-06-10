/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let s=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new s(n,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:a,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:c,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,m=_?_.emptyScript:"",f=u.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:g};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&d(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const o=n?.call(this);s.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...h(t),...c(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of n){const n=document.createElement("style"),s=t.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=n,this[n]=s.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??g)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[b("elementProperties")]=new Map,y[b("finalized")]=new Map,f?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,E=A.trustedTypes,k=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+x,C=`<${S}>`,P=document,H=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,R="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,L=/>/g,D=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,N=/"/g,j=/^(?:script|style|textarea|title)$/i,M=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,W=P.createTreeWalker(P,129);function J(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,n=[];let s,o=2===e?"<svg>":"",r=T;for(let e=0;e<i;e++){const i=t[e];let a,d,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,d=r.exec(i),null!==d);)h=r.lastIndex,r===T?"!--"===d[1]?r=z:void 0!==d[1]?r=L:void 0!==d[2]?(j.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=D):void 0!==d[3]&&(r=D):r===D?">"===d[0]?(r=s??T,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,a=d[1],r=void 0===d[3]?D:'"'===d[3]?N:I):r===N||r===I?r=D:r===z||r===L?r=T:(r=D,s=void 0);const c=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===T?i+C:l>=0?(n.push(a),i.slice(0,l)+w+i.slice(l)+x+c):i+x+(-2===l?e:c)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":"")),n]};class X{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,o=0;const r=t.length-1,a=this.parts,[d,l]=K(t,e);if(this.el=X.createElement(d,i),W.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=W.nextNode())&&a.length<r;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(w)){const e=l[o++],i=n.getAttribute(t).split(x),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?Q:"?"===r[1]?tt:"@"===r[1]?et:G}),n.removeAttribute(t)}else t.startsWith(x)&&(a.push({type:6,index:s}),n.removeAttribute(t));if(j.test(n.tagName)){const t=n.textContent.split(x),e=t.length-1;if(e>0){n.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],H()),W.nextNode(),a.push({type:2,index:++s});n.append(t[e],H())}}}else if(8===n.nodeType)if(n.data===S)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(x,t+1));)a.push({type:7,index:s}),t+=x.length-1}s++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,n){if(e===B)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=Y(t,s._$AS(t,e.values),s,n)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??P).importNode(e,!0);W.currentNode=n;let s=W.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new F(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new it(s,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(s=W.nextNode(),o++)}return W.currentNode=P,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class F{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),O(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new Z(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new X(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new F(this.S(H()),this.S(H()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class G{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,n){const s=this.strings;let o=!1;if(void 0===s)t=Y(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const n=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=Y(this,n[i+r],e,r),a===B&&(a=this._$AH[r]),o||=!O(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}o&&!n&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Q extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class tt extends G{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class et extends G{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??q)===B)return;const i=this._$AH,n=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==q&&(i===q||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(X,F),(A.litHtmlVersions??=[]).push("3.1.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class st extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new F(e.insertBefore(H(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}st._$litElement$=!0,st.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:st});const ot=globalThis.litElementPolyfillSupport;ot?.({LitElement:st}),(globalThis.litElementVersions??=[]).push("4.0.6");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,at={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:g},dt=(t=at,e,i)=>{const{kind:n,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),o.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,s,t)},init(e){return void 0!==e&&this.P(n,void 0,t),e}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];e.call(this,i),this.requestUpdate(n,s,t)}}throw Error("Unsupported decorator location: "+n)};function lt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,n?{...t,wrapped:!0}:t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ht(t,e){return(e,i,n)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}class ct{constructor(t){(this.host=t).addController(this)}hostConnected(){}hostDisconnected(){}getItems(t){const e=Object.assign({},this.host.data).columns.find((e=>e.id==t));return e?e.items:[]}insertItem(t,e){const i=Object.assign({},this.host.data),n=i.columns.find((e=>e.id==t));if(!n)throw new Error("Column does not exist.");return n.items.push(e),this._saveData(i),e}updateColumn(t,e){const i=Object.assign({},this.host.data),[n]=i.columns.filter((e=>e.id==t));if(!n)throw new Error("Column not found.");n.title=void 0===e?n.title:e,this._saveData(i)}updateItem(t,e){const i=Object.assign({},this.host.data),[n,s]=(()=>{for(const e of i.columns){const i=e.items.find((e=>e.id==t));if(i)return[i,e]}})();if(!n)throw new Error("Item not found.");if(n.content=void 0===e.content?n.content:e.content,void 0!==e.columnId&&void 0!==e.position){const t=i.columns.find((t=>t.id==e.columnId));if(!t)throw new Error("Target column not found.");s.items.splice(s.items.indexOf(n),1),t.items.splice(e.position,0,n)}this._saveData(i)}deleteItem(t){const e=Object.assign({},this.host.data);for(const i of e.columns){const e=i.items.find((e=>e.id==t));e&&i.items.splice(i.items.indexOf(e),1)}this._saveData(e)}_saveData(t){this.host.textContent=JSON.stringify(t),this.host.data=t,this.host.requestUpdate("data"),this.host.dispatchEvent(new CustomEvent("kanban-save",{detail:t,bubbles:!0,composed:!0}))}}var pt=function(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let ut=class extends st{constructor(){super()}update(t){super.update(t),t.has("content")&&this._input.innerText!==this.content&&(this._input.innerText=this.content)}render(){return M`<div
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
    </div>`}_blurHandler(){const t=this._input.innerText.trim();t!=this.content&&this.dispatchEvent(new CustomEvent("kanban-item-update",{bubbles:!0,composed:!0,detail:{id:this.id,content:t}}))}_deleteHandler(t){this.dispatchEvent(new CustomEvent("kanban-item-delete",{bubbles:!0,composed:!0,detail:{id:this.id}}))}_dragStartHandler(t){t.dataTransfer.setData("text/plain",this.id)}_dropHandler(t){t.preventDefault()}};ut.styles=o`
    :host {
      position: relative;
    }

    :host * {
      font-family: inherit;
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
  `,pt([lt()],ut.prototype,"id",void 0),pt([lt()],ut.prototype,"content",void 0),pt([ht(".kanban__item-input")],ut.prototype,"_input",void 0),ut=pt([rt("kanban-item")],ut);var _t=function(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let mt=class extends st{constructor(){super(...arguments),this._dragOverHandler=t=>{t.preventDefault(),this._dropzone.classList.add("kanban__dropzone--active")},this._dragLeaveHandler=t=>{this._dropzone.classList.remove("kanban__dropzone--active")},this._dropHandler=t=>{t.preventDefault(),this._dropzone.classList.remove("kanban__dropzone--active"),this.dispatchEvent(new CustomEvent("kanban-item-drop",{bubbles:!0,composed:!0,detail:{dropzone:this,itemId:t.dataTransfer.getData("text/plain")}}))}}render(){return M`
      <div class="kanban__dropzone">
        <div class="kanban__dropzone-content"></div>
      </div>
    `}connectedCallback(){super.connectedCallback(),this.addEventListener("dragover",this._dragOverHandler),this.addEventListener("dragleave",this._dragLeaveHandler),this.addEventListener("drop",this._dropHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("dragover",this._dragOverHandler),this.removeEventListener("dragleave",this._dragLeaveHandler),this.removeEventListener("drop",this._dropHandler)}};mt.styles=o`
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
    }
  `,_t([ht(".kanban__dropzone")],mt.prototype,"_dropzone",void 0),mt=_t([rt("kanban-dropzone")],mt);var ft=function(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let bt=class extends st{render(){return M` <div class="kanban__column-title" @blur="${this._blurHandler}" contenteditable >${this.title}</div>
      <div class="kanban__column-items">
        <kanban-dropzone></kanban-dropzone>
        ${this.items.map((t=>M`<kanban-item
                id="${t.id}"
                content="${t.content}"
              ></kanban-item>
              <kanban-dropzone></kanban-dropzone>`))}
      </div>
      <button class="kanban__add-item" @click="${this._addItem}" type="button">
        + Add
      </button>`}_blurHandler(){const t=this._input.innerText.trim();t!=this.title&&this.dispatchEvent(new CustomEvent("kanban-column-update",{bubbles:!0,composed:!0,detail:{id:this.id,title:t}}))}_addItem(t){const e={id:String(Math.floor(1e5*Math.random())),content:""};this.dispatchEvent(new CustomEvent("kanban-item-add",{bubbles:!0,composed:!0,detail:{columnId:this.id,item:e}}))}};bt.styles=o`
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
  `,ft([lt()],bt.prototype,"id",void 0),ft([lt()],bt.prototype,"title",void 0),ft([lt({type:Array,reflect:!0})],bt.prototype,"items",void 0),ft([ht(".kanban__column-title")],bt.prototype,"_input",void 0),bt=ft([rt("kanban-column")],bt);var vt=function(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let gt=class extends st{constructor(){super(...arguments),this.kanbanAPI=new ct(this),this.data={columns:[{id:"1",title:"Todo",items:[]},{id:"2",title:"Doing",items:[]},{id:"3",title:"Done",items:[]}]},this._itemDropHandler=t=>{var e,i,n;const s=t.detail.dropzone,o=null===(n=null===(i=null===(e=s.parentElement)||void 0===e?void 0:e.parentNode)||void 0===i?void 0:i.host)||void 0===n?void 0:n.id,r=Array.from(s.parentElement.querySelectorAll("kanban-dropzone")).indexOf(s),a=t.detail.itemId;this.kanbanAPI.updateItem(a,{columnId:o,position:r})},this._itemUpdateHandler=t=>{this.kanbanAPI.updateItem(t.detail.id,{content:t.detail.content})},this._itemDeleteHandler=t=>{const e=this._dialog.querySelector("#confirmBtn");this._dialog.showModal(),this._dialog.addEventListener("click",(t=>{const e=this._dialog.getBoundingClientRect();(t.clientX<e.left||t.clientX>e.right||t.clientY<e.top||t.clientY>e.bottom)&&this._dialog.close("cancel")})),e.addEventListener("click",(t=>{t.preventDefault(),this._dialog.close(e.value)})),this._dialog.addEventListener("close",(e=>{"yes"===this._dialog.returnValue&&this.kanbanAPI.deleteItem(t.detail.id)}))},this._itemAddHandler=t=>{this.kanbanAPI.insertItem(t.detail.columnId,t.detail.item)},this._columnUpdateHandler=t=>{this.kanbanAPI.updateColumn(t.detail.id,t.detail.title)}}connectedCallback(){super.connectedCallback(),window.addEventListener("kanban-item-drop",this._itemDropHandler),window.addEventListener("kanban-item-update",this._itemUpdateHandler),window.addEventListener("kanban-item-delete",this._itemDeleteHandler),window.addEventListener("kanban-item-add",this._itemAddHandler),window.addEventListener("kanban-column-update",this._columnUpdateHandler)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("kanban-item-drop",this._itemDropHandler),window.removeEventListener("kanban-item-update",this._itemUpdateHandler),window.removeEventListener("kanban-item-delete",this._itemDeleteHandler),window.removeEventListener("kanban-item-add",this._itemAddHandler),window.removeEventListener("kanban-column-update",this._columnUpdateHandler)}render(){var t,e;return M` <div class="kanban">
      ${null===(e=null===(t=this.data)||void 0===t?void 0:t.columns)||void 0===e?void 0:e.map((t=>M`<kanban-column
          id="${t.id}"
          title="${t.title}"
          items="${JSON.stringify(t.items)}"
        ></kanban-column>`))}
      <!-- A modal dialog containing a form -->
      <dialog id="favDialog">
        <form>
          <p>Are you sure you want to delete this item?</p>
          <div>
            <button value="cancel" formmethod="dialog">Cancel</button>
            <button id="confirmBtn" value="yes">Confirm</button>
          </div>
        </form>
      </dialog>
    </div>`}};gt.styles=o`
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
  `,vt([lt({reflect:!0,type:Object})],gt.prototype,"data",void 0),vt([ht("dialog")],gt.prototype,"_dialog",void 0),gt=vt([rt("kanban-board")],gt);export{gt as KanbanBoard};
//# sourceMappingURL=index.js.map
