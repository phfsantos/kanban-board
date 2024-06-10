import { customElement, property, query } from "lit/decorators.js";
import { LitElement, PropertyValueMap, css, html } from "lit";
import { KanbanItem } from "../index.js";

import "./Item";
import "./DropZone";

@customElement("kanban-column")
export default class Column extends LitElement {
  // Define the properties for the kanban column
  @property()
  id: string;
  @property()
  title: string;
  @property({ type: Array, reflect: true })
  items: KanbanItem[];

  // Define the styles for the kanban column
  static styles = css`
    :host {
      flex: 1;
      font-family: inherit;
    }

    :host * {
      font-family: inherit;
    }

    .kanban__column-title {
      margin-bottom: 20px;
      font-size: 30px;
      color: inherit;
    }

    .kanban__add-item {
      width: 100%;
      padding: 10px 5px;
      margin-top: 10px;
      font-size: 16px;
      color: inherit;
      background: rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: inherit;
    }

    .kanban__add-item:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  `;

  // Define the template for the kanban column
  @query(".kanban__column-title")
  _input: HTMLDivElement;

  /**
   * Update the kanban column
   * @param changedProperties
   * @returns void
   */
  update(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.update(changedProperties);
    if (
      changedProperties.has("title") &&
      this._input.innerText !== this.title
    ) {
      this._input.innerText = this.title;
    }
  }

  /**
   * Render the kanban column
   * @returns {ReturnType<LitElement["render"]>}
   * @memberof Column
   * @description This method is used to render the kanban column
   */
  protected render(): ReturnType<LitElement["render"]> {
    return html` <div
        class="kanban__column-title"
        @blur="${this._blurHandler}"
        contenteditable
      ></div>
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

  /**
   * Handle the blur event
   * @private
   * @returns {void}
   * @memberof Column
   * @description This method is used to handle the blur event
   * @returns {void}
   */
  private _blurHandler(): void {
    const newTitle = this._input.innerText.trim();

    if (newTitle == this.title) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent("kanban-column-update", {
        bubbles: true,
        composed: true,
        detail: { id: this.id, title: newTitle },
      })
    );
  }

  /**
   * Handle the add item event
   * @private
   * @param {MouseEvent} _e
   * @returns {void}
   * @memberof Column
   * @description This method is used to handle the add item event
   */
  private _addItem(_e: MouseEvent): void {
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
