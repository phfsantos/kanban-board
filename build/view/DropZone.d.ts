import { CSSResultGroup, LitElement } from "lit";
export default class DropZone extends LitElement {
    static styles?: CSSResultGroup;
    _dropzone: HTMLDivElement;
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _dragOverHandler;
    private _dragLeaveHandler;
    private _dropHandler;
}
