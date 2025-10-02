import{css as e,LitElement as a,html as n}from"lit";import{query as r,customElement as t}from"lit/decorators.js";var o=function(e,a,n,r){var t,o=arguments.length,d=o<3?a:null===r?r=Object.getOwnPropertyDescriptor(a,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(e,a,n,r);else for(var s=e.length-1;s>=0;s--)(t=e[s])&&(d=(o<3?t(d):o>3?t(a,n,d):t(a,n))||d);return o>3&&d&&Object.defineProperty(a,n,d),d};let d=class extends a{constructor(){super(...arguments),this._dragOverHandler=e=>{e.preventDefault(),this._dropzone.classList.add("kanban__dropzone--active")},this._dragLeaveHandler=e=>{this._dropzone.classList.remove("kanban__dropzone--active")},this._dropHandler=e=>{if(e.preventDefault(),!e.dataTransfer)return;this._dropzone.classList.add("kanban__dropzone--dropping"),this._dropzone.classList.remove("kanban__dropzone--active");const a=e.dataTransfer.getData("text/plain");this.dispatchEvent(new CustomEvent("kanban-item-drop",{bubbles:!0,composed:!0,detail:{dropzone:this,itemId:a}})),setTimeout((()=>{var e;null===(e=this._dropzone)||void 0===e||e.classList.remove("kanban__dropzone--dropping")}),300)}}render(){return n`
      <div class="kanban__dropzone">
        <div class="kanban__dropzone-content"></div>
      </div>
    `}connectedCallback(){super.connectedCallback(),this.addEventListener("dragover",this._dragOverHandler),this.addEventListener("dragleave",this._dragLeaveHandler),this.addEventListener("drop",this._dropHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("dragover",this._dragOverHandler),this.removeEventListener("dragleave",this._dragLeaveHandler),this.removeEventListener("drop",this._dropHandler)}};d.styles=e`
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
  `,o([r(".kanban__dropzone")],d.prototype,"_dropzone",void 0),d=o([t("kanban-dropzone")],d);var s=d;export{s as default};
//# sourceMappingURL=DropZone.js.map
