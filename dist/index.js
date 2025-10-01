import{css as t,LitElement as e,html as i}from"lit";import{property as n,query as o,customElement as a}from"lit/decorators.js";import{KanbanController as d}from"./controllers/kanban.js";var l=function(t,e,i,n){var o,a=arguments.length,d=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(t,e,i,n);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(d=(a<3?o(d):a>3?o(e,i,d):o(e,i))||d);return a>3&&d&&Object.defineProperty(e,i,d),d};let r=class extends e{constructor(t){super(),this.kanbanAPI=new d(this),this.data={columns:[{id:"1",title:"Todo",items:[]},{id:"2",title:"Doing",items:[]},{id:"3",title:"Done",items:[]}]},this._itemDropHandler=t=>{var e,i,n;const o=t.detail.dropzone,a=null===(n=null===(i=null===(e=o.parentElement)||void 0===e?void 0:e.parentNode)||void 0===i?void 0:i.host)||void 0===n?void 0:n.id,d=Array.from(o.parentElement.querySelectorAll("kanban-dropzone")).indexOf(o),l=t.detail.itemId;this.kanbanAPI.updateItem(l,{columnId:a,position:d})},this._itemUpdateHandler=t=>{this.kanbanAPI.updateItem(t.detail.id,{content:t.detail.content})},this._itemDeleteHandler=t=>{this._dialog.showModal(),this._dialog.addEventListener("click",(t=>{const e=this._dialog.getBoundingClientRect();(t.clientX<e.left||t.clientX>e.right||t.clientY<e.top||t.clientY>e.bottom)&&this._dialog.close("cancel")})),this._dialogConfirmButton.addEventListener("click",(t=>{t.preventDefault(),this._dialog.close(this._dialogConfirmButton.value)})),this._dialog.addEventListener("close",(e=>{"yes"===this._dialog.returnValue&&this.kanbanAPI.deleteItem(t.detail.id)}))},this._itemAddHandler=t=>{this.kanbanAPI.insertItem(t.detail.columnId,t.detail.item)},this._columnUpdateHandler=t=>{this.kanbanAPI.updateColumn(t.detail.id,t.detail.title)};const e={columns:[{id:"1",title:"Todo",items:[]},{id:"2",title:"Doing",items:[]},{id:"3",title:"Done",items:[]}]};this.data=t,t&&t.columns&&Array.isArray(t.columns)&&0!==t.columns.length||(this.data=e)}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}render(){var t,e;return i`<div
        class="kanban"
        @kanban-item-drop="${this._itemDropHandler}"
        @kanban-item-update="${this._itemUpdateHandler}"
        @kanban-item-delete="${this._itemDeleteHandler}"
        @kanban-item-add="${this._itemAddHandler}"
        @kanban-column-update="${this._columnUpdateHandler}"
      >
        ${null===(e=null===(t=this.data)||void 0===t?void 0:t.columns)||void 0===e?void 0:e.map((t=>i`<kanban-column
            id="${t.id}"
            title="${t.title}"
            items="${JSON.stringify(t.items)}"
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
      </dialog>`}};r.styles=t`
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
  `,l([n({reflect:!0,type:Object,converter:{toAttribute:t=>encodeURIComponent(JSON.stringify(t)),fromAttribute:t=>JSON.parse(decodeURIComponent(String(t)))}})],r.prototype,"data",void 0),l([o("dialog")],r.prototype,"_dialog",void 0),l([o("dialog button[value='yes']")],r.prototype,"_dialogConfirmButton",void 0),r=l([a("kanban-board")],r);export{r as KanbanBoard};
//# sourceMappingURL=index.js.map
