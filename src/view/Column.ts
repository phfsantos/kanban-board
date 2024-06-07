import { customElement, property } from "lit/decorators.js";
import { LitElement, css, html } from "lit";
import { KanbanItem } from "../index.js";

import "./Item";
import "./DropZone";

@customElement("kanban-column")
export default class Column extends LitElement {
  @property()
  id: string;
  @property()
  title: string;
  @property({ type: Array, reflect: true })
  items: KanbanItem[];

  static styles = css`
    :host {
      flex: 1;
    }

    :host:not(:last-child) {
      margin-right: 30px;
    }

    .kanban__column-title {
      margin-bottom: 20px;
      font-size: 30px;
      color: white;
      user-select: none;
    }
  `;

  protected render(): ReturnType<LitElement["render"]> {
    return html` <div class="kanban__column-title">${this.title}</div>
      <div class="kanban__column-items">
        <kanban-dropzone></kanban-dropzone>
        ${this.items.map(
          (item) =>
            html`<kanban-item
                id="${item.id}"
                content="${item.content}"
              ></kanban-item>
              <kanban-dropzone></kanban-dropzone>`
        )}
      </div>
      <button class="kanban__add-item" @click="${this._addItem}" type="button">
        + Add
      </button>`;
  }

  private _addItem(_e: MouseEvent) {
    const newItem = {
      id: String(Math.floor(Math.random() * 100000)),
      content: "",
    };

    this.dispatchEvent(
      new CustomEvent("kanban-item-add", {
        bubbles: true,
        composed: true,
        detail: { columnId: this.id, item: newItem },
      })
    );
  }
}
