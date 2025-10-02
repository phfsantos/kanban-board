import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { KanbanController } from "./controllers/kanban";

// Import and export child components to ensure they're included in bundle
import Column from "./view/Column";
import Item from "./view/Item";
import DropZone from "./view/DropZone";

// Export them so they're not tree-shaken
export { Column, Item, DropZone };

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

  /**
   * Define the properties for the kanban board
   * @type {KanbanBoardData}
   * @memberof KanbanBoard
   * @since 1.0.0
   * @version 1.0.0
   * @example
   * ```ts
   * const data = {
   * columns: [
   *  { id: "1", title: "Todo", items: [] },
   * { id: "2", title: "Doing", items: [] },
   * { id: "3", title: "Done", items: [] },
   * ],
   * };
   * ```
   * @public
   * @readonly
   */
  @property({
    reflect: true,
    type: Object,
    converter: {
      toAttribute: (value) => encodeURIComponent(JSON.stringify(value)),
      fromAttribute: (value) => JSON.parse(decodeURIComponent(String(value))),
    },
  })
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

  // Store the ID of the item pending deletion
  private _pendingDeleteId: string | null = null;

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
    };
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
    // Setup dialog listeners once
    this.updateComplete.then(() => {
      this._setupDialogListeners();
    });
  }

  /**
   * Remove event listeners
   * @returns void
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    // Clean up dialog listeners
    this._cleanupDialogListeners();
  }

  /**
   * Setup dialog event listeners once
   * @returns void
   * @private
   */
  private _setupDialogListeners() {
    if (!this._dialog || !this._dialogConfirmButton) {
      return;
    }

    this._dialog.addEventListener("click", this._handleDialogBackdropClick);
    this._dialogConfirmButton.addEventListener(
      "click",
      this._handleDialogConfirm
    );
    this._dialog.addEventListener("close", this._handleDialogClose);
  }

  /**
   * Cleanup dialog event listeners
   * @returns void
   * @private
   */
  private _cleanupDialogListeners() {
    if (!this._dialog || !this._dialogConfirmButton) {
      return;
    }

    this._dialog.removeEventListener("click", this._handleDialogBackdropClick);
    this._dialogConfirmButton.removeEventListener(
      "click",
      this._handleDialogConfirm
    );
    this._dialog.removeEventListener("close", this._handleDialogClose);
  }

  /**
   * Handle clicking on dialog backdrop to close
   * @param e MouseEvent
   * @returns void
   * @private
   */
  private _handleDialogBackdropClick = (e: MouseEvent) => {
    const dialogDimensions = this._dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      this._dialog.close("cancel");
    }
  };

  /**
   * Handle dialog confirm button click
   * @param event MouseEvent
   * @returns void
   * @private
   */
  private _handleDialogConfirm = (event: MouseEvent) => {
    event.preventDefault(); // We don't want to submit this fake form
    this._dialog.close(this._dialogConfirmButton.value); // Have to send the select box value here.
  };

  /**
   * Handle dialog close event
   * @param _event Event
   * @returns void
   * @private
   */
  private _handleDialogClose = (_event: Event) => {
    if (this._dialog.returnValue === "yes" && this._pendingDeleteId) {
      this.kanbanAPI.deleteItem(this._pendingDeleteId);
      this._pendingDeleteId = null;
    }
  };

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
      </div>
      <!-- A modal dialog containing a form -->
      <dialog>
        <form>
          <p>Are you sure you want to delete this item?</p>
          <div>
            <button value="cancel" formmethod="dialog">Cancel</button>
            <button value="yes">Confirm</button>
          </div>
        </form>
      </dialog>`;
  }

  /**
   * Update the item's column and position
   * @param e CustomEvent
   * @returns void
   */
  private _itemDropHandler = (e: CustomEvent) => {
    const dropzone = e.detail.dropzone;
    const columnId = this._getColumnIdFromDropzone(dropzone);
    
    if (!columnId) {
      console.error('Could not determine column ID from dropzone');
      return;
    }
    
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
    
    // Add drop animation to the moved item
    this._animateDroppedItem(itemId);
  };

  /**
   * Safely extract column ID from dropzone element
   * @param dropzone Element
   * @returns string | null
   * @private
   */
  private _getColumnIdFromDropzone(dropzone: Element): string | null {
    const parent = dropzone.parentElement;
    if (!parent) return null;
    
    const parentNode = parent.parentNode;
    if (!parentNode) return null;
    
    // Check if parentNode is a ShadowRoot and has a host
    if (!('host' in parentNode)) return null;
    
    const host = (parentNode as ShadowRoot).host;
    if (!host) return null;
    
    // Check if host has an id property
    if (!('id' in host)) return null;
    
    const id = (host as Element).id;
    return id || null;
  }

  /**
   * Animate the dropped item with a bounce effect
   * @param itemId string
   * @returns void
   * @private
   */
  private _animateDroppedItem(itemId: string): void {
    // Wait for the DOM to update, then find and animate the item
    setTimeout(() => {
      const itemElement = this.shadowRoot?.querySelector(`#item-${itemId}`) as HTMLElement;
      if (itemElement) {
        itemElement.classList.add('dropping');
        // Remove class after animation completes
        setTimeout(() => {
          itemElement.classList.remove('dropping');
        }, 500);
      }
    }, 50);
  }

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
    // Store the ID of the item to be deleted
    this._pendingDeleteId = e.detail.id;
    // Show the confirmation dialog
    this._dialog.showModal();
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
