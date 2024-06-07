import { ReactiveController } from "lit";
import { KanbanBoard, KanbanItem } from "..";

export class KanbanController implements ReactiveController {
  host: KanbanBoard;

  constructor(host: KanbanBoard) {
    (this.host = host).addController(this);
  }

  hostConnected(): void {}

  hostDisconnected(): void {}

  getItems(columnId: string) {
    const column = { ...this.host.data }.columns.find(
      (column) => column.id == columnId
    );

    if (!column) {
      return [];
    }

    return column.items;
  }

  insertItem(columnId: string, item: KanbanItem) {
    const data = { ...this.host.data };
    const column = data.columns.find((column) => column.id == columnId);

    if (!column) {
      throw new Error("Column does not exist.");
    }

    column.items.push(item);

    this.host.textContent = JSON.stringify(data);
    this.host.data = data;
    this.host.requestUpdate("data");

    return item;
  }

  updateItem(itemId, newProps) {
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

    this.host.textContent = JSON.stringify(data);
    this.host.data = data;
    this.host.requestUpdate("data");
  }

  deleteItem(itemId) {
    const data = { ...this.host.data };

    for (const column of data.columns) {
      const item = column.items.find((item) => item.id == itemId);

      if (item) {
        column.items.splice(column.items.indexOf(item), 1);
      }
    }

    this.host.textContent = JSON.stringify(data);
    this.host.data = data;
    this.host.requestUpdate("data");
  }
}
