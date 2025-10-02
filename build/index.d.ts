import { LitElement } from "lit";
import { z } from "zod";
import Column from "./view/Column";
import Item from "./view/Item";
import DropZone from "./view/DropZone";
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
/**
 * Zod schemas for runtime validation
 * @const KanbanItemSchema
 * @const KanbanColumnSchema
 * @const KanbanBoardDataSchema
 * @memberof KanbanBoard
 * @since 1.3.0
 */
export declare const KanbanItemSchema: z.ZodObject<{
    id: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export declare const KanbanColumnSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        content: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const KanbanBoardDataSchema: z.ZodObject<{
    columns: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            content: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/**
 * Error types for the kanban board
 * @type {KanbanError}
 * @memberof KanbanBoard
 * @since 1.2.0
 */
export type KanbanError = {
    type: 'validation' | 'operation' | 'system';
    message: string;
    details?: any;
    userMessage?: string;
};
/**
 * User-friendly error messages
 * @const ERROR_MESSAGES
 * @memberof KanbanBoard
 * @since 1.2.0
 */
export declare const ERROR_MESSAGES: {
    readonly COLUMN_NOT_FOUND: "The column you are trying to update does not exist";
    readonly ITEM_NOT_FOUND: "The item you are trying to update does not exist";
    readonly INVALID_DATA: "The data provided is invalid";
    readonly SAVE_FAILED: "Failed to save your changes";
    readonly NO_COLUMNS: "No columns are available";
    readonly INVALID_COLUMN_ID: "Invalid column ID provided";
    readonly INVALID_ITEM_ID: "Invalid item ID provided";
    readonly MOVE_FAILED: "Failed to move the item";
    readonly DELETE_FAILED: "Failed to delete the item";
    readonly UPDATE_FAILED: "Failed to update the item";
    readonly ADD_FAILED: "Failed to add the item";
};
export declare class KanbanBoard extends LitElement {
    private kanbanAPI;
    static styles: import("lit").CSSResult;
    /**
     * Internal data storage for the kanban board
     * No longer reflected to attribute to avoid size/encoding issues
     * Use setData() and getData() methods instead
     * @type {KanbanBoardData}
     * @memberof KanbanBoard
     * @since 1.0.0
     * @version 1.3.0
     * @private
     */
    private _data;
    /**
     * Getter for backwards compatibility
     * @deprecated Use getData() method instead
     */
    get data(): KanbanBoardData;
    /**
     * Setter for backwards compatibility
     * @deprecated Use setData() method instead
     */
    set data(value: KanbanBoardData);
    _dialog: HTMLDialogElement;
    _dialogConfirmButton: HTMLButtonElement;
    private _pendingDeleteId;
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
    constructor(data?: KanbanBoardData);
    /**
     * Emit an error event with user-friendly feedback
     * @param error KanbanError
     * @returns void
     * @private
     * @memberof KanbanBoard
     * @since 1.2.0
     */
    private _emitError;
    /**
     * Get the current kanban board data
     * @returns {KanbanBoardData} Current board data
     * @public
     * @memberof KanbanBoard
     * @since 1.3.0
     */
    getData(): KanbanBoardData;
    /**
     * Set the kanban board data with validation
     * @param {KanbanBoardData} data - The data to set
     * @param {boolean} dispatchEvent - Whether to dispatch a change event (default: true)
     * @returns {boolean} True if data was set successfully, false otherwise
     * @public
     * @memberof KanbanBoard
     * @since 1.3.0
     */
    setData(data: KanbanBoardData, dispatchEvent?: boolean): boolean;
    /**
     * Dispatch a data change event for external persistence
     * @private
     * @memberof KanbanBoard
     * @since 1.3.0
     */
    private _dispatchDataChange;
    /**
     * Add event listeners and handle backwards compatibility
     * @returns void
     */
    connectedCallback(): void;
    /**
     * Remove event listeners
     * @returns void
     */
    disconnectedCallback(): void;
    /**
     * Setup dialog event listeners once
     * @returns void
     * @private
     */
    private _setupDialogListeners;
    /**
     * Cleanup dialog event listeners
     * @returns void
     * @private
     */
    private _cleanupDialogListeners;
    /**
     * Handle clicking on dialog backdrop to close
     * @param e MouseEvent
     * @returns void
     * @private
     */
    private _handleDialogBackdropClick;
    /**
     * Handle dialog confirm button click
     * @param event MouseEvent
     * @returns void
     * @private
     */
    private _handleDialogConfirm;
    /**
     * Handle dialog close event
     * @param _event Event
     * @returns void
     * @private
     */
    private _handleDialogClose;
    /**
     * Render the kanban board
     * @returns html
     */
    render(): import("lit-html").TemplateResult<1>;
    /**
     * Update the item's column and position
     * @param e CustomEvent
     * @returns void
     */
    private _itemDropHandler;
    /**
     * Safely extract column ID from dropzone element
     * @param dropzone Element
     * @returns string | null
     * @private
     */
    private _getColumnIdFromDropzone;
    /**
     * Animate the dropped item with a bounce effect
     * @param itemId string
     * @returns void
     * @private
     */
    private _animateDroppedItem;
    /**
     * Update the item's content
     * @param e CustomEvent
     * @returns void
     */
    private _itemUpdateHandler;
    /**
     * Delete the item
     * @param e CustomEvent
     * @returns void
     */
    private _itemDeleteHandler;
    /**
     * Add a new item to the column
     * @param e CustomEvent
     * @returns void
     */
    private _itemAddHandler;
    /**
     * Update the column's title
     * @param e CustomEvent
     * @returns void
     */
    private _columnUpdateHandler;
    /**
     * Handle keyboard-based item movement
     * @param e CustomEvent
     * @returns void
     * @private
     */
    private _itemMoveHandler;
    /**
     * Focus an item after it has been moved
     * @param itemId string
     * @returns void
     * @private
     */
    private _focusItem;
}
//# sourceMappingURL=index.d.ts.map