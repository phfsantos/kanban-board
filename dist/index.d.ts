import { LitElement } from "lit";
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
export declare class KanbanBoard extends LitElement {
    private kanbanAPI;
    static styles: import("lit").CSSResult;
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
    data: KanbanBoardData;
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
    constructor(data: KanbanBoardData);
    /**
     * Add event listeners
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
}
//# sourceMappingURL=index.d.ts.map