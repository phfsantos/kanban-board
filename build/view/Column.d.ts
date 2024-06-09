import { LitElement } from "lit";
import { KanbanItem } from "../index.js";
import "./Item";
import "./DropZone";
export default class Column extends LitElement {
    id: string;
    title: string;
    items: KanbanItem[];
    static styles: import("lit").CSSResult;
    _input: HTMLDivElement;
    protected render(): ReturnType<LitElement["render"]>;
    private _blurHandler;
    private _addItem;
}
