import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("kanban-item")
export default class Item extends LitElement {
  // Define the properties for the kanban item
  @property()
  id: string;
  @property()
  content: string;

  // Define the queries for the kanban item
  @query(".kanban__item-input")
  _input: HTMLDivElement;

  /**
   * Constructor
   * @description This method is used to create an instance of the Item class
   * @returns void
   * @memberof Item
   * @description This method is used to create an instance of the Item class
   */
  constructor() {
    super();
  }

  // Define the styles for the kanban item
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

  /**
   * Update the kanban item
   * @param changedProperties
   * @returns void
   */
  update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.update(changedProperties);
    if (
      changedProperties.has("content") &&
      this._input.innerText !== this.content
    ) {
      this._input.innerText = this.content;
    }
  }

  /**
   * Render the kanban item
   * @returns {ReturnType<LitElement["render"]>}
   * @memberof Item
   * @description This method is used to render the kanban item
   * @returns void
   */
  render(): ReturnType<LitElement["render"]> {
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

  /**
   * Handle the blur event
   * @returns void
   * @private
   * @memberof Item
   * @description This method is used to handle the blur event
   */
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

  /**
   * Handle the delete event
   * @param e Event
   * @returns void
   * @private
   * @memberof Item
   * @description This method is used to handle the delete event
   */
  private _deleteHandler(e: Event) {
    this.dispatchEvent(
      new CustomEvent("kanban-item-delete", {
        bubbles: true,
        composed: true,
        detail: { id: this.id },
      })
    );
  }

  /**
   * Handle the drag start event
   * @param e DragEvent
   * @returns void
   * @private
   * @memberof Item
   * @description This method is used to handle the drag start event
   */
  private _dragStartHandler(e: DragEvent) {
    e.dataTransfer.setData("text/plain", this.id);
  }

  /**
   * Prevent the default drop behavior
   * @param e DragEvent
   * @returns void
   * @private
   * @memberof Item
   * @description This method is used to prevent the default drop behavior
   * @returns void
   */
  private _dropHandler(e: Event) {
    e.preventDefault();
  }
}
