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
  @property({ 
    type: Array, 
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => {
        if (!value) return [];
        try {
          return JSON.parse(value);
        } catch {
          return [];
        }
      },
      toAttribute: (value: KanbanItem[]) => {
        return JSON.stringify(value);
      }
    }
  })
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

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    *:focus {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  `;

  // Define the template for the kanban column
  @query(".kanban__column-title")
  _input!: HTMLDivElement;

  // Track status messages for screen readers
  private _statusMessage: string = '';

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
    return html`
      <!-- Screen reader status announcements -->
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        class="sr-only"
      >
        ${this._statusMessage}
      </div>
      
      <div
        class="kanban__column-title"
        role="textbox"
        aria-label="Column title: ${this.title}"
        aria-describedby="column-desc-${this.id}"
        @blur="${this._blurHandler}"
        @keydown="${this._handleColumnKeydown}"
        contenteditable
        tabindex="0"
      ></div>
      <span id="column-desc-${this.id}" class="sr-only">
        Edit column title by typing. Press Enter to confirm.
      </span>
      
      <div 
        class="kanban__column-items"
        role="list"
        aria-label="Items in ${this.title} column"
      >
        <kanban-dropzone></kanban-dropzone>
        ${this.items.map(
          (item) =>
            html`<kanban-item
                id="${item.id}"
                content="${item.content}"
                .columnId="${this.id}"
                .columnTitle="${this.title}"
              ></kanban-item>
              <kanban-dropzone></kanban-dropzone>`
        )}
      </div>
      <button 
        class="kanban__add-item" 
        @click="${this._addItem}"
        @keydown="${this._handleAddButtonKeydown}"
        type="button"
        aria-label="Add new item to ${this.title} column"
        tabindex="0"
      >
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

    if (newTitle === this.title) {
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
   * Generate a unique ID for kanban items
   * Combines timestamp with random component to ensure uniqueness
   * @private
   * @returns {string} Unique ID in format: timestamp-randomString
   * @memberof Column
   * @description This method generates collision-resistant unique IDs
   */
  private _generateUniqueId(): string {
    const timestamp = Date.now();
    const randomComponent = Math.random().toString(36).substring(2, 11);
    return `${timestamp}-${randomComponent}`;
  }

  /**
   * Announce change to screen readers
   * @private
   * @param {string} message
   * @returns {void}
   */
  private _announceChange(message: string): void {
    this._statusMessage = message;
    this.requestUpdate();
    setTimeout(() => {
      this._statusMessage = '';
      this.requestUpdate();
    }, 1000);
  }

  /**
   * Handle keyboard events on column title
   * @private
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  private _handleColumnKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this._input.blur();
    }
  }

  /**
   * Handle keyboard events on add button
   * @private
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  private _handleAddButtonKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._addItem(e as any);
    }
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
      id: this._generateUniqueId(),
      content: "",
    };

    this.dispatchEvent(
      new CustomEvent("kanban-item-add", {
        bubbles: true,
        composed: true,
        detail: { columnId: this.id, item: newItem },
      })
    );
    
    this._announceChange(`New item added to ${this.title}`);
  }
}
