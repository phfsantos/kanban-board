import{css as e,LitElement as t,html as i}from"lit";import{property as n,query as a,customElement as o}from"lit/decorators.js";var r=function(e,t,i,n){var a,o=arguments.length,r=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(o<3?a(r):o>3?a(t,i,r):a(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};let s=class extends t{constructor(){super(),this.columnId="",this.columnTitle="",this._dragPreview=null,this._dragEndHandler=()=>{var e;null===(e=this._itemElement)||void 0===e||e.classList.remove("dragging"),this._dragPreview&&this._dragPreview.parentNode&&(this._dragPreview.parentNode.removeChild(this._dragPreview),this._dragPreview=null)}}update(e){super.update(e),e.has("content")&&this._input.innerText!==this.content&&(this._input.innerText=this.content)}render(){return i`<div
      class="kanban__item"
      data-id="${this.id}"
      id="item-${this.id}"
      role="listitem"
      aria-label="Kanban item: ${this.content||"Empty item"}"
      @dragstart="${this._dragStartHandler}"
      @keydown="${this._handleItemKeydown}"
      draggable="true"
      tabindex="0"
    >
      
      <div
        class="kanban__item-input"
        role="textbox"
        aria-label="Item content: ${this.content||"Empty"}"
        aria-describedby="item-desc-${this.id}"
        @drop="${this._dropHandler}"
        @blur="${this._blurHandler}"
        @keydown="${this._handleInputKeydown}"
        contenteditable
        tabindex="0"
      ></div>
      
      <!-- Keyboard navigation controls -->
      <div class="item-actions" role="group" aria-label="Item actions">
        <button 
          class="item-action-button"
          @click="${this._moveUp}"
          @keydown="${this._handleButtonKeydown}"
          aria-label="Move item up"
          title="Move up (or Shift+↑)"
          type="button"
        >↑</button>
        <button 
          class="item-action-button"
          @click="${this._moveDown}"
          @keydown="${this._handleButtonKeydown}"
          aria-label="Move item down"
          title="Move down (or Shift+↓)"
          type="button"
        >↓</button>
        <button 
          class="item-action-button"
          @click="${this._moveLeft}"
          @keydown="${this._handleButtonKeydown}"
          aria-label="Move to previous column"
          title="Move left (or Shift+←)"
          type="button"
        >←</button>
        <button 
          class="item-action-button"
          @click="${this._moveRight}"
          @keydown="${this._handleButtonKeydown}"
          aria-label="Move to next column"
          title="Move right (or Shift+→)"
          type="button"
        >→</button>
        <button 
          class="kanban__item-delete" 
          @click="${this._deleteHandler}"
          @keydown="${this._handleDeleteKeydown}"
          aria-label="Delete item: ${this.content||"this item"}"
          title="Delete item (or Shift+Delete)"
          type="button"
        >🗑️</button>
      </div>
      <span id="item-desc-${this.id}" class="sr-only">
        Edit item content. Press Escape to finish editing.
      </span>
    </div>`}_blurHandler(){const e=this._input.innerText.trim();e!=this.content&&this.dispatchEvent(new CustomEvent("kanban-item-update",{bubbles:!0,composed:!0,detail:{id:this.id,content:e}}))}_deleteHandler(e){this.dispatchEvent(new CustomEvent("kanban-item-delete",{bubbles:!0,composed:!0,detail:{id:this.id}}))}_dragStartHandler(e){e.dataTransfer&&(e.dataTransfer.setData("text/plain",this.id),e.dataTransfer.effectAllowed="move",this._createDragPreview(e),this._itemElement.classList.add("dragging"),this.addEventListener("dragend",this._dragEndHandler,{once:!0}))}_createDragPreview(e){this._dragPreview=this._itemElement.cloneNode(!0),this._dragPreview.style.position="absolute",this._dragPreview.style.top="-1000px",this._dragPreview.style.opacity="0.8",this._dragPreview.style.transform="rotate(2deg)",this._dragPreview.style.boxShadow="0 8px 24px rgba(0, 0, 0, 0.3)",this._dragPreview.style.width=`${this._itemElement.offsetWidth}px`,this._dragPreview.style.pointerEvents="none",document.body.appendChild(this._dragPreview),e.dataTransfer&&e.dataTransfer.setDragImage(this._dragPreview,this._itemElement.offsetWidth/2,this._itemElement.offsetHeight/2),setTimeout((()=>{this._dragPreview&&this._dragPreview.parentNode&&(this._dragPreview.parentNode.removeChild(this._dragPreview),this._dragPreview=null)}),0)}_dropHandler(e){e.preventDefault()}_handleItemKeydown(e){if(e.shiftKey)switch(e.key){case"ArrowUp":e.preventDefault(),this._moveUp(e);break;case"ArrowDown":e.preventDefault(),this._moveDown(e);break;case"ArrowLeft":e.preventDefault(),this._moveLeft(e);break;case"ArrowRight":e.preventDefault(),this._moveRight(e);break;case"Delete":e.preventDefault(),this._deleteHandler(e)}}_handleInputKeydown(e){"Escape"===e.key&&(e.preventDefault(),this._input.blur(),this._itemElement.focus())}_handleDeleteKeydown(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._deleteHandler(e))}_handleButtonKeydown(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.target.click())}_moveUp(e){e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new CustomEvent("kanban-item-move",{bubbles:!0,composed:!0,detail:{id:this.id,direction:"up"}}))}_moveDown(e){e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new CustomEvent("kanban-item-move",{bubbles:!0,composed:!0,detail:{id:this.id,direction:"down"}}))}_moveLeft(e){e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new CustomEvent("kanban-item-move",{bubbles:!0,composed:!0,detail:{id:this.id,direction:"left"}}))}_moveRight(e){e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new CustomEvent("kanban-item-move",{bubbles:!0,composed:!0,detail:{id:this.id,direction:"right"}}))}_announcePosition(){var e,t;const i=`Item "${this.content}" is now in ${this.columnTitle} column`;let n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector('[aria-live="polite"]');n||(n=document.createElement("div"),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.className="sr-only",null===(t=this.shadowRoot)||void 0===t||t.appendChild(n)),n.textContent=i,setTimeout((()=>{n&&(n.textContent="")}),1e3)}};s.styles=e`
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
      font-size: 14px;
      color: darkred;
      user-select: none;
      border-radius: 3px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 2px 2px;
      background: rgba(255, 0, 0, 0.05);
      transition: background 0.2s, transform 0.1s;
      height: 25px;
      width: 25px;
    }

    .kanban__item-delete:hover,
    .kanban__item-delete:focus {
      background: rgba(255, 0, 0, 0.1);
      transform: scale(1.05);
    }

    .kanban__item-delete:active {
      transform: scale(0.95);
    }

    .item-actions {
      display: none;
      gap: 3px;
      align-items: center;
      justify-content: flex-end;
      margin-right: 4px;
      margin-top: 4px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .kanban__item:hover .item-actions,
    .kanban__item:focus-within .item-actions {
      opacity: 1;
      display: flex;
    }

    .item-action-button {
      background: rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      padding: 2px 6px;
      cursor: pointer;
      font-size: 14px;
      line-height: 1;
      transition: background 0.2s, transform 0.1s;
      height: 25px;
      width: 25px;
    }

    .item-action-button:hover,
    .item-action-button:focus {
      background: rgba(0, 0, 0, 0.1);
      transform: scale(1.05);
    }

    .item-action-button:active {
      transform: scale(0.95);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    *:focus {
      outline: 1px solid currentColor;
      outline-offset: 0px;
      border-radius: 5px;
    }
  `,r([n()],s.prototype,"id",void 0),r([n()],s.prototype,"content",void 0),r([n()],s.prototype,"columnId",void 0),r([n()],s.prototype,"columnTitle",void 0),r([a(".kanban__item-input")],s.prototype,"_input",void 0),r([a(".kanban__item")],s.prototype,"_itemElement",void 0),s=r([o("kanban-item")],s);var d=s;export{d as default};
//# sourceMappingURL=Item.js.map
