var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, query } from "lit/decorators.js";
import { LitElement, css, html } from "lit";
import "./Item";
import "./DropZone";
let Column = class Column extends LitElement {
    render() {
        return html ` <div class="kanban__column-title" @blur="${this._blurHandler}" contenteditable >${this.title}</div>
      <div class="kanban__column-items">
        <kanban-dropzone></kanban-dropzone>
        ${this.items.map((item) => html `<kanban-item
                id="${item.id}"
                content="${item.content}"
              ></kanban-item>
              <kanban-dropzone></kanban-dropzone>`)}
      </div>
      <button class="kanban__add-item" @click="${this._addItem}" type="button">
        + Add
      </button>`;
    }
    _blurHandler() {
        const newTitle = this._input.innerText.trim();
        if (newTitle == this.title) {
            return;
        }
        this.dispatchEvent(new CustomEvent("kanban-column-update", {
            bubbles: true,
            composed: true,
            detail: { id: this.id, title: newTitle },
        }));
    }
    _addItem(_e) {
        const newItem = {
            id: String(Math.floor(Math.random() * 100000)),
            content: "",
        };
        this.dispatchEvent(new CustomEvent("kanban-item-add", {
            bubbles: true,
            composed: true,
            detail: { columnId: this.id, item: newItem },
        }));
    }
};
Column.styles = css `
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
  `;
__decorate([
    property()
], Column.prototype, "id", void 0);
__decorate([
    property()
], Column.prototype, "title", void 0);
__decorate([
    property({ type: Array, reflect: true })
], Column.prototype, "items", void 0);
__decorate([
    query(".kanban__column-title")
], Column.prototype, "_input", void 0);
Column = __decorate([
    customElement("kanban-column")
], Column);
export default Column;
//# sourceMappingURL=Column.js.map