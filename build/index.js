var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { KanbanController } from "./controllers/kanban";
import "./view/Column";
let KanbanBoard = class KanbanBoard extends LitElement {
    constructor() {
        super(...arguments);
        // Create the controller and store it
        this.kanbanAPI = new KanbanController(this);
        this.data = {
            columns: [
                { id: "1", title: "Todo", items: [] },
                { id: "2", title: "Doing", items: [] },
                { id: "3", title: "Done", items: [] },
            ],
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
            const confirmBtn = this._dialog.querySelector("#confirmBtn");
            // "Show the dialog" opens the <dialog> modally
            this._dialog.showModal();
            this._dialog.addEventListener("click", (e) => {
                const dialogDimensions = this._dialog.getBoundingClientRect();
                if (e.clientX < dialogDimensions.left ||
                    e.clientX > dialogDimensions.right ||
                    e.clientY < dialogDimensions.top ||
                    e.clientY > dialogDimensions.bottom) {
                    this._dialog.close("cancel");
                }
            });
            // Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
            confirmBtn.addEventListener("click", (event) => {
                event.preventDefault(); // We don't want to submit this fake form
                this._dialog.close(confirmBtn.value); // Have to send the select box value here.
            });
            // "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
            this._dialog.addEventListener("close", (_event) => {
                if (this._dialog.returnValue === "yes") {
                    this.kanbanAPI.deleteItem(e.detail.id);
                }
            });
        };
        this._itemAddHandler = (e) => {
            this.kanbanAPI.insertItem(e.detail.columnId, e.detail.item);
        };
        this._columnUpdateHandler = (e) => {
            this.kanbanAPI.updateColumn(e.detail.id, e.detail.title);
        };
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("kanban-item-drop", this._itemDropHandler);
        window.addEventListener("kanban-item-update", this._itemUpdateHandler);
        window.addEventListener("kanban-item-delete", this._itemDeleteHandler);
        window.addEventListener("kanban-item-add", this._itemAddHandler);
        window.addEventListener("kanban-column-update", this._columnUpdateHandler);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("kanban-item-drop", this._itemDropHandler);
        window.removeEventListener("kanban-item-update", this._itemUpdateHandler);
        window.removeEventListener("kanban-item-delete", this._itemDeleteHandler);
        window.removeEventListener("kanban-item-add", this._itemAddHandler);
        window.removeEventListener("kanban-column-update", this._columnUpdateHandler);
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
          ></kanban-column>
          <!-- A modal dialog containing a form -->
          <dialog id="favDialog">
            <form>
              <p>Are you sure you want to delete this item?</p>
              <div>
                <button value="cancel" formmethod="dialog">Cancel</button>
                <button id="confirmBtn" value="yes">Confirm</button>
              </div>
            </form>
          </dialog> `;
        })}
    </div>`;
    }
};
KanbanBoard.styles = css `
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
  `;
__decorate([
    property({ reflect: true, type: Object })
], KanbanBoard.prototype, "data", void 0);
__decorate([
    query("dialog")
], KanbanBoard.prototype, "_dialog", void 0);
KanbanBoard = __decorate([
    customElement("kanban-board")
], KanbanBoard);
export { KanbanBoard };
//# sourceMappingURL=index.js.map