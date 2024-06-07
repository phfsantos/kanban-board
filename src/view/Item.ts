import { css, html, LitElement } from "lit";
import DropZone from "./DropZone.js";
import { customElement, property, query } from "lit/decorators.js";

@customElement("kanban-item")
export default class Item extends LitElement {
  @property()
  id: string;
  @property()
  content: string;

  @query(".kanban__item-input")
  _input: HTMLDivElement;

  constructor() {
    super();
  }

  static styles = css`
    .kanban__item-input {
      padding: 10px 15px;
      box-sizing: border-box;
      background: white;
      border-radius: 5px;
      cursor: pointer;
    }
  `;

  render() {
    return html`<div
      class="kanban__item"
      data-id="${this.id}"
      id="item-${this.id}"
      @dragstart="${this._dragStartHandler}"
      @dblclick="${this._deleteHandler}"
      draggable="true"
    >
      <div
        class="kanban__item-input"
        @drop="${this._dropHandler}"
        @blur="${this._blurHandler}"
        contenteditable
      >
        ${this.content}
      </div>
    </div>`;
  }

  private _blurHandler() {
    const newContent = this._input.textContent.trim();

    if (newContent == this.content) {
      return;
    }

    this.content = newContent;

    this.dispatchEvent(
      new CustomEvent("kanban-item-update", {
        bubbles: true,
        composed: true,
        detail: { id: this.id, content: newContent },
      })
    );
  }

  private _deleteHandler(e: Event) {
    const check = confirm("Are you sure you want to delete this item?");

    if (check) {
      this.dispatchEvent(
        new CustomEvent("kanban-item-delete", {
          bubbles: true,
          composed: true,
          detail: { id: this.id },
        })
      );
    }
  }

  private _dragStartHandler(e: DragEvent) {
    e.dataTransfer.setData("text/plain", this.id);
  }

  private _dropHandler(e: Event) {
    e.preventDefault();
  }
}
