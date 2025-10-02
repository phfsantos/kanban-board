import{css as e,LitElement as t,html as i}from"lit";import{property as r,query as a,customElement as n}from"lit/decorators.js";var s=function(e,t,i,r){var a,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var d=e.length-1;d>=0;d--)(a=e[d])&&(s=(n<3?a(s):n>3?a(t,i,s):a(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};let d=class extends t{constructor(){super(),this._dragPreview=null,this._dragEndHandler=()=>{var e;null===(e=this._itemElement)||void 0===e||e.classList.remove("dragging"),this._dragPreview&&this._dragPreview.parentNode&&(this._dragPreview.parentNode.removeChild(this._dragPreview),this._dragPreview=null)}}update(e){super.update(e),e.has("content")&&this._input.innerText!==this.content&&(this._input.innerText=this.content)}render(){return i`<div
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
    </div>`}_blurHandler(){const e=this._input.innerText.trim();e!=this.content&&this.dispatchEvent(new CustomEvent("kanban-item-update",{bubbles:!0,composed:!0,detail:{id:this.id,content:e}}))}_deleteHandler(e){this.dispatchEvent(new CustomEvent("kanban-item-delete",{bubbles:!0,composed:!0,detail:{id:this.id}}))}_dragStartHandler(e){e.dataTransfer&&(e.dataTransfer.setData("text/plain",this.id),e.dataTransfer.effectAllowed="move",this._createDragPreview(e),this._itemElement.classList.add("dragging"),this.addEventListener("dragend",this._dragEndHandler,{once:!0}))}_createDragPreview(e){this._dragPreview=this._itemElement.cloneNode(!0),this._dragPreview.style.position="absolute",this._dragPreview.style.top="-1000px",this._dragPreview.style.opacity="0.8",this._dragPreview.style.transform="rotate(2deg)",this._dragPreview.style.boxShadow="0 8px 24px rgba(0, 0, 0, 0.3)",this._dragPreview.style.width=`${this._itemElement.offsetWidth}px`,this._dragPreview.style.pointerEvents="none",document.body.appendChild(this._dragPreview),e.dataTransfer&&e.dataTransfer.setDragImage(this._dragPreview,this._itemElement.offsetWidth/2,this._itemElement.offsetHeight/2),setTimeout((()=>{this._dragPreview&&this._dragPreview.parentNode&&(this._dragPreview.parentNode.removeChild(this._dragPreview),this._dragPreview=null)}),0)}_dropHandler(e){e.preventDefault()}};d.styles=e`
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
  `,s([r()],d.prototype,"id",void 0),s([r()],d.prototype,"content",void 0),s([a(".kanban__item-input")],d.prototype,"_input",void 0),s([a(".kanban__item")],d.prototype,"_itemElement",void 0),d=s([n("kanban-item")],d);var o=d;export{o as default};
//# sourceMappingURL=Item.js.map
