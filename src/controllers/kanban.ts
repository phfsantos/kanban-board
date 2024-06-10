import { ReactiveController } from "lit";
import { KanbanBoard, KanbanBoardData, KanbanItem } from "..";

export class KanbanController implements ReactiveController {
  // Define the host for the kanban controller
  host: KanbanBoard;

  // Define the constructor for the kanban controller
  constructor(host: KanbanBoard) {
    (this.host = host).addController(this);
  }

  // Define the host connected for the kanban controller
  hostConnected(): void {}

  // Define the host disconnected for the kanban controller
  hostDisconnected(): void {}

  /**
   * Get the items for the kanban controller
   * @param {string} columnId
   * @returns {KanbanItem[]}
   * @memberof KanbanController
   * @description This method is used to get the items for the kanban controller
   * @example
   * ```ts
   * const items = kanban.getItems("1");
   * ```
   * @since 1.0.0
   * @version 1.0.0
   * @public
   */
  getItems(columnId: string): KanbanItem[] {
    const column = { ...this.host.data }.columns.find(
      (column) => column.id == columnId
    );

    if (!column) {
      return [];
    }

    return column.items;
  }

  /**
   * Insert an item for the kanban controller
   * @param {string} columnId
   * @param {KanbanItem} item
   * @returns {KanbanItem}
   * @memberof KanbanController
   * @description This method is used to insert an item for the kanban controller
   * @example
   * ```ts
   * const item = kanban.insertItem("1", { id: "1", content: "Hello" });
   * ```
   * @since 1.0.0
   * @version 1.0.0
   * @public
   */
  insertItem(columnId: string, item: KanbanItem) {
    const data = { ...this.host.data };
    const column = data.columns.find((column) => column.id == columnId);

    if (!column) {
      throw new Error("Column does not exist.");
    }

    column.items.push(item);

    this._saveData(data);

    return item;
  }

  /**
   * Insert a column for the kanban controller
   * @param {string} newTitle
   * @param {string} columnId
   * @returns {void}
   * @memberof KanbanController
   * @description This method is used to insert a column for the kanban controller
   * @example
   * ```ts
   * kanban.insertColumn("Hello");
   * ```
   * @since 1.0.0
   * @version 1.0.0
   * @public
   */
  updateColumn(columnId: string, newTitle: string) {
    const data = { ...this.host.data };
    const [column] = data.columns.filter((column) => column.id == columnId);

    if (!column) {
      throw new Error("Column not found.");
    }

    column.title = newTitle === undefined ? column.title : newTitle;

    this._saveData(data);
  }

  /**
   * Delete a column for the kanban controller
   * @param {string} itemId
   * @param {{ content: string; columnId?: string; position?: number }} newProps
   * @returns {void}
   * @memberof KanbanController
   * @description This method is used to delete a column for the kanban controller
   * @example
   * ```ts
   * kanban.deleteColumn("1");
   * ```
   * @since 1.0.0
   * @version 1.0.0
   * @public
   */
  updateItem(
    itemId: string,
    newProps: { content?: string; columnId?: string; position?: number }
  ): void {
    const data = { ...this.host.data };
    const [item, currentColumn] = (() => {
      for (const column of data.columns) {
        const item = column.items.find((item) => item.id == itemId);

        if (item) {
          return [item, column];
        }
      }
    })();

    if (!item) {
      throw new Error("Item not found.");
    }

    item.content =
      newProps.content === undefined ? item.content : newProps.content;

    // Update column and position
    if (newProps.columnId !== undefined && newProps.position !== undefined) {
      const targetColumn = data.columns.find(
        (column) => column.id == newProps.columnId
      );

      if (!targetColumn) {
        throw new Error("Target column not found.");
      }

      // Delete the item from it's current column
      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

      // Move item into it's new column and position
      targetColumn.items.splice(newProps.position, 0, item);
    }

    this._saveData(data);
  }

  /**
   * Delete an item for the kanban controller
   * @param {string} itemId
   * @returns {void}
   * @memberof KanbanController
   * @description This method is used to delete an item for the kanban controller
   * @example
   * ```ts
   * kanban.deleteItem("1");
   * ```
   * @since 1.0.0
   * @version 1.0.0
   * @public
   */
  deleteItem(itemId: string): void {
    const data = { ...this.host.data };

    for (const column of data.columns) {
      const item = column.items.find((item) => item.id == itemId);

      if (item) {
        column.items.splice(column.items.indexOf(item), 1);
      }
    }

    this._saveData(data);
  }

  /**
   * Save the data for the kanban controller
   * @param {KanbanBoardData} data
   * @returns {void}
   * @private
   * @memberof KanbanController
   * @description This method is used to save the data for the kanban controller
   * @example
   * ```ts
   * this._saveData(data);
   * ```
   * @since 1.0.0
   * @version 1.0.0
   */
  private _saveData(data: KanbanBoardData): void {
    this.host.textContent = JSON.stringify(data);
    const oldData = this.host.data;
    this.host.data = data;
    this.host.requestUpdate("data", oldData);
    this.host.dispatchEvent(
      new CustomEvent("kanban-save", {
        detail: data,
        bubbles: true,
        composed: true,
      })
    );
  }
}
