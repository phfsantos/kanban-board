/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new n(i,t,s)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:a,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:c,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,m=_?_.emptyScript:"",f=u.reactiveElementPolyfillSupport,$=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!a(t,e),g={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return i?.call(this)},set(e){const r=i?.call(this);n.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??g}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...h(t),...c(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i,this[i]=n.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,s){if(void 0!==t){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??b)(this[t],e))return;this.P(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t)!0!==s.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],s)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[$("elementProperties")]=new Map,y[$("finalized")]=new Map,f?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,E=A.trustedTypes,w=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,x="?"+k,C=`<${x}>`,P=document,H=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,R="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,N=/>/g,I=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,j=/"/g,M=/^(?:script|style|textarea|title)$/i,D=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,V=P.createTreeWalker(P,129);function J(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let n,r=2===e?"<svg>":"",o=T;for(let e=0;e<s;e++){const s=t[e];let a,d,l=-1,h=0;for(;h<s.length&&(o.lastIndex=h,d=o.exec(s),null!==d);)h=o.lastIndex,o===T?"!--"===d[1]?o=z:void 0!==d[1]?o=N:void 0!==d[2]?(M.test(d[2])&&(n=RegExp("</"+d[2],"g")),o=I):void 0!==d[3]&&(o=I):o===I?">"===d[0]?(o=n??T,l=-1):void 0===d[1]?l=-2:(l=o.lastIndex-d[2].length,a=d[1],o=void 0===d[3]?I:'"'===d[3]?j:L):o===j||o===L?o=I:o===z||o===N?o=T:(o=I,n=void 0);const c=o===I&&t[e+1].startsWith("/>")?" ":"";r+=o===T?s+C:l>=0?(i.push(a),s.slice(0,l)+S+s.slice(l)+k+c):s+k+(-2===l?e:c)}return[J(t,r+(t[s]||"<?>")+(2===e?"</svg>":"")),i]};class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[d,l]=K(t,e);if(this.el=Z.createElement(d,s),V.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=V.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=l[r++],s=i.getAttribute(t).split(k),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:s,ctor:"."===o[1]?Y:"?"===o[1]?tt:"@"===o[1]?et:X}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(M.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],H()),V.nextNode(),a.push({type:2,index:++n});i.append(t[e],H())}}}else if(8===i.nodeType)if(i.data===x)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:n}),t+=k.length-1}n++}}static createElement(t,e){const s=P.createElement("template");return s.innerHTML=t,s}}function F(t,e,s=t,i){if(e===B)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const r=O(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=F(t,n._$AS(t,e.values),n,i)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);V.currentNode=i;let n=V.nextNode(),r=0,o=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=s[++o]}r!==a?.index&&(n=V.nextNode(),r++)}return V.currentNode=P,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),O(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new G(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new Q(this.S(H()),this.S(H()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=F(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==B,r&&(this._$AH=t);else{const i=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=F(this,i[s+o],e,o),a===B&&(a=this._$AH[o]),r||=!O(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Y extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class tt extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class et extends X{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=F(this,t,e,0)??q)===B)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const it=A.litHtmlPolyfillSupport;it?.(Z,Q),(A.litHtmlVersions??=[]).push("3.1.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class nt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new Q(e.insertBefore(H(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}nt._$litElement$=!0,nt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:nt});const rt=globalThis.litElementPolyfillSupport;rt?.({LitElement:nt}),(globalThis.litElementVersions??=[]).push("4.0.6");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot=t=>(e,s)=>{void 0!==s?s.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,at={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},dt=(t=at,e,s)=>{const{kind:i,metadata:n}=s;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const n=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,n,t)},init(e){return void 0!==e&&this.P(i,void 0,t),e}}}if("setter"===i){const{name:i}=s;return function(s){const n=this[i];e.call(this,s),this.requestUpdate(i,n,t)}}throw Error("Unsupported decorator location: "+i)};function lt(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,i?{...t,wrapped:!0}:t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)
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
function ht(t,e){return(e,s,i)=>((t,e,s)=>(s.configurable=!0,s.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,s),s))(e,s,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}class ct{constructor(t){(this.host=t).addController(this)}hostConnected(){}hostDisconnected(){}getItems(t){const e=Object.assign({},this.host.data).columns.find((e=>e.id==t));return e?e.items:[]}insertItem(t,e){const s=Object.assign({},this.host.data),i=s.columns.find((e=>e.id==t));if(!i)throw new Error("Column does not exist.");return i.items.push(e),this.host.textContent=JSON.stringify(s),this.host.data=s,this.host.requestUpdate("data"),e}updateItem(t,e){const s=Object.assign({},this.host.data),[i,n]=(()=>{for(const e of s.columns){const s=e.items.find((e=>e.id==t));if(s)return[s,e]}})();if(!i)throw new Error("Item not found.");if(i.content=void 0===e.content?i.content:e.content,void 0!==e.columnId&&void 0!==e.position){const t=s.columns.find((t=>t.id==e.columnId));if(!t)throw new Error("Target column not found.");n.items.splice(n.items.indexOf(i),1),t.items.splice(e.position,0,i)}this.host.textContent=JSON.stringify(s),this.host.data=s,this.host.requestUpdate("data")}deleteItem(t){const e=Object.assign({},this.host.data);for(const s of e.columns){const e=s.items.find((e=>e.id==t));e&&s.items.splice(s.items.indexOf(e),1)}this.host.textContent=JSON.stringify(e),this.host.data=e,this.host.requestUpdate("data")}}var pt=function(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o};let ut=class extends nt{constructor(){super()}render(){return D`<div
      class="kanban__item"
      data-id="${this.id}"
      id="item-${this.id}"
      @dragstart="${this._dragStartHandler}"
      @dblclick="${this._deleteHandler}"
      draggable="true"
    >
      <div
        class="kanban__item-input"
        @drop="${this._dropHandler}"
        @blur="${this._blurHandler}"
        contenteditable
      >
        ${this.content}
      </div>
    </div>`}_blurHandler(){const t=this._input.textContent.trim();t!=this.content&&(this.content=t,this.dispatchEvent(new CustomEvent("kanban-item-update",{bubbles:!0,composed:!0,detail:{id:this.id,content:t}})))}_deleteHandler(t){confirm("Are you sure you want to delete this item?")&&this.dispatchEvent(new CustomEvent("kanban-item-delete",{bubbles:!0,composed:!0,detail:{id:this.id}}))}_dragStartHandler(t){t.dataTransfer.setData("text/plain",this.id)}_dropHandler(t){t.preventDefault()}};ut.styles=r`
    .kanban__item-input {
      padding: 10px 15px;
      box-sizing: border-box;
      background: white;
      border-radius: 5px;
      cursor: pointer;
    }
  `,pt([lt()],ut.prototype,"id",void 0),pt([lt()],ut.prototype,"content",void 0),pt([ht(".kanban__item-input")],ut.prototype,"_input",void 0),ut=pt([ot("kanban-item")],ut);var _t=function(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o};let mt=class extends nt{constructor(){super(...arguments),this._dragOverHandler=t=>{t.preventDefault(),this._dropzone.classList.add("kanban__dropzone--active")},this._dragLeaveHandler=t=>{this._dropzone.classList.remove("kanban__dropzone--active")},this._dropHandler=t=>{t.preventDefault(),this._dropzone.classList.remove("kanban__dropzone--active"),this.dispatchEvent(new CustomEvent("kanban-item-drop",{bubbles:!0,composed:!0,detail:{dropzone:this,itemId:t.dataTransfer.getData("text/plain")}}))}}render(){return D` <div class="kanban__dropzone"></div> `}connectedCallback(){super.connectedCallback(),this.addEventListener("dragover",this._dragOverHandler),this.addEventListener("dragleave",this._dragLeaveHandler),this.addEventListener("drop",this._dropHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("dragover",this._dragOverHandler),this.removeEventListener("dragleave",this._dragLeaveHandler),this.removeEventListener("drop",this._dropHandler)}};mt.styles=r`
    .kanban__dropzone {
      height: 10px;
      transition: background 0.15s, height 0.15s;
    }

    .kanban__dropzone--active {
      height: 20px;
      background: rgba(0, 0, 0, 0.25);
    }
  `,_t([ht(".kanban__dropzone")],mt.prototype,"_dropzone",void 0),mt=_t([ot("kanban-dropzone")],mt);var ft=function(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o};let $t=class extends nt{render(){return D` <div class="kanban__column-title">${this.title}</div>
      <div class="kanban__column-items">
        <kanban-dropzone></kanban-dropzone>
        ${this.items.map((t=>D`<kanban-item
                id="${t.id}"
                content="${t.content}"
              ></kanban-item>
              <kanban-dropzone></kanban-dropzone>`))}
      </div>
      <button class="kanban__add-item" @click="${this._addItem}" type="button">
        + Add
      </button>`}_addItem(t){const e={id:String(Math.floor(1e5*Math.random())),content:""};this.dispatchEvent(new CustomEvent("kanban-item-add",{bubbles:!0,composed:!0,detail:{columnId:this.id,item:e}}))}};$t.styles=r`
    :host {
      flex: 1;
    }

    :host:not(:last-child) {
      margin-right: 30px;
    }

    .kanban__column-title {
      margin-bottom: 20px;
      font-size: 30px;
      color: white;
      user-select: none;
    }
  `,ft([lt()],$t.prototype,"id",void 0),ft([lt()],$t.prototype,"title",void 0),ft([lt({type:Array,reflect:!0})],$t.prototype,"items",void 0),$t=ft([ot("kanban-column")],$t);var vt=function(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o};let bt=class extends nt{constructor(){super(...arguments),this.kanbanAPI=new ct(this),this.data={columns:[]},this._itemDropHandler=t=>{var e,s,i;const n=t.detail.dropzone,r=null===(i=null===(s=null===(e=n.parentElement)||void 0===e?void 0:e.parentNode)||void 0===s?void 0:s.host)||void 0===i?void 0:i.id,o=Array.from(n.parentElement.querySelectorAll("kanban-dropzone")).indexOf(n),a=t.detail.itemId;this.kanbanAPI.updateItem(a,{columnId:r,position:o})},this._itemUpdateHandler=t=>{this.kanbanAPI.updateItem(t.detail.id,{content:t.detail.content})},this._itemDeleteHandler=t=>{this.kanbanAPI.deleteItem(t.detail.id)},this._itemAddHandler=t=>{this.kanbanAPI.insertItem(t.detail.columnId,t.detail.item)}}connectedCallback(){super.connectedCallback(),window.addEventListener("kanban-item-drop",this._itemDropHandler),window.addEventListener("kanban-item-update",this._itemUpdateHandler),window.addEventListener("kanban-item-delete",this._itemDeleteHandler),window.addEventListener("kanban-item-add",this._itemAddHandler)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("kanban-item-drop",this._itemDropHandler),window.removeEventListener("kanban-item-update",this._itemUpdateHandler),window.removeEventListener("kanban-item-delete",this._itemDeleteHandler),window.removeEventListener("kanban-item-add",this._itemAddHandler)}render(){var t,e;return D` <div class="kanban">
      ${null===(e=null===(t=this.data)||void 0===t?void 0:t.columns)||void 0===e?void 0:e.map((t=>D`<kanban-column
          id="${t.id}"
          title="${t.title}"
          items="${JSON.stringify(t.items)}"
        ></kanban-column>`))}
    </div>`}};bt.styles=r`
    .kanban {
      display: flex;
      padding: 30px;
      width: 750px;
      background: #009578;
      border-radius: 5px;
      gap: 20px;
    }

    .kanban * {
      font-family: sans-serif;
    }

    .kanban__add-item {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      color: white;
      background: rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `,vt([lt({reflect:!0,type:Object})],bt.prototype,"data",void 0),bt=vt([ot("kanban-board")],bt);export{bt as KanbanBoard};
//# sourceMappingURL=index.js.map
