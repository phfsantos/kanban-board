import { CSSResultGroup, LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";

@customElement("kanban-dropzone")
export default class DropZone extends LitElement {
  // Define the styles for the kanban dropzone
  static styles?: CSSResultGroup = css`
    .kanban__dropzone {
      height: 10px;
      transition: background 0.15s, height 0.15s;
    }

    .kanban__dropzone--active {
      padding: 10px 0;
      height: 38px;
    }

    .kanban__dropzone--active .kanban__dropzone-content {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.25);
      border-radius: 5px;
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        background: rgba(0, 0, 0, 0.25);
        transform: scale(1);
      }
      50% {
        background: rgba(66, 153, 225, 0.4);
        transform: scale(1.02);
      }
    }

    .kanban__dropzone--dropping .kanban__dropzone-content {
      animation: drop-flash 0.3s ease;
    }

    @keyframes drop-flash {
      0% {
        background: rgba(66, 153, 225, 0.6);
        transform: scale(1.05);
      }
      100% {
        background: rgba(66, 153, 225, 0.2);
        transform: scale(1);
      }
    }
  `;

  // Define the queries for the kanban dropzone
  @query(".kanban__dropzone")
  _dropzone: HTMLDivElement;

  /**
   * Render the kanban dropzone
   * @returns {ReturnType<LitElement["render"]>}
   * @memberof DropZone
   */
  render():ReturnType<LitElement["render"]> {
    return html`
      <div class="kanban__dropzone">
        <div class="kanban__dropzone-content"></div>
      </div>
    `;
  }

  /**
   * Connect the kanban dropzone
   * @returns {void}
   * @memberof DropZone
   * @description This method is used to connect the kanban dropzone
   */
  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("dragover", this._dragOverHandler);
    this.addEventListener("dragleave", this._dragLeaveHandler);
    this.addEventListener("drop", this._dropHandler);
  }

  /**
   * Disconnect the kanban dropzone
   * @returns {void}
   * @memberof DropZone
   * @description This method is used to disconnect the kanban dropzone
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("dragover", this._dragOverHandler);
    this.removeEventListener("dragleave", this._dragLeaveHandler);
    this.removeEventListener("drop", this._dropHandler);
  }

  /**
   * Handle the drag over event
   * @param {DragEvent} e
   * @returns {void}
   * @private
   * @memberof DropZone
   * @description This method is used to handle the drag over event
   */
  private _dragOverHandler = (e: DragEvent): void => {
    e.preventDefault();
    this._dropzone.classList.add("kanban__dropzone--active");
  };

  /**
   * Handle the drag leave event
   * @param {DragEvent} e
   * @returns {void}
   * @private
   * @memberof DropZone
   * @description This method is used to handle the drag leave event
   */
  private _dragLeaveHandler = (e: DragEvent): void => {
    this._dropzone.classList.remove("kanban__dropzone--active");
  };

  /**
   * Handle the drop event
   * @param {DragEvent} e
   * @returns {void}
   * @private
   * @memberof DropZone
   * @description This method is used to handle the drop event
   */
  private _dropHandler = (e: DragEvent): void => {
    e.preventDefault();
    
    // Add dropping animation
    this._dropzone.classList.add('kanban__dropzone--dropping');
    this._dropzone.classList.remove('kanban__dropzone--active');
    
    // Get the item ID
    const itemId = e.dataTransfer.getData("text/plain");

    // Dispatch drop event
    this.dispatchEvent(
      new CustomEvent("kanban-item-drop", {
        bubbles: true,
        composed: true,
        detail: {
          dropzone: this,
          itemId: itemId,
        },
      })
    );
    
    // Remove dropping class after animation
    setTimeout(() => {
      this._dropzone?.classList.remove('kanban__dropzone--dropping');
    }, 300);
  };
}
