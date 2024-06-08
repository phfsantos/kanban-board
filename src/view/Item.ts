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
    :host {
      position: relative;
    }

    :host * {
      font-family: inherit;
    }

    .kanban__item-input {
      padding: 10px 15px;
      box-sizing: border-box;
      background: white;
      border-radius: 5px;
      cursor: pointer;
      background: rgba(120, 120, 120, 0.1);
    }

    .kanban__item-delete {
      cursor: pointer;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.5);
      user-select: none;
      border-radius: 15px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 5px;
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 10px;
      color: darkred;
    }
  `;

  update(changedProperties): void {
    super.update(changedProperties);
    if (
      changedProperties.has("content") &&
      this._input.innerText !== this.content
    ) {
      this._input.innerText = this.content;
    }
  }

  render() {
    return html`<div
      class="kanban__item"
      data-id="${this.id}"
      id="item-${this.id}"
      @dragstart="${this._dragStartHandler}"
      draggable="true"
    >
      <div
        class="kanban__item-input"
        @drop="${this._dropHandler}"
        @blur="${this._blurHandler}"
        contenteditable
      ></div>
      <div class="kanban__item-delete" @click="${this._deleteHandler}">🗑️</div>
    </div>`;
  }

  private _blurHandler() {
    const newContent = this._input.innerText.trim();

    if (newContent == this.content) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent("kanban-item-update", {
        bubbles: true,
        composed: true,
        detail: { id: this.id, content: newContent },
      })
    );
  }

  private _deleteHandler(e: Event) {
    this.dispatchEvent(
      new CustomEvent("kanban-item-delete", {
        bubbles: true,
        composed: true,
        detail: { id: this.id },
      })
    );
  }

  private _dragStartHandler(e: DragEvent) {
    e.dataTransfer.setData("text/plain", this.id);
  }

  private _dropHandler(e: Event) {
    e.preventDefault();
  }
}
