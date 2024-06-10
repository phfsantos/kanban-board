import { LitElement, PropertyValueMap } from "lit";
export default class Item extends LitElement {
    id: string;
    content: string;
    _input: HTMLDivElement;
    /**
     * Constructor
     * @description This method is used to create an instance of the Item class
     * @returns void
     * @memberof Item
     * @description This method is used to create an instance of the Item class
     */
    constructor();
    static styles: import("lit").CSSResult;
    /**
     * Update the kanban item
     * @param changedProperties
     * @returns void
     */
    update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    /**
     * Render the kanban item
     * @returns {ReturnType<LitElement["render"]>}
     * @memberof Item
     * @description This method is used to render the kanban item
     * @returns void
     */
    render(): ReturnType<LitElement["render"]>;
    /**
     * Handle the blur event
     * @returns void
     * @private
     * @memberof Item
     * @description This method is used to handle the blur event
     */
    private _blurHandler;
    /**
     * Handle the delete event
     * @param e Event
     * @returns void
     * @private
     * @memberof Item
     * @description This method is used to handle the delete event
     */
    private _deleteHandler;
    /**
     * Handle the drag start event
     * @param e DragEvent
     * @returns void
     * @private
     * @memberof Item
     * @description This method is used to handle the drag start event
     */
    private _dragStartHandler;
    /**
     * Prevent the default drop behavior
     * @param e DragEvent
     * @returns void
     * @private
     * @memberof Item
     * @description This method is used to prevent the default drop behavior
     * @returns void
     */
    private _dropHandler;
}
