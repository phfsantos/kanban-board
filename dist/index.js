import{css as e,LitElement as t,html as i}from"lit";import{property as o,query as n,customElement as a}from"lit/decorators.js";import{KanbanController as r}from"./controllers/kanban.js";export{default as Column}from"./view/Column.js";export{default as Item}from"./view/Item.js";export{default as DropZone}from"./view/DropZone.js";var l=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};const d={COLUMN_NOT_FOUND:"The column you are trying to update does not exist",ITEM_NOT_FOUND:"The item you are trying to update does not exist",INVALID_DATA:"The data provided is invalid",SAVE_FAILED:"Failed to save your changes",NO_COLUMNS:"No columns are available",INVALID_COLUMN_ID:"Invalid column ID provided",INVALID_ITEM_ID:"Invalid item ID provided",MOVE_FAILED:"Failed to move the item",DELETE_FAILED:"Failed to delete the item",UPDATE_FAILED:"Failed to update the item",ADD_FAILED:"Failed to add the item"};let s=class extends t{constructor(e){super(),this.kanbanAPI=new r(this),this.data={columns:[{id:"1",title:"Todo",items:[]},{id:"2",title:"Doing",items:[]},{id:"3",title:"Done",items:[]}]},this._pendingDeleteId=null,this._handleDialogBackdropClick=e=>{const t=this._dialog.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&this._dialog.close("cancel")},this._handleDialogConfirm=e=>{e.preventDefault(),this._dialog.close(this._dialogConfirmButton.value)},this._handleDialogClose=e=>{"yes"===this._dialog.returnValue&&this._pendingDeleteId&&(this.kanbanAPI.deleteItem(this._pendingDeleteId),this._pendingDeleteId=null)},this._itemDropHandler=e=>{try{const t=e.detail.dropzone,i=this._getColumnIdFromDropzone(t);if(!i)throw new Error("Could not determine column ID from dropzone");const o=Array.from(t.parentElement.querySelectorAll("kanban-dropzone")).indexOf(t),n=e.detail.itemId;this.kanbanAPI.updateItem(n,{columnId:i,position:o}),this._animateDroppedItem(n),this._focusItem(n)}catch(e){this._emitError({type:"operation",message:e instanceof Error?e.message:"Unknown error",userMessage:d.MOVE_FAILED,details:e})}},this._itemUpdateHandler=e=>{try{this.kanbanAPI.updateItem(e.detail.id,{content:e.detail.content})}catch(e){this._emitError({type:"operation",message:e instanceof Error?e.message:"Unknown error",userMessage:d.UPDATE_FAILED,details:e})}},this._itemDeleteHandler=e=>{this._pendingDeleteId=e.detail.id,this._dialog.showModal()},this._itemAddHandler=e=>{try{this.kanbanAPI.insertItem(e.detail.columnId,e.detail.item)}catch(e){this._emitError({type:"operation",message:e instanceof Error?e.message:"Unknown error",userMessage:d.ADD_FAILED,details:e})}},this._columnUpdateHandler=e=>{try{this.kanbanAPI.updateColumn(e.detail.id,e.detail.title)}catch(e){this._emitError({type:"operation",message:e instanceof Error?e.message:"Unknown error",userMessage:d.UPDATE_FAILED,details:e})}},this._itemMoveHandler=e=>{try{const{id:t,direction:i}=e.detail,o=this.kanbanAPI.findItemAndColumn(t);if(!o)throw new Error("Item not found: "+t);const[n,a]=o,r=this.data.columns;if(!r)throw new Error("No columns available");const l=r.findIndex((e=>e.id===a.id)),d=a.items.findIndex((e=>e.id===t));if(-1===l||-1===d)throw new Error("Item or column index not found");let s=!1;switch(i){case"up":d>0&&(this.kanbanAPI.updateItem(t,{columnId:a.id,position:d-1}),s=!0);break;case"down":d<a.items.length-1&&(this.kanbanAPI.updateItem(t,{columnId:a.id,position:d+1}),s=!0);break;case"left":if(l>0){const e=r[l-1];this.kanbanAPI.updateItem(t,{columnId:e.id,position:e.items.length}),s=!0}break;case"right":if(l<r.length-1){const e=r[l+1];this.kanbanAPI.updateItem(t,{columnId:e.id,position:e.items.length}),s=!0}}s&&this._focusItem(t)}catch(e){this._emitError({type:"operation",message:e instanceof Error?e.message:"Unknown error",userMessage:d.MOVE_FAILED,details:e})}};const t={columns:[{id:"1",title:"Todo",items:[]},{id:"2",title:"Doing",items:[]},{id:"3",title:"Done",items:[]}]};this.data=e,e&&e.columns&&Array.isArray(e.columns)&&0!==e.columns.length||(this.data=t)}_emitError(e){console.error("[Kanban Error]",e),this.dispatchEvent(new CustomEvent("kanban-error",{detail:e,bubbles:!0,composed:!0}))}connectedCallback(){super.connectedCallback(),this.updateComplete.then((()=>{this._setupDialogListeners()}))}disconnectedCallback(){super.disconnectedCallback(),this._cleanupDialogListeners()}_setupDialogListeners(){this._dialog&&this._dialogConfirmButton&&(this._dialog.addEventListener("click",this._handleDialogBackdropClick),this._dialogConfirmButton.addEventListener("click",this._handleDialogConfirm),this._dialog.addEventListener("close",this._handleDialogClose))}_cleanupDialogListeners(){this._dialog&&this._dialogConfirmButton&&(this._dialog.removeEventListener("click",this._handleDialogBackdropClick),this._dialogConfirmButton.removeEventListener("click",this._handleDialogConfirm),this._dialog.removeEventListener("close",this._handleDialogClose))}render(){var e,t;return i`<div
        class="kanban"
        role="region"
        aria-label="Kanban board"
        @kanban-item-drop="${this._itemDropHandler}"
        @kanban-item-update="${this._itemUpdateHandler}"
        @kanban-item-delete="${this._itemDeleteHandler}"
        @kanban-item-add="${this._itemAddHandler}"
        @kanban-item-move="${this._itemMoveHandler}"
        @kanban-column-update="${this._columnUpdateHandler}"
      >
        ${null===(t=null===(e=this.data)||void 0===e?void 0:e.columns)||void 0===t?void 0:t.map((e=>i`<kanban-column
            id="${e.id}"
            title="${e.title}"
            items="${JSON.stringify(e.items)}"
          ></kanban-column>`))}
      </div>
      <!-- A modal dialog containing a form -->
      <dialog 
        role="alertdialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
        aria-modal="true"
      >
        <form>
          <h2 id="dialog-title" style="margin-top: 0; font-size: 1.2em;">Confirm Delete</h2>
          <p id="dialog-desc">Are you sure you want to delete this item? This action cannot be undone.</p>
          <div>
            <button 
              value="cancel" 
              formmethod="dialog"
              aria-label="Cancel deletion"
            >Cancel</button>
            <button 
              value="yes"
              aria-label="Confirm deletion"
            >Confirm</button>
          </div>
        </form>
      </dialog>`}_getColumnIdFromDropzone(e){const t=e.parentElement;if(!t)return null;const i=t.parentNode;if(!i)return null;if(!("host"in i))return null;const o=i.host;if(!o)return null;if(!("id"in o))return null;return o.id||null}_animateDroppedItem(e){setTimeout((()=>{var t;const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(`#item-${e}`);i&&(i.classList.add("dropping"),setTimeout((()=>{i.classList.remove("dropping")}),500))}),50)}_focusItem(e){setTimeout((()=>{var t,i,o,n;const a=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelectorAll("kanban-column");if(a)for(const t of Array.from(a)){const a=null===(i=t.shadowRoot)||void 0===i?void 0:i.querySelectorAll("kanban-item");if(a)for(const t of Array.from(a)){const i=t;if(i.id===e){const e=null===(o=i.shadowRoot)||void 0===o?void 0:o.querySelector(".kanban__item-input");if(e)e.focus();else{const e=null===(n=i.shadowRoot)||void 0===n?void 0:n.querySelector(".kanban__item");e&&e.focus()}return void(i._announcePosition&&i._announcePosition())}}}}),100)}};s.styles=e`
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
  `,l([o({reflect:!0,type:Object,converter:{toAttribute:e=>encodeURIComponent(JSON.stringify(e)),fromAttribute:e=>JSON.parse(decodeURIComponent(String(e)))}})],s.prototype,"data",void 0),l([n("dialog")],s.prototype,"_dialog",void 0),l([n("dialog button[value='yes']")],s.prototype,"_dialogConfirmButton",void 0),s=l([a("kanban-board")],s);export{d as ERROR_MESSAGES,s as KanbanBoard};
//# sourceMappingURL=index.js.map
