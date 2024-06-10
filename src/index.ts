import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
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

  // Define the styles for the kanban board
  static styles = css`
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

  // Define the properties for the kanban board
  @property({ reflect: true, type: Object })
  data: KanbanBoardData = {
    columns: [
      { id: "1", title: "Todo", items: [] },
      { id: "2", title: "Doing", items: [] },
      { id: "3", title: "Done", items: [] },
    ],
  };

  // Define the query selectors for the kanban board
  @query("dialog")
  _dialog: HTMLDialogElement;

  @query("dialog button[value='yes']")
  _dialogConfirmButton: HTMLButtonElement;

  /**
   * Constructor for the kanban board
   * make sure we have some data to work with
   * @param data
   * @returns void
   * @constructor
   * @override
   * @public
   * @memberof KanbanBoard
   * @since 1.0.0
   * @version 1.0.0
   * @example
   * ```ts
   * const kanban = new KanbanBoard({
   *  columns: [
   *     { id: "1", title: "Todo", items: [] },
   *     { id: "2", title: "Doing", items: [] },
   *     { id: "3", title: "Done", items: [] },
   *   ],
   * });
   * ```
   */
  constructor(data: KanbanBoardData) {
    super();
    const defaultData = {
      columns: [
        { id: "1", title: "Todo", items: [] },
        { id: "2", title: "Doing", items: [] },
        { id: "3", title: "Done", items: [] },
      ],
    }
    // set the data
    this.data = data;

    // if we don't have any data, we can't do anything
    if (
      !data ||
      !data.columns ||
      !Array.isArray(data.columns) ||
      data.columns.length === 0
    ) {
      // set default data
      this.data = defaultData;
    }
  }

  /**
   * Add event listeners
   * @returns void
   */
  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * Remove event listeners
   * @returns void
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  /**
   * Render the kanban board
   * @returns html
   */
  render() {
    return html`<div
      class="kanban"
      @kanban-item-drop="${this._itemDropHandler}"
      @kanban-item-update="${this._itemUpdateHandler}"
      @kanban-item-delete="${this._itemDeleteHandler}"
      @kanban-item-add="${this._itemAddHandler}"
      @kanban-column-update="${this._columnUpdateHandler}"
    >
      ${this.data?.columns?.map((column) => {
        return html`<kanban-column
          id="${column.id}"
          title="${column.title}"
          items="${JSON.stringify(column.items)}"
        ></kanban-column>`;
      })}
      <!-- A modal dialog containing a form -->
      <dialog>
        <form>
          <p>Are you sure you want to delete this item?</p>
          <div>
            <button value="cancel" formmethod="dialog">Cancel</button>
            <button value="yes">Confirm</button>
          </div>
        </form>
      </dialog>
    </div>`;
  }

  /**
   * Update the item's column and position
   * @param e CustomEvent
   * @returns void
   */
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
  };

  /**
   * Update the item's content
   * @param e CustomEvent
   * @returns void
   */
  private _itemUpdateHandler = (e: CustomEvent) => {
    this.kanbanAPI.updateItem(e.detail.id, { content: e.detail.content });
  };

  /**
   * Delete the item
   * @param e CustomEvent
   * @returns void
   */
  private _itemDeleteHandler = (e: CustomEvent) => {
    // "Show the dialog" opens the <dialog> modally
    this._dialog.showModal();

    this._dialog.addEventListener("click", (e) => {
      const dialogDimensions = this._dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        this._dialog.close("cancel");
      }
    });

    // Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
    this._dialogConfirmButton.addEventListener("click", (event) => {
      event.preventDefault(); // We don't want to submit this fake form
      this._dialog.close(this._dialogConfirmButton.value); // Have to send the select box value here.
    });

    // "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
    this._dialog.addEventListener("close", (_event) => {
      if (this._dialog.returnValue === "yes") {
        this.kanbanAPI.deleteItem(e.detail.id);
      }
    });
  };

  /**
   * Add a new item to the column
   * @param e CustomEvent
   * @returns void
   */
  private _itemAddHandler = (e: CustomEvent) => {
    this.kanbanAPI.insertItem(e.detail.columnId, e.detail.item);
  };

  /**
   * Update the column's title
   * @param e CustomEvent
   * @returns void
   */
  private _columnUpdateHandler = (e: CustomEvent) => {
    this.kanbanAPI.updateColumn(e.detail.id, e.detail.title);
  };
}
