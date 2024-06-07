var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { KanbanController } from "./controllers/kanban";
import "./view/Column";
let KanbanBoard = class KanbanBoard extends LitElement {
    constructor() {
        super(...arguments);
        // Create the controller and store it
        this.kanbanAPI = new KanbanController(this);
        this.data = {
            columns: [],
        };
        this._itemDropHandler = (e) => {
            var _a, _b, _c;
            const dropzone = e.detail.dropzone;
            const columnId = (_c = (_b = (_a = dropzone.parentElement) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.host) === null || _c === void 0 ? void 0 : _c.id;
            const dropZonesInColumn = Array.from(dropzone.parentElement.querySelectorAll("kanban-dropzone"));
            const droppedIndex = dropZonesInColumn.indexOf(dropzone);
            const itemId = e.detail.itemId;
            // Update the item's column and position
            this.kanbanAPI.updateItem(itemId, {
                columnId,
                position: droppedIndex,
            });
        };
        this._itemUpdateHandler = (e) => {
            this.kanbanAPI.updateItem(e.detail.id, { content: e.detail.content });
        };
        this._itemDeleteHandler = (e) => {
            this.kanbanAPI.deleteItem(e.detail.id);
        };
        this._itemAddHandler = (e) => {
            this.kanbanAPI.insertItem(e.detail.columnId, e.detail.item);
        };
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("kanban-item-drop", this._itemDropHandler);
        window.addEventListener("kanban-item-update", this._itemUpdateHandler);
        window.addEventListener("kanban-item-delete", this._itemDeleteHandler);
        window.addEventListener("kanban-item-add", this._itemAddHandler);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("kanban-item-drop", this._itemDropHandler);
        window.removeEventListener("kanban-item-update", this._itemUpdateHandler);
        window.removeEventListener("kanban-item-delete", this._itemDeleteHandler);
        window.removeEventListener("kanban-item-add", this._itemAddHandler);
    }
    render() {
        var _a, _b;
        console.log("rendering", { data: this.data });
        return html ` <div class="kanban">
      ${(_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.columns) === null || _b === void 0 ? void 0 : _b.map((column) => {
            return html `<kanban-column
          id="${column.id}"
          title="${column.title}"
          items="${JSON.stringify(column.items)}"
        ></kanban-column>`;
        })}
    </div>`;
    }
};
KanbanBoard.styles = css `
    .kanban {
      display: flex;
      padding: 30px;
      width: 750px;
      background: #009578;
      border-radius: 5px;
      gap: 20px;
    }

    .kanban * {
      font-family: sans-serif;
    }

    .kanban__add-item {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      color: white;
      background: rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `;
__decorate([
    property({ reflect: true, type: Object })
], KanbanBoard.prototype, "data", void 0);
KanbanBoard = __decorate([
    customElement("kanban-board")
], KanbanBoard);
export { KanbanBoard };
//# sourceMappingURL=index.js.map