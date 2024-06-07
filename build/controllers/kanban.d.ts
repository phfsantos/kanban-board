import { ReactiveController } from "lit";
import { KanbanBoard, KanbanItem } from "..";
export declare class KanbanController implements ReactiveController {
    host: KanbanBoard;
    constructor(host: KanbanBoard);
    hostConnected(): void;
    hostDisconnected(): void;
    getItems(columnId: string): KanbanItem[];
    insertItem(columnId: string, item: KanbanItem): KanbanItem;
    updateItem(itemId: any, newProps: any): void;
    deleteItem(itemId: any): void;
}
