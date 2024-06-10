import { CSSResultGroup, LitElement } from "lit";
export default class DropZone extends LitElement {
    static styles?: CSSResultGroup;
    _dropzone: HTMLDivElement;
    /**
     * Render the kanban dropzone
     * @returns {ReturnType<LitElement["render"]>}
     * @memberof DropZone
     */
    render(): ReturnType<LitElement["render"]>;
    /**
     * Connect the kanban dropzone
     * @returns {void}
     * @memberof DropZone
     * @description This method is used to connect the kanban dropzone
     */
    connectedCallback(): void;
    /**
     * Disconnect the kanban dropzone
     * @returns {void}
     * @memberof DropZone
     * @description This method is used to disconnect the kanban dropzone
     */
    disconnectedCallback(): void;
    /**
     * Handle the drag over event
     * @param {DragEvent} e
     * @returns {void}
     * @private
     * @memberof DropZone
     * @description This method is used to handle the drag over event
     */
    private _dragOverHandler;
    /**
     * Handle the drag leave event
     * @param {DragEvent} e
     * @returns {void}
     * @private
     * @memberof DropZone
     * @description This method is used to handle the drag leave event
     */
    private _dragLeaveHandler;
    /**
     * Handle the drop event
     * @param {DragEvent} e
     * @returns {void}
     * @private
     * @memberof DropZone
     * @description This method is used to handle the drop event
     */
    private _dropHandler;
}
