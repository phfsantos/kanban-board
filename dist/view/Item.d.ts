import { LitElement, PropertyValueMap } from "lit";
export default class Item extends LitElement {
    id: string;
    content: string;
    _input: HTMLDivElement;
    _itemElement: HTMLDivElement;
    private _dragPreview;
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
     * @param _e Event (unused)
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
     * Create a custom drag preview with enhanced styling
     * @param e DragEvent
     * @returns void
     * @private
     * @memberof Item
     * @description Creates a styled clone of the item for drag preview
     */
    private _createDragPreview;
    /**
     * Handle the drag end event
     * @returns void
     * @private
     * @memberof Item
     * @description Cleans up dragging state after drag completes
     */
    private _dragEndHandler;
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
//# sourceMappingURL=Item.d.ts.map