import { LitElement } from "lit";
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
