import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("kanban-item")
export default class Item extends LitElement {
  // Define the properties for the kanban item
  @property()
  id: string;
  @property()
  content: string;
  @property()
  columnId: string = '';
  @property()
  columnTitle: string = '';

  // Define the queries for the kanban item
  @query(".kanban__item-input")
  _input!: HTMLDivElement;

  @query(".kanban__item")
  _itemElement!: HTMLDivElement;

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
      font-size: 14px;
      color: darkred;
      user-select: none;
      border-radius: 3px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 2px 2px;
      background: rgba(255, 0, 0, 0.05);
      transition: background 0.2s, transform 0.1s;
      height: 25px;
      width: 25px;
    }

    .kanban__item-delete:hover,
    .kanban__item-delete:focus {
      background: rgba(255, 0, 0, 0.1);
      transform: scale(1.05);
    }

    .kanban__item-delete:active {
      transform: scale(0.95);
    }

    .item-actions {
      display: none;
      gap: 3px;
      align-items: center;
      justify-content: flex-end;
      margin-right: 4px;
      margin-top: 4px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .kanban__item:hover .item-actions,
    .kanban__item:focus-within .item-actions {
      opacity: 1;
      display: flex;
    }

    .item-action-button {
      background: rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      padding: 2px 6px;
      cursor: pointer;
      font-size: 14px;
      line-height: 1;
      transition: background 0.2s, transform 0.1s;
      height: 25px;
      width: 25px;
    }

    .item-action-button:hover,
    .item-action-button:focus {
      background: rgba(0, 0, 0, 0.1);
      transform: scale(1.05);
    }

    .item-action-button:active {
      transform: scale(0.95);
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
      role="listitem"
      aria-label="Kanban item: ${this.content || 'Empty item'}"
      @dragstart="${this._dragStartHandler}"
      @keydown="${this._handleItemKeydown}"
      draggable="true"
      tabindex="0"
    >
      
      <div
        class="kanban__item-input"
        role="textbox"
        aria-label="Item content: ${this.content || 'Empty'}"
        aria-describedby="item-desc-${this.id}"
        @drop="${this._dropHandler}"
        @blur="${this._blurHandler}"
        @keydown="${this._handleInputKeydown}"
        contenteditable
        tabindex="0"
      ></div>
      
      <!-- Keyboard navigation controls -->
      <div class="item-actions" role="group" aria-label="Item actions">
        <button 
          class="item-action-button"
          @click="${this._moveUp}"
          @keydown="${this._handleButtonKeydown}"
          aria-label="Move item up"
          title="Move up (or Shift+↑)"
          type="button"
        >↑</button>
        <button 
          class="item-action-button"
          @click="${this._moveDown}"
          @keydown="${this._handleButtonKeydown}"
          aria-label="Move item down"
          title="Move down (or Shift+↓)"
          type="button"
        >↓</button>
        <button 
          class="item-action-button"
          @click="${this._moveLeft}"
          @keydown="${this._handleButtonKeydown}"
          aria-label="Move to previous column"
          title="Move left (or Shift+←)"
          type="button"
        >←</button>
        <button 
          class="item-action-button"
          @click="${this._moveRight}"
          @keydown="${this._handleButtonKeydown}"
          aria-label="Move to next column"
          title="Move right (or Shift+→)"
          type="button"
        >→</button>
        <button 
          class="kanban__item-delete" 
          @click="${this._deleteHandler}"
          @keydown="${this._handleDeleteKeydown}"
          aria-label="Delete item: ${this.content || 'this item'}"
          title="Delete item (or Shift+Delete)"
          type="button"
        >🗑️</button>
      </div>
      <span id="item-desc-${this.id}" class="sr-only">
        Edit item content. Press Escape to finish editing.
      </span>
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
   * @param _e Event (unused)
   * @returns void
   * @private
   * @memberof Item
   * @description This method is used to handle the delete event
   */
  private _deleteHandler(_e: Event) {
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

  /**
   * Handle keyboard events on input
   * @private
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  private _handleItemKeydown(e: KeyboardEvent): void {
    // Arrow keys with Shift for movement
    if (e.shiftKey) {
      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault();
          this._moveUp(e);
          break;
        case 'ArrowDown':
          e.preventDefault();
          this._moveDown(e);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this._moveLeft(e);
          break;
        case 'ArrowRight':
          e.preventDefault();
          this._moveRight(e);
          break;
        case 'Delete':
          e.preventDefault();
          this._deleteHandler(e);
          break;
      }
    }
  }

  /**
   * Handle keyboard events on input
   * @private
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  private _handleInputKeydown(e: KeyboardEvent): void {
    // Escape to finish editing
    if (e.key === 'Escape') {
      e.preventDefault();
      this._input.blur();
      this._itemElement.focus();
    }
  }

  /**
   * Handle keyboard events on delete button
   * @private
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  private _handleDeleteKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._deleteHandler(e);
    }
  }

  /**
   * Handle keyboard events on action buttons
   * @private
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  private _handleButtonKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      (e.target as HTMLButtonElement).click();
    }
  }

  /**
   * Move item up within current column
   * @private
   * @param {Event} e
   * @returns {void}
   */
  private _moveUp(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('kanban-item-move', {
        bubbles: true,
        composed: true,
        detail: { id: this.id, direction: 'up' }
      })
    );
  }

  /**
   * Move item down within current column
   * @private
   * @param {Event} e
   * @returns {void}
   */
  private _moveDown(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('kanban-item-move', {
        bubbles: true,
        composed: true,
        detail: { id: this.id, direction: 'down' }
      })
    );
  }

  /**
   * Move item to previous column
   * @private
   * @param {Event} e
   * @returns {void}
   */
  private _moveLeft(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('kanban-item-move', {
        bubbles: true,
        composed: true,
        detail: { id: this.id, direction: 'left' }
      })
    );
  }

  /**
   * Move item to next column
   * @private
   * @param {Event} e
   * @returns {void}
   */
  private _moveRight(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('kanban-item-move', {
        bubbles: true,
        composed: true,
        detail: { id: this.id, direction: 'right' }
      })
    );
  }

  /**
   * Announce the item's position to screen readers
   * @public
   * @returns {void}
   */
  public _announcePosition(): void {
    // Create a live region announcement for screen readers
    const announcement = `Item "${this.content}" is now in ${this.columnTitle} column`;
    
    // Find or create live region
    let liveRegion = this.shadowRoot?.querySelector('[aria-live="polite"]') as HTMLElement;
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      this.shadowRoot?.appendChild(liveRegion);
    }
    
    // Update the announcement
    liveRegion.textContent = announcement;
    
    // Clear after announcement is read
    setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = '';
      }
    }, 1000);
  }
}
