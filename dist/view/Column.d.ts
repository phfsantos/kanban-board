import { LitElement, PropertyValueMap } from "lit";
import { KanbanItem } from "../index.js";
import "./Item";
import "./DropZone";
export default class Column extends LitElement {
    id: string;
    title: string;
    items: KanbanItem[];
    static styles: import("lit").CSSResult;
    _input: HTMLDivElement;
    private _statusMessage;
    /**
     * Update the kanban column
     * @param changedProperties
     * @returns void
     */
    update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    /**
     * Render the kanban column
     * @returns {ReturnType<LitElement["render"]>}
     * @memberof Column
     * @description This method is used to render the kanban column
     */
    protected render(): ReturnType<LitElement["render"]>;
    /**
     * Handle the blur event
     * @private
     * @returns {void}
     * @memberof Column
     * @description This method is used to handle the blur event
     * @returns {void}
     */
    private _blurHandler;
    /**
     * Generate a unique ID for kanban items
     * Combines timestamp with random component to ensure uniqueness
     * @private
     * @returns {string} Unique ID in format: timestamp-randomString
     * @memberof Column
     * @description This method generates collision-resistant unique IDs
     */
    private _generateUniqueId;
    /**
     * Announce change to screen readers
     * @private
     * @param {string} message
     * @returns {void}
     */
    private _announceChange;
    /**
     * Handle keyboard events on column title
     * @private
     * @param {KeyboardEvent} e
     * @returns {void}
     */
    private _handleColumnKeydown;
    /**
     * Handle keyboard events on add button
     * @private
     * @param {KeyboardEvent} e
     * @returns {void}
     */
    private _handleAddButtonKeydown;
    /**
     * Handle the add item event
     * @private
     * @param {MouseEvent} _e
     * @returns {void}
     * @memberof Column
     * @description This method is used to handle the add item event
     */
    private _addItem;
}
//# sourceMappingURL=Column.d.ts.map