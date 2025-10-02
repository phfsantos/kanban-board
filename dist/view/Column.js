import{property as t,query as e,customElement as n}from"lit/decorators.js";import{css as i,LitElement as o,html as a}from"lit";var r=function(t,e,n,i){var o,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(r=(a<3?o(r):a>3?o(e,n,r):o(e,n))||r);return a>3&&r&&Object.defineProperty(e,n,r),r};let s=class extends o{constructor(){super(...arguments),this._statusMessage=""}update(t){super.update(t),t.has("title")&&this._input.innerText!==this.title&&(this._input.innerText=this.title)}render(){return a`
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
        ${this.items.map((t=>a`<kanban-item
                id="${t.id}"
                content="${t.content}"
                .columnId="${this.id}"
                .columnTitle="${this.title}"
              ></kanban-item>
              <kanban-dropzone></kanban-dropzone>`))}
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
      </button>`}_blurHandler(){const t=this._input.innerText.trim();t!==this.title&&this.dispatchEvent(new CustomEvent("kanban-column-update",{bubbles:!0,composed:!0,detail:{id:this.id,title:t}}))}_generateUniqueId(){return`${Date.now()}-${Math.random().toString(36).substring(2,11)}`}_announceChange(t){this._statusMessage=t,this.requestUpdate(),setTimeout((()=>{this._statusMessage="",this.requestUpdate()}),1e3)}_handleColumnKeydown(t){"Enter"!==t.key||t.shiftKey||(t.preventDefault(),this._input.blur())}_handleAddButtonKeydown(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._addItem(t))}_addItem(t){const e={id:this._generateUniqueId(),content:""};this.dispatchEvent(new CustomEvent("kanban-item-add",{bubbles:!0,composed:!0,detail:{columnId:this.id,item:e}})),this._announceChange(`New item added to ${this.title}`)}};s.styles=i`
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
  `,r([t()],s.prototype,"id",void 0),r([t()],s.prototype,"title",void 0),r([t({type:Array,reflect:!0,converter:{fromAttribute:t=>{if(!t)return[];try{return JSON.parse(t)}catch(t){return[]}},toAttribute:t=>JSON.stringify(t)}})],s.prototype,"items",void 0),r([e(".kanban__column-title")],s.prototype,"_input",void 0),s=r([n("kanban-column")],s);var d=s;export{d as default};
//# sourceMappingURL=Column.js.map
