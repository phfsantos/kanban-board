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
    update(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has("content") &&
            this._input.innerText !== this.content) {
            this._input.innerText = this.content;
        }
    }
    render() {
        return html `<div
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
    </div>`;
    }
    _blurHandler() {
        const newContent = this._input.innerText.trim();
        if (newContent == this.content) {
            return;
        }
        this.dispatchEvent(new CustomEvent("kanban-item-update", {
            bubbles: true,
            composed: true,
            detail: { id: this.id, content: newContent },
        }));
    }
    _deleteHandler(e) {
        this.dispatchEvent(new CustomEvent("kanban-item-delete", {
            bubbles: true,
            composed: true,
            detail: { id: this.id },
        }));
    }
    _dragStartHandler(e) {
        e.dataTransfer.setData("text/plain", this.id);
    }
    _dropHandler(e) {
        e.preventDefault();
    }
};
Item.styles = css `
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