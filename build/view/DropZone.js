var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";
let DropZone = class DropZone extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Handle the drag over event
         * @param {DragEvent} e
         * @returns {void}
         * @private
         * @memberof DropZone
         * @description This method is used to handle the drag over event
         */
        this._dragOverHandler = (e) => {
            e.preventDefault();
            this._dropzone.classList.add("kanban__dropzone--active");
        };
        /**
         * Handle the drag leave event
         * @param {DragEvent} _e (unused)
         * @returns {void}
         * @private
         * @memberof DropZone
         * @description This method is used to handle the drag leave event
         */
        this._dragLeaveHandler = (_e) => {
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
        this._dropHandler = (e) => {
            e.preventDefault();
            if (!e.dataTransfer) {
                return;
            }
            // Add dropping animation
            this._dropzone.classList.add('kanban__dropzone--dropping');
            this._dropzone.classList.remove('kanban__dropzone--active');
            // Get the item ID
            const itemId = e.dataTransfer.getData("text/plain");
            // Dispatch drop event
            this.dispatchEvent(new CustomEvent("kanban-item-drop", {
                bubbles: true,
                composed: true,
                detail: {
                    dropzone: this,
                    itemId: itemId,
                },
            }));
            // Remove dropping class after animation
            setTimeout(() => {
                var _a;
                (_a = this._dropzone) === null || _a === void 0 ? void 0 : _a.classList.remove('kanban__dropzone--dropping');
            }, 300);
        };
    }
    /**
     * Render the kanban dropzone
     * @returns {ReturnType<LitElement["render"]>}
     * @memberof DropZone
     */
    render() {
        return html `
      <div 
        part="dropzone-area"
        class="kanban__dropzone"
        role="button"
        aria-label="Drop zone for items"
        tabindex="-1"
      >
        <div part="dropzone-content" class="kanban__dropzone-content"></div>
      </div>
    `;
    }
    /**
     * Connect the kanban dropzone
     * @returns {void}
     * @memberof DropZone
     * @description This method is used to connect the kanban dropzone
     */
    connectedCallback() {
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
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("dragover", this._dragOverHandler);
        this.removeEventListener("dragleave", this._dragLeaveHandler);
        this.removeEventListener("drop", this._dropHandler);
    }
};
// Define the styles for the kanban dropzone
DropZone.styles = css `
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
__decorate([
    query(".kanban__dropzone")
], DropZone.prototype, "_dropzone", void 0);
DropZone = __decorate([
    customElement("kanban-dropzone")
], DropZone);
export default DropZone;
//# sourceMappingURL=DropZone.js.map