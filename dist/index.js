import{css as t,LitElement as e,html as i}from"lit";import{state as o,query as a,customElement as n}from"lit/decorators.js";import{KanbanController as r}from"./controllers/kanban.js";export{default as Column}from"./view/Column.js";export{default as Item}from"./view/Item.js";export{default as DropZone}from"./view/DropZone.js";import{object as s,string as d,array as l}from"./node_modules/zod/v4/classic/schemas.js";var m=function(t,e,i,o){var a,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(r=(n<3?a(r):n>3?a(e,i,r):a(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};const c=s({id:d().min(1,"Item ID cannot be empty"),content:d()}),u=s({id:d().min(1,"Column ID cannot be empty"),title:d().min(1,"Column title cannot be empty"),items:l(c)}),h=s({columns:l(u).optional()}),p={COLUMN_NOT_FOUND:"The column you are trying to update does not exist",ITEM_NOT_FOUND:"The item you are trying to update does not exist",INVALID_DATA:"The data provided is invalid",SAVE_FAILED:"Failed to save your changes",NO_COLUMNS:"No columns are available",INVALID_COLUMN_ID:"Invalid column ID provided",INVALID_ITEM_ID:"Invalid item ID provided",MOVE_FAILED:"Failed to move the item",DELETE_FAILED:"Failed to delete the item",UPDATE_FAILED:"Failed to update the item",ADD_FAILED:"Failed to add the item"};let g=class extends e{get data(){return this._data}set data(t){this.setData(t,!1)}constructor(t){super(),this.kanbanAPI=new r(this),this._data={columns:[{id:"1",title:"Todo",items:[]},{id:"2",title:"Doing",items:[]},{id:"3",title:"Done",items:[]}]},this._pendingDeleteId=null,this._handleDialogBackdropClick=t=>{const e=this._dialog.getBoundingClientRect();(t.clientX<e.left||t.clientX>e.right||t.clientY<e.top||t.clientY>e.bottom)&&this._dialog.close("cancel")},this._handleDialogConfirm=t=>{t.preventDefault(),this._dialog.close(this._dialogConfirmButton.value)},this._handleDialogClose=t=>{"yes"===this._dialog.returnValue&&this._pendingDeleteId&&(this.kanbanAPI.deleteItem(this._pendingDeleteId),this._pendingDeleteId=null)},this._itemDropHandler=t=>{try{const e=t.detail.dropzone,i=this._getColumnIdFromDropzone(e);if(!i)throw new Error("Could not determine column ID from dropzone");const o=Array.from(e.parentElement.querySelectorAll("kanban-dropzone")).indexOf(e),a=t.detail.itemId;this.kanbanAPI.updateItem(a,{columnId:i,position:o}),this._animateDroppedItem(a),this._focusItem(a)}catch(t){this._emitError({type:"operation",message:t instanceof Error?t.message:"Unknown error",userMessage:p.MOVE_FAILED,details:t})}},this._itemUpdateHandler=t=>{try{this.kanbanAPI.updateItem(t.detail.id,{content:t.detail.content})}catch(t){this._emitError({type:"operation",message:t instanceof Error?t.message:"Unknown error",userMessage:p.UPDATE_FAILED,details:t})}},this._itemDeleteHandler=t=>{this._pendingDeleteId=t.detail.id,this._dialog.showModal()},this._itemAddHandler=t=>{try{this.kanbanAPI.insertItem(t.detail.columnId,t.detail.item)}catch(t){this._emitError({type:"operation",message:t instanceof Error?t.message:"Unknown error",userMessage:p.ADD_FAILED,details:t})}},this._columnUpdateHandler=t=>{try{this.kanbanAPI.updateColumn(t.detail.id,t.detail.title)}catch(t){this._emitError({type:"operation",message:t instanceof Error?t.message:"Unknown error",userMessage:p.UPDATE_FAILED,details:t})}},this._itemMoveHandler=t=>{try{const{id:e,direction:i}=t.detail,o=this.kanbanAPI.findItemAndColumn(e);if(!o)throw new Error("Item not found: "+e);const[a,n]=o,r=this._data.columns;if(!r)throw new Error("No columns available");const s=r.findIndex((t=>t.id===n.id)),d=n.items.findIndex((t=>t.id===e));if(-1===s||-1===d)throw new Error("Item or column index not found");let l=!1;switch(i){case"up":d>0&&(this.kanbanAPI.updateItem(e,{columnId:n.id,position:d-1}),l=!0);break;case"down":d<n.items.length-1&&(this.kanbanAPI.updateItem(e,{columnId:n.id,position:d+1}),l=!0);break;case"left":if(s>0){const t=r[s-1];this.kanbanAPI.updateItem(e,{columnId:t.id,position:t.items.length}),l=!0}break;case"right":if(s<r.length-1){const t=r[s+1];this.kanbanAPI.updateItem(e,{columnId:t.id,position:t.items.length}),l=!0}}l&&this._focusItem(e)}catch(t){this._emitError({type:"operation",message:t instanceof Error?t.message:"Unknown error",userMessage:p.MOVE_FAILED,details:t})}};const e={columns:[{id:"1",title:"Todo",items:[]},{id:"2",title:"Doing",items:[]},{id:"3",title:"Done",items:[]}]};t&&t.columns&&Array.isArray(t.columns)&&t.columns.length>0?this.setData(t,!1):this._data=e}_emitError(t){console.error("[Kanban Error]",t),this.dispatchEvent(new CustomEvent("kanban-error",{detail:t,bubbles:!0,composed:!0}))}getData(){return JSON.parse(JSON.stringify(this._data))}setData(t,e=!0){try{const i=h.parse(t);if(!i.columns||0===i.columns.length)throw new Error("Board must have at least one column");const o=this._data;return this._data=i,this.requestUpdate("_data",o),e&&this._dispatchDataChange(),!0}catch(t){return this._emitError({type:"validation",message:t instanceof Error?t.message:"Invalid data format",userMessage:p.INVALID_DATA,details:t}),!1}}_dispatchDataChange(){this.dispatchEvent(new CustomEvent("kanban-change",{detail:{data:this.getData(),timestamp:Date.now()},bubbles:!0,composed:!0}))}connectedCallback(){super.connectedCallback();const t=this.getAttribute("data");if(t)try{const e=decodeURIComponent(t),i=JSON.parse(e);this.setData(i,!1),console.warn('KanbanBoard: The "data" attribute is deprecated. Use the setData() method instead. See documentation for migration guide.')}catch(t){console.error("KanbanBoard: Failed to parse data attribute:",t),this._emitError({type:"validation",message:"Failed to parse data attribute",userMessage:p.INVALID_DATA,details:t})}this.updateComplete.then((()=>{this._setupDialogListeners()}))}disconnectedCallback(){super.disconnectedCallback(),this._cleanupDialogListeners()}_setupDialogListeners(){this._dialog&&this._dialogConfirmButton&&(this._dialog.addEventListener("click",this._handleDialogBackdropClick),this._dialogConfirmButton.addEventListener("click",this._handleDialogConfirm),this._dialog.addEventListener("close",this._handleDialogClose))}_cleanupDialogListeners(){this._dialog&&this._dialogConfirmButton&&(this._dialog.removeEventListener("click",this._handleDialogBackdropClick),this._dialogConfirmButton.removeEventListener("click",this._handleDialogConfirm),this._dialog.removeEventListener("close",this._handleDialogClose))}render(){var t,e;return i`<div
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
        ${null===(e=null===(t=this._data)||void 0===t?void 0:t.columns)||void 0===e?void 0:e.map((t=>i`<kanban-column
            id="${t.id}"
            title="${t.title}"
            items="${JSON.stringify(t.items)}"
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
      </dialog>`}_getColumnIdFromDropzone(t){const e=t.parentElement;if(!e)return null;const i=e.parentNode;if(!i)return null;if(!("host"in i))return null;const o=i.host;if(!o)return null;if(!("id"in o))return null;return o.id||null}_animateDroppedItem(t){setTimeout((()=>{var e;const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(`#item-${t}`);i&&(i.classList.add("dropping"),setTimeout((()=>{i.classList.remove("dropping")}),500))}),50)}_focusItem(t){setTimeout((()=>{var e,i,o,a;const n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelectorAll("kanban-column");if(n)for(const e of Array.from(n)){const n=null===(i=e.shadowRoot)||void 0===i?void 0:i.querySelectorAll("kanban-item");if(n)for(const e of Array.from(n)){const i=e;if(i.id===t){const t=null===(o=i.shadowRoot)||void 0===o?void 0:o.querySelector(".kanban__item-input");if(t)t.focus();else{const t=null===(a=i.shadowRoot)||void 0===a?void 0:a.querySelector(".kanban__item");t&&t.focus()}return void(i._announcePosition&&i._announcePosition())}}}}),100)}};g.styles=t`
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
  `,m([o()],g.prototype,"_data",void 0),m([a("dialog")],g.prototype,"_dialog",void 0),m([a("dialog button[value='yes']")],g.prototype,"_dialogConfirmButton",void 0),g=m([n("kanban-board")],g);export{p as ERROR_MESSAGES,g as KanbanBoard,h as KanbanBoardDataSchema,u as KanbanColumnSchema,c as KanbanItemSchema};
//# sourceMappingURL=index.js.map
