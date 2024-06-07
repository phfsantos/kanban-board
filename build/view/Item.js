var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
let Item = class Item extends LitElement {
    constructor() {
        super();
    }
    render() {
        return html `<div
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
    </div>`;
    }
    _blurHandler() {
        const newContent = this._input.textContent.trim();
        if (newContent == this.content) {
            return;
        }
        this.content = newContent;
        this.dispatchEvent(new CustomEvent("kanban-item-update", {
            bubbles: true,
            composed: true,
            detail: { id: this.id, content: newContent },
        }));
    }
    _deleteHandler(e) {
        const check = confirm("Are you sure you want to delete this item?");
        if (check) {
            this.dispatchEvent(new CustomEvent("kanban-item-delete", {
                bubbles: true,
                composed: true,
                detail: { id: this.id },
            }));
        }
    }
    _dragStartHandler(e) {
        e.dataTransfer.setData("text/plain", this.id);
    }
    _dropHandler(e) {
        e.preventDefault();
    }
};
Item.styles = css `
    .kanban__item-input {
      padding: 10px 15px;
      box-sizing: border-box;
      background: white;
      border-radius: 5px;
      cursor: pointer;
    }
  `;
__decorate([
    property()
], Item.prototype, "id", void 0);
__decorate([
    property()
], Item.prototype, "content", void 0);
__decorate([
    query(".kanban__item-input")
], Item.prototype, "_input", void 0);
Item = __decorate([
    customElement("kanban-item")
], Item);
export default Item;
//# sourceMappingURL=Item.js.map