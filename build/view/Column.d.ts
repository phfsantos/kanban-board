import { LitElement } from "lit";
import { KanbanItem } from "../index.js";
import "./Item";
import "./DropZone";
export default class Column extends LitElement {
    id: string;
    title: string;
    items: KanbanItem[];
    static styles: import("lit").CSSResult;
    protected render(): ReturnType<LitElement["render"]>;
    private _addItem;
}
