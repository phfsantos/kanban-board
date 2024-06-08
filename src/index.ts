import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { KanbanController } from "./controllers/kanban";

import "./view/Column";

export type KanbanItem = {
  id: string;
  content: string;
};

export type KanbanColumn = {
  id: string;
  title: string;
  items: KanbanItem[];
};

export type KanbanBoardData = {
  columns?: KanbanColumn[];
};

@customElement("kanban-board")
export class KanbanBoard extends LitElement {
  // Create the controller and store it
  private kanbanAPI = new KanbanController(this);

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: auto;
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
  `;

  @property({ reflect: true, type: Object  })
  data: KanbanBoardData = {
    columns: [],
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("kanban-item-drop", this._itemDropHandler);
    window.addEventListener("kanban-item-update", this._itemUpdateHandler);
    window.addEventListener("kanban-item-delete", this._itemDeleteHandler);
    window.addEventListener("kanban-item-add", this._itemAddHandler);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("kanban-item-drop", this._itemDropHandler);
    window.removeEventListener("kanban-item-update", this._itemUpdateHandler);
    window.removeEventListener("kanban-item-delete", this._itemDeleteHandler);
    window.removeEventListener("kanban-item-add", this._itemAddHandler);
  }

  render() {
    console.log("rendering", {data: this.data});

    return html` <div class="kanban">
      ${this.data?.columns?.map((column) => {
        return html`<kanban-column
          id="${column.id}"
          title="${column.title}"
          items="${JSON.stringify(column.items)}"
        ></kanban-column>`;
      })}
    </div>`;
  }

  private _itemDropHandler = (e: CustomEvent) => {
    const dropzone = e.detail.dropzone;
    const columnId = dropzone.parentElement?.parentNode?.host?.id;
    const dropZonesInColumn = Array.from(
      dropzone.parentElement.querySelectorAll("kanban-dropzone")
    );
    const droppedIndex = dropZonesInColumn.indexOf(dropzone);
    const itemId = e.detail.itemId;

    // Update the item's column and position
    this.kanbanAPI.updateItem(itemId, {
      columnId,
      position: droppedIndex,
    });
  }

  private _itemUpdateHandler = (e: CustomEvent) => {
    this.kanbanAPI.updateItem(e.detail.id, { content: e.detail.content });
  }

  private _itemDeleteHandler = (e: CustomEvent) =>  {
    this.kanbanAPI.deleteItem(e.detail.id);
  }

  private _itemAddHandler = (e: CustomEvent) => {
    this.kanbanAPI.insertItem(e.detail.columnId, e.detail.item);
  }
}
