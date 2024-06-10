import { ReactiveController } from "lit";
import { KanbanBoard, KanbanItem } from "..";
export declare class KanbanController implements ReactiveController {
    host: KanbanBoard;
    constructor(host: KanbanBoard);
    hostConnected(): void;
    hostDisconnected(): void;
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
    getItems(columnId: string): KanbanItem[];
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
    insertItem(columnId: string, item: KanbanItem): KanbanItem;
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
    updateColumn(columnId: string, newTitle: string): void;
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
    updateItem(itemId: string, newProps: {
        content?: string;
        columnId?: string;
        position?: number;
    }): void;
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
    deleteItem(itemId: string): void;
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
    private _saveData;
}
