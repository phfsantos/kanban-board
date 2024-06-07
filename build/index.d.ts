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
    data: KanbanBoardData;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private _itemDropHandler;
    private _itemUpdateHandler;
    private _itemDeleteHandler;
    private _itemAddHandler;
}
