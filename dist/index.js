/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:a,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:c,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,m=_?_.emptyScript:"",f=u.reactiveElementPolyfillSupport,b=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),g={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return s?.call(this)},set(e){const o=s?.call(this);n.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??g}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...l(t),...c(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s,this[s]=n.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??v)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[b("elementProperties")]=new Map,y[b("finalized")]=new Map,f?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,E=A.trustedTypes,k=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,x="?"+S,C=`<${x}>`,P=document,H=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,R="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,N=/>/g,I=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,j=/"/g,M=/^(?:script|style|textarea|title)$/i,D=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,V=P.createTreeWalker(P,129);function J(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=T;for(let e=0;e<i;e++){const i=t[e];let a,d,h=-1,l=0;for(;l<i.length&&(r.lastIndex=l,d=r.exec(i),null!==d);)l=r.lastIndex,r===T?"!--"===d[1]?r=z:void 0!==d[1]?r=N:void 0!==d[2]?(M.test(d[2])&&(n=RegExp("</"+d[2],"g")),r=I):void 0!==d[3]&&(r=I):r===I?">"===d[0]?(r=n??T,h=-1):void 0===d[1]?h=-2:(h=r.lastIndex-d[2].length,a=d[1],r=void 0===d[3]?I:'"'===d[3]?j:L):r===j||r===L?r=I:r===z||r===N?r=T:(r=I,n=void 0);const c=r===I&&t[e+1].startsWith("/>")?" ":"";o+=r===T?i+C:h>=0?(s.push(a),i.slice(0,h)+w+i.slice(h)+S+c):i+S+(-2===h?e:c)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[d,h]=K(t,e);if(this.el=Z.createElement(d,i),V.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(w)){const e=h[o++],i=s.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?Y:"?"===r[1]?tt:"@"===r[1]?et:X}),s.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(M.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],H()),V.nextNode(),a.push({type:2,index:++n});s.append(t[e],H())}}}else if(8===s.nodeType)if(s.data===x)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)a.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function F(t,e,i=t,s){if(e===B)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=F(t,n._$AS(t,e.values),n,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);V.currentNode=s;let n=V.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new it(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=V.nextNode(),o++)}return V.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),O(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.S(H()),this.S(H()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=F(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=F(this,s[i+r],e,r),a===B&&(a=this._$AH[r]),o||=!O(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Y extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class tt extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class et extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=F(this,t,e,0)??q)===B)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const st=A.litHtmlPolyfillSupport;st?.(Z,Q),(A.litHtmlVersions??=[]).push("3.1.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class nt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(H(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}nt._$litElement$=!0,nt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:nt});const ot=globalThis.litElementPolyfillSupport;ot?.({LitElement:nt}),(globalThis.litElementVersions??=[]).push("4.0.6");
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
 */,at={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},dt=(t=at,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t)},init(e){return void 0!==e&&this.P(s,void 0,t),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,s?{...t,wrapped:!0}:t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)
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
function lt(t,e){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}class ct{constructor(t){(this.host=t).addController(this)}hostConnected(){}hostDisconnected(){}getItems(t){const e=Object.assign({},this.host.data).columns.find((e=>e.id==t));return e?e.items:[]}insertItem(t,e){const i=Object.assign({},this.host.data),s=i.columns.find((e=>e.id==t));if(!s)throw new Error("Column does not exist.");return s.items.push(e),this.host.textContent=JSON.stringify(i),this.host.data=i,this.host.requestUpdate("data"),e}updateItem(t,e){const i=Object.assign({},this.host.data),[s,n]=(()=>{for(const e of i.columns){const i=e.items.find((e=>e.id==t));if(i)return[i,e]}})();if(!s)throw new Error("Item not found.");if(s.content=void 0===e.content?s.content:e.content,void 0!==e.columnId&&void 0!==e.position){const t=i.columns.find((t=>t.id==e.columnId));if(!t)throw new Error("Target column not found.");n.items.splice(n.items.indexOf(s),1),t.items.splice(e.position,0,s)}this.host.textContent=JSON.stringify(i),this.host.data=i,this.host.requestUpdate("data")}deleteItem(t){const e=Object.assign({},this.host.data);for(const i of e.columns){const e=i.items.find((e=>e.id==t));e&&i.items.splice(i.items.indexOf(e),1)}this.host.textContent=JSON.stringify(e),this.host.data=e,this.host.requestUpdate("data")}}var pt=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let ut=class extends nt{constructor(){super()}update(t){super.update(t),t.has("content")&&this._input.innerText!==this.content&&(this._input.innerText=this.content)}render(){return D`<div
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
    </div>`}_blurHandler(){const t=this._input.innerText.trim();t!=this.content&&this.dispatchEvent(new CustomEvent("kanban-item-update",{bubbles:!0,composed:!0,detail:{id:this.id,content:t}}))}_deleteHandler(t){confirm("Are you sure you want to delete this item?")&&this.dispatchEvent(new CustomEvent("kanban-item-delete",{bubbles:!0,composed:!0,detail:{id:this.id}}))}_dragStartHandler(t){t.dataTransfer.setData("text/plain",this.id)}_dropHandler(t){t.preventDefault()}};ut.styles=o`
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
  `,pt([ht()],ut.prototype,"id",void 0),pt([ht()],ut.prototype,"content",void 0),pt([lt(".kanban__item-input")],ut.prototype,"_input",void 0),ut=pt([rt("kanban-item")],ut);var _t=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let mt=class extends nt{constructor(){super(...arguments),this._dragOverHandler=t=>{t.preventDefault(),this._dropzone.classList.add("kanban__dropzone--active")},this._dragLeaveHandler=t=>{this._dropzone.classList.remove("kanban__dropzone--active")},this._dropHandler=t=>{t.preventDefault(),this._dropzone.classList.remove("kanban__dropzone--active"),this.dispatchEvent(new CustomEvent("kanban-item-drop",{bubbles:!0,composed:!0,detail:{dropzone:this,itemId:t.dataTransfer.getData("text/plain")}}))}}render(){return D`
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
  `,_t([lt(".kanban__dropzone")],mt.prototype,"_dropzone",void 0),mt=_t([rt("kanban-dropzone")],mt);var ft=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let bt=class extends nt{render(){return D` <div class="kanban__column-title">${this.title}</div>
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
      </button>`}_addItem(t){const e={id:String(Math.floor(1e5*Math.random())),content:""};this.dispatchEvent(new CustomEvent("kanban-item-add",{bubbles:!0,composed:!0,detail:{columnId:this.id,item:e}}))}};bt.styles=o`
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
      user-select: none;
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
  `,ft([ht()],bt.prototype,"id",void 0),ft([ht()],bt.prototype,"title",void 0),ft([ht({type:Array,reflect:!0})],bt.prototype,"items",void 0),bt=ft([rt("kanban-column")],bt);var $t=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let vt=class extends nt{constructor(){super(...arguments),this.kanbanAPI=new ct(this),this.data={columns:[]},this._itemDropHandler=t=>{var e,i,s;const n=t.detail.dropzone,o=null===(s=null===(i=null===(e=n.parentElement)||void 0===e?void 0:e.parentNode)||void 0===i?void 0:i.host)||void 0===s?void 0:s.id,r=Array.from(n.parentElement.querySelectorAll("kanban-dropzone")).indexOf(n),a=t.detail.itemId;this.kanbanAPI.updateItem(a,{columnId:o,position:r})},this._itemUpdateHandler=t=>{this.kanbanAPI.updateItem(t.detail.id,{content:t.detail.content})},this._itemDeleteHandler=t=>{this.kanbanAPI.deleteItem(t.detail.id)},this._itemAddHandler=t=>{this.kanbanAPI.insertItem(t.detail.columnId,t.detail.item)}}connectedCallback(){super.connectedCallback(),window.addEventListener("kanban-item-drop",this._itemDropHandler),window.addEventListener("kanban-item-update",this._itemUpdateHandler),window.addEventListener("kanban-item-delete",this._itemDeleteHandler),window.addEventListener("kanban-item-add",this._itemAddHandler)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("kanban-item-drop",this._itemDropHandler),window.removeEventListener("kanban-item-update",this._itemUpdateHandler),window.removeEventListener("kanban-item-delete",this._itemDeleteHandler),window.removeEventListener("kanban-item-add",this._itemAddHandler)}render(){var t,e;return D` <div class="kanban">
      ${null===(e=null===(t=this.data)||void 0===t?void 0:t.columns)||void 0===e?void 0:e.map((t=>D`<kanban-column
          id="${t.id}"
          title="${t.title}"
          items="${JSON.stringify(t.items)}"
        ></kanban-column>`))}
    </div>`}};vt.styles=o`
    :host {
      display: block;
      width: 100%;
      height: auto;
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
  `,$t([ht({reflect:!0,type:Object})],vt.prototype,"data",void 0),vt=$t([rt("kanban-board")],vt);export{vt as KanbanBoard};
//# sourceMappingURL=index.js.map
