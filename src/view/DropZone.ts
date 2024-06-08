import { CSSResultGroup, LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";

@customElement("kanban-dropzone")
export default class DropZone extends LitElement {
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
    }
  `;

  @query(".kanban__dropzone")
  _dropzone: HTMLDivElement;

  render() {
    return html`
      <div class="kanban__dropzone">
        <div class="kanban__dropzone-content"></div>
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("dragover", this._dragOverHandler);
    this.addEventListener("dragleave", this._dragLeaveHandler);
    this.addEventListener("drop", this._dropHandler);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("dragover", this._dragOverHandler);
    this.removeEventListener("dragleave", this._dragLeaveHandler);
    this.removeEventListener("drop", this._dropHandler);
  }

  private _dragOverHandler = (e: DragEvent) => {
    e.preventDefault();
    this._dropzone.classList.add("kanban__dropzone--active");
  };

  private _dragLeaveHandler = (e: DragEvent) => {
    this._dropzone.classList.remove("kanban__dropzone--active");
  };

  private _dropHandler = (e: DragEvent) => {
    e.preventDefault();
    this._dropzone.classList.remove("kanban__dropzone--active");

    this.dispatchEvent(
      new CustomEvent("kanban-item-drop", {
        bubbles: true,
        composed: true,
        detail: {
          dropzone: this,
          itemId: e.dataTransfer.getData("text/plain"),
        },
      })
    );
  };
}
