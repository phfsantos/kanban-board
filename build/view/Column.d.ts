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
     * Handle the add item event
     * @private
     * @param {MouseEvent} _e
     * @returns {void}
     * @memberof Column
     * @description This method is used to handle the add item event
     */
    private _addItem;
}
