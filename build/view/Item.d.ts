import { LitElement } from "lit";
export default class Item extends LitElement {
    id: string;
    content: string;
    _input: HTMLDivElement;
    constructor();
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    private _blurHandler;
    private _deleteHandler;
    private _dragStartHandler;
    private _dropHandler;
}
