var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, query } from "lit/decorators.js";
import { LitElement, css, html } from "lit";
import "./Item";
import "./DropZone";
let Column = class Column extends LitElement {
    constructor() {
        super(...arguments);
        // Track status messages for screen readers
        this._statusMessage = '';
    }
    /**
     * Update the kanban column
     * @param changedProperties
     * @returns void
     */
    update(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has("title") &&
            this._input.innerText !== this.title) {
            this._input.innerText = this.title;
        }
    }
    /**
     * Render the kanban column
     * @returns {ReturnType<LitElement["render"]>}
     * @memberof Column
     * @description This method is used to render the kanban column
     */
    render() {
        return html `
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
        part="column-title"
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
        part="column-items"
        class="kanban__column-items"
        role="list"
        aria-label="Items in ${this.title} column"
      >
        <kanban-dropzone part="dropzone"></kanban-dropzone>
        ${this.items.map((item) => html `<kanban-item
                part="item"
                id="${item.id}"
                content="${item.content}"
                .columnId="${this.id}"
                .columnTitle="${this.title}"
              ></kanban-item>
              <kanban-dropzone part="dropzone"></kanban-dropzone>`)}
      </div>
      <button 
        part="column-add-button"
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
    _blurHandler() {
        const newTitle = this._input.innerText.trim();
        if (newTitle === this.title) {
            return;
        }
        this.dispatchEvent(new CustomEvent("kanban-column-update", {
            bubbles: true,
            composed: true,
            detail: { id: this.id, title: newTitle },
        }));
    }
    /**
     * Generate a unique ID for kanban items
     * Combines timestamp with random component to ensure uniqueness
     * @private
     * @returns {string} Unique ID in format: timestamp-randomString
     * @memberof Column
     * @description This method generates collision-resistant unique IDs
     */
    _generateUniqueId() {
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
    _announceChange(message) {
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
    _handleColumnKeydown(e) {
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
    _handleAddButtonKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._addItem(e);
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
    _addItem(_e) {
        const newItem = {
            id: this._generateUniqueId(),
            content: "",
        };
        this.dispatchEvent(new CustomEvent("kanban-item-add", {
            bubbles: true,
            composed: true,
            detail: { columnId: this.id, item: newItem },
        }));
        this._announceChange(`New item added to ${this.title}`);
    }
};
// Define the styles for the kanban column
Column.styles = css `
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
      outline: 1px solid currentColor;
      outline-offset: 0px;
      border-radius: 5px;
    }
  `;
__decorate([
    property()
], Column.prototype, "id", void 0);
__decorate([
    property()
], Column.prototype, "title", void 0);
__decorate([
    property({
        type: Array,
        reflect: true,
        converter: {
            fromAttribute: (value) => {
                if (!value)
                    return [];
                try {
                    return JSON.parse(value);
                }
                catch (_a) {
                    return [];
                }
            },
            toAttribute: (value) => {
                return JSON.stringify(value);
            }
        }
    })
], Column.prototype, "items", void 0);
__decorate([
    query(".kanban__column-title")
], Column.prototype, "_input", void 0);
Column = __decorate([
    customElement("kanban-column")
], Column);
export default Column;
//# sourceMappingURL=Column.js.map