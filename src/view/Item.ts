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

  @query(".kanban__item")
  _itemElement: HTMLDivElement;

  // Track drag preview element for cleanup
  private _dragPreview: HTMLElement | null = null;

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
  private _createDragPreview(e: DragEvent): void {
    // Clone the item for preview
    this._dragPreview = this._itemElement.cloneNode(true) as HTMLElement;
    
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
      e.dataTransfer.setDragImage(this._dragPreview, 
        this._itemElement.offsetWidth / 2, 
        this._itemElement.offsetHeight / 2
      );
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
   * Handle the drag end event
   * @returns void
   * @private
   * @memberof Item
   * @description Cleans up dragging state after drag completes
   */
  private _dragEndHandler = (): void => {
    // Remove dragging class
    this._itemElement?.classList.remove('dragging');
    
    // Clean up preview if still exists
    if (this._dragPreview && this._dragPreview.parentNode) {
      this._dragPreview.parentNode.removeChild(this._dragPreview);
      this._dragPreview = null;
    }
  };

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
