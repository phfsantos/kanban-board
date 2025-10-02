import { ERROR_MESSAGES } from "..";
/**
 * Custom error class for validation errors
 * @class ValidationError
 * @extends Error
 * @since 1.2.0
 */
export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
export class KanbanController {
    // Define the constructor for the kanban controller
    constructor(host) {
        (this.host = host).addController(this);
    }
    // Define the host connected for the kanban controller
    hostConnected() { }
    // Define the host disconnected for the kanban controller
    hostDisconnected() { }
    /**
     * Validate column ID
     * @param columnId string
     * @returns void
     * @throws {ValidationError}
     * @private
     * @memberof KanbanController
     * @since 1.2.0
     */
    _validateColumnId(columnId) {
        if (!columnId || typeof columnId !== 'string') {
            throw new ValidationError(ERROR_MESSAGES.INVALID_COLUMN_ID);
        }
        if (!this.host.data.columns) {
            throw new ValidationError(ERROR_MESSAGES.NO_COLUMNS);
        }
        const exists = this.host.data.columns.some(c => c.id === columnId);
        if (!exists) {
            throw new ValidationError(ERROR_MESSAGES.COLUMN_NOT_FOUND);
        }
    }
    /**
     * Validate item ID
     * @param itemId string
     * @returns void
     * @throws {ValidationError}
     * @private
     * @memberof KanbanController
     * @since 1.2.0
     */
    _validateItemId(itemId) {
        if (!itemId || typeof itemId !== 'string') {
            throw new ValidationError(ERROR_MESSAGES.INVALID_ITEM_ID);
        }
        if (!this.host.data.columns) {
            throw new ValidationError(ERROR_MESSAGES.NO_COLUMNS);
        }
        const found = this._findItemAndColumn(this.host.data.columns, itemId);
        if (!found) {
            throw new ValidationError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }
    }
    /**
     * Validate item data
     * @param item KanbanItem
     * @returns void
     * @throws {ValidationError}
     * @private
     * @memberof KanbanController
     * @since 1.2.0
     */
    _validateItem(item) {
        if (!item || typeof item !== 'object') {
            throw new ValidationError(ERROR_MESSAGES.INVALID_DATA);
        }
        if (!item.id || typeof item.id !== 'string') {
            throw new ValidationError('Item must have a valid ID');
        }
        if (item.content !== undefined && typeof item.content !== 'string') {
            throw new ValidationError('Item content must be a string');
        }
    }
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
    getItems(columnId) {
        const data = Object.assign({}, this.host.data);
        if (!data.columns) {
            return [];
        }
        const column = data.columns.find((column) => column.id === columnId);
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
     * @version 1.2.0
     * @public
     */
    insertItem(columnId, item) {
        // Validate inputs
        this._validateColumnId(columnId);
        this._validateItem(item);
        const data = Object.assign({}, this.host.data);
        if (!data.columns) {
            throw new ValidationError(ERROR_MESSAGES.NO_COLUMNS);
        }
        const column = data.columns.find((column) => column.id === columnId);
        if (!column) {
            throw new ValidationError(ERROR_MESSAGES.COLUMN_NOT_FOUND);
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
     * @version 1.2.0
     * @public
     */
    updateColumn(columnId, newTitle) {
        // Validate inputs
        this._validateColumnId(columnId);
        if (newTitle !== undefined && typeof newTitle !== 'string') {
            throw new ValidationError('Column title must be a string');
        }
        const data = Object.assign({}, this.host.data);
        if (!data.columns) {
            throw new ValidationError(ERROR_MESSAGES.NO_COLUMNS);
        }
        const column = data.columns.find((column) => column.id === columnId);
        if (!column) {
            throw new ValidationError(ERROR_MESSAGES.COLUMN_NOT_FOUND);
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
     * @version 1.2.0
     * @public
     */
    updateItem(itemId, newProps) {
        // Validate item ID
        this._validateItemId(itemId);
        // Validate new properties
        if (!newProps || typeof newProps !== 'object') {
            throw new ValidationError(ERROR_MESSAGES.INVALID_DATA);
        }
        if (newProps.content !== undefined && typeof newProps.content !== 'string') {
            throw new ValidationError('Item content must be a string');
        }
        if (newProps.position !== undefined && typeof newProps.position !== 'number') {
            throw new ValidationError('Item position must be a number');
        }
        // If columnId is provided, validate it
        if (newProps.columnId !== undefined) {
            this._validateColumnId(newProps.columnId);
        }
        const data = Object.assign({}, this.host.data);
        if (!data.columns) {
            throw new ValidationError(ERROR_MESSAGES.NO_COLUMNS);
        }
        const result = this._findItemAndColumn(data.columns, itemId);
        if (!result) {
            throw new ValidationError(ERROR_MESSAGES.ITEM_NOT_FOUND);
        }
        const [item, currentColumn] = result;
        item.content =
            newProps.content === undefined ? item.content : newProps.content;
        // Update column and position
        if (newProps.columnId !== undefined && newProps.position !== undefined) {
            if (!data.columns) {
                throw new ValidationError(ERROR_MESSAGES.NO_COLUMNS);
            }
            const targetColumn = data.columns.find((column) => column.id === newProps.columnId);
            if (!targetColumn) {
                throw new ValidationError(ERROR_MESSAGES.COLUMN_NOT_FOUND);
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
    deleteItem(itemId) {
        const data = Object.assign({}, this.host.data);
        if (!data.columns) {
            console.warn('No columns available to delete from');
            return;
        }
        for (const column of data.columns) {
            const item = column.items.find((item) => item.id === itemId);
            if (item) {
                column.items.splice(column.items.indexOf(item), 1);
            }
        }
        this._saveData(data);
    }
    /**
     * Find an item and its column
     * @param columns KanbanColumn[]
     * @param itemId string
     * @returns [KanbanItem, KanbanColumn] | null
     * @private
     * @memberof KanbanController
     * @description Helper method to safely find an item and its containing column
     */
    _findItemAndColumn(columns, itemId) {
        for (const column of columns) {
            const item = column.items.find((item) => item.id === itemId);
            if (item) {
                return [item, column];
            }
        }
        return null;
    }
    /**
     * Find an item and its column (public API)
     * Helper method to safely find items with proper null checks
     * @param {string} itemId
     * @returns {[KanbanItem, import("..").KanbanColumn] | null}
     * @public
     * @memberof KanbanController
     */
    findItemAndColumn(itemId) {
        const data = this.host.data;
        if (!data.columns) {
            return null;
        }
        return this._findItemAndColumn(data.columns, itemId);
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
    _saveData(data) {
        this.host.textContent = JSON.stringify(data);
        const oldData = this.host.data;
        this.host.data = data;
        this.host.requestUpdate("data", oldData);
        this.host.dispatchEvent(new CustomEvent("kanban-save", {
            detail: data,
            bubbles: true,
            composed: true,
        }));
    }
}
//# sourceMappingURL=kanban.js.map