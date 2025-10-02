var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
let Item = class Item extends LitElement {
    /**
     * Constructor
     * @description This method is used to create an instance of the Item class
     * @returns void
     * @memberof Item
     * @description This method is used to create an instance of the Item class
     */
    constructor() {
        super();
        // Track drag preview element for cleanup
        this._dragPreview = null;
        /**
         * Handle the drag end event
         * @returns void
         * @private
         * @memberof Item
         * @description Cleans up dragging state after drag completes
         */
        this._dragEndHandler = () => {
            var _a;
            // Remove dragging class
            (_a = this._itemElement) === null || _a === void 0 ? void 0 : _a.classList.remove('dragging');
            // Clean up preview if still exists
            if (this._dragPreview && this._dragPreview.parentNode) {
                this._dragPreview.parentNode.removeChild(this._dragPreview);
                this._dragPreview = null;
            }
        };
    }
    /**
     * Update the kanban item
     * @param changedProperties
     * @returns void
     */
    update(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has("content") &&
            this._input.innerText !== this.content) {
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
    render() {
        return html `<div
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
    _blurHandler() {
        const newContent = this._input.innerText.trim();
        if (newContent == this.content) {
            return;
        }
        this.dispatchEvent(new CustomEvent("kanban-item-update", {
            bubbles: true,
            composed: true,
            detail: { id: this.id, content: newContent },
        }));
    }
    /**
     * Handle the delete event
     * @param _e Event (unused)
     * @returns void
     * @private
     * @memberof Item
     * @description This method is used to handle the delete event
     */
    _deleteHandler(_e) {
        this.dispatchEvent(new CustomEvent("kanban-item-delete", {
            bubbles: true,
            composed: true,
            detail: { id: this.id },
        }));
    }
    /**
     * Handle the drag start event
     * @param e DragEvent
     * @returns void
     * @private
     * @memberof Item
     * @description This method is used to handle the drag start event
     */
    _dragStartHandler(e) {
        if (!e.dataTransfer) {
            return;
        }
        e.dataTransfer.setData("text/plain", this.id);
        // Set allowed effects
        e.dataTransfer.effectAllowed = 'move';
        // Create custom drag preview
        this._createDragPreview(e);
        // Add dragging class for visual feedback
        this._itemElement.classList.add('dragging');
        // Listen for drag end to clean up
        this.addEventListener('dragend', this._dragEndHandler, { once: true });
    }
    /**
     * Create a custom drag preview with enhanced styling
     * @param e DragEvent
     * @returns void
     * @private
     * @memberof Item
     * @description Creates a styled clone of the item for drag preview
     */
    _createDragPreview(e) {
        // Clone the item for preview
        this._dragPreview = this._itemElement.cloneNode(true);
        // Style the preview
        this._dragPreview.style.position = 'absolute';
        this._dragPreview.style.top = '-1000px';
        this._dragPreview.style.opacity = '0.8';
        this._dragPreview.style.transform = 'rotate(2deg)';
        this._dragPreview.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
        this._dragPreview.style.width = `${this._itemElement.offsetWidth}px`;
        this._dragPreview.style.pointerEvents = 'none';
        // Append to body temporarily
        document.body.appendChild(this._dragPreview);
        // Set as drag image
        if (e.dataTransfer) {
            e.dataTransfer.setDragImage(this._dragPreview, this._itemElement.offsetWidth / 2, this._itemElement.offsetHeight / 2);
        }
        // Clean up preview after a short delay
        setTimeout(() => {
            if (this._dragPreview && this._dragPreview.parentNode) {
                this._dragPreview.parentNode.removeChild(this._dragPreview);
                this._dragPreview = null;
            }
        }, 0);
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
    _dropHandler(e) {
        e.preventDefault();
    }
};
// Define the styles for the kanban item
Item.styles = css `
    :host {
      position: relative;
    }

    :host * {
      font-family: inherit;
    }

    .kanban__item {
      transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
    }

    .kanban__item.dragging {
      opacity: 0.4;
      transform: scale(0.95);
    }

    .kanban__item.dropping {
      animation: drop-bounce 0.5s ease;
    }

    @keyframes drop-bounce {
      0% {
        transform: scale(1.05);
        opacity: 0.8;
      }
      50% {
        transform: scale(0.98);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
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
__decorate([
    property()
], Item.prototype, "id", void 0);
__decorate([
    property()
], Item.prototype, "content", void 0);
__decorate([
    query(".kanban__item-input")
], Item.prototype, "_input", void 0);
__decorate([
    query(".kanban__item")
], Item.prototype, "_itemElement", void 0);
Item = __decorate([
    customElement("kanban-item")
], Item);
export default Item;
//# sourceMappingURL=Item.js.map