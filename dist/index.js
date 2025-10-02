import{css as t,LitElement as e,html as i}from"lit";import{property as o,query as n,customElement as a}from"lit/decorators.js";import{KanbanController as l}from"./controllers/kanban.js";export{default as Column}from"./view/Column.js";export{default as Item}from"./view/Item.js";export{default as DropZone}from"./view/DropZone.js";var d=function(t,e,i,o){var n,a=arguments.length,l=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,i,o);else for(var d=t.length-1;d>=0;d--)(n=t[d])&&(l=(a<3?n(l):a>3?n(e,i,l):n(e,i))||l);return a>3&&l&&Object.defineProperty(e,i,l),l};let r=class extends e{constructor(t){super(),this.kanbanAPI=new l(this),this.data={columns:[{id:"1",title:"Todo",items:[]},{id:"2",title:"Doing",items:[]},{id:"3",title:"Done",items:[]}]},this._pendingDeleteId=null,this._handleDialogBackdropClick=t=>{const e=this._dialog.getBoundingClientRect();(t.clientX<e.left||t.clientX>e.right||t.clientY<e.top||t.clientY>e.bottom)&&this._dialog.close("cancel")},this._handleDialogConfirm=t=>{t.preventDefault(),this._dialog.close(this._dialogConfirmButton.value)},this._handleDialogClose=t=>{"yes"===this._dialog.returnValue&&this._pendingDeleteId&&(this.kanbanAPI.deleteItem(this._pendingDeleteId),this._pendingDeleteId=null)},this._itemDropHandler=t=>{const e=t.detail.dropzone,i=this._getColumnIdFromDropzone(e);if(!i)return void console.error("Could not determine column ID from dropzone");const o=Array.from(e.parentElement.querySelectorAll("kanban-dropzone")).indexOf(e),n=t.detail.itemId;this.kanbanAPI.updateItem(n,{columnId:i,position:o}),this._animateDroppedItem(n)},this._itemUpdateHandler=t=>{this.kanbanAPI.updateItem(t.detail.id,{content:t.detail.content})},this._itemDeleteHandler=t=>{this._pendingDeleteId=t.detail.id,this._dialog.showModal()},this._itemAddHandler=t=>{this.kanbanAPI.insertItem(t.detail.columnId,t.detail.item)},this._columnUpdateHandler=t=>{this.kanbanAPI.updateColumn(t.detail.id,t.detail.title)};const e={columns:[{id:"1",title:"Todo",items:[]},{id:"2",title:"Doing",items:[]},{id:"3",title:"Done",items:[]}]};this.data=t,t&&t.columns&&Array.isArray(t.columns)&&0!==t.columns.length||(this.data=e)}connectedCallback(){super.connectedCallback(),this.updateComplete.then((()=>{this._setupDialogListeners()}))}disconnectedCallback(){super.disconnectedCallback(),this._cleanupDialogListeners()}_setupDialogListeners(){this._dialog&&this._dialogConfirmButton&&(this._dialog.addEventListener("click",this._handleDialogBackdropClick),this._dialogConfirmButton.addEventListener("click",this._handleDialogConfirm),this._dialog.addEventListener("close",this._handleDialogClose))}_cleanupDialogListeners(){this._dialog&&this._dialogConfirmButton&&(this._dialog.removeEventListener("click",this._handleDialogBackdropClick),this._dialogConfirmButton.removeEventListener("click",this._handleDialogConfirm),this._dialog.removeEventListener("close",this._handleDialogClose))}render(){var t,e;return i`<div
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
      </dialog>`}_getColumnIdFromDropzone(t){const e=t.parentElement;if(!e)return null;const i=e.parentNode;if(!i)return null;if(!("host"in i))return null;const o=i.host;if(!o)return null;if(!("id"in o))return null;return o.id||null}_animateDroppedItem(t){setTimeout((()=>{var e;const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(`#item-${t}`);i&&(i.classList.add("dropping"),setTimeout((()=>{i.classList.remove("dropping")}),500))}),50)}};r.styles=t`
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
  `,d([o({reflect:!0,type:Object,converter:{toAttribute:t=>encodeURIComponent(JSON.stringify(t)),fromAttribute:t=>JSON.parse(decodeURIComponent(String(t)))}})],r.prototype,"data",void 0),d([n("dialog")],r.prototype,"_dialog",void 0),d([n("dialog button[value='yes']")],r.prototype,"_dialogConfirmButton",void 0),r=d([a("kanban-board")],r);export{r as KanbanBoard};
//# sourceMappingURL=index.js.map
