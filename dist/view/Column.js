import{property as t,query as e,customElement as n}from"lit/decorators.js";import{css as i,LitElement as r,html as o}from"lit";var a=function(t,e,n,i){var r,o=arguments.length,a=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var d=t.length-1;d>=0;d--)(r=t[d])&&(a=(o<3?r(a):o>3?r(e,n,a):r(e,n))||a);return o>3&&a&&Object.defineProperty(e,n,a),a};let d=class extends r{update(t){super.update(t),t.has("title")&&this._input.innerText!==this.title&&(this._input.innerText=this.title)}render(){return o` <div
        class="kanban__column-title"
        @blur="${this._blurHandler}"
        contenteditable
      ></div>
      <div class="kanban__column-items">
        <kanban-dropzone></kanban-dropzone>
        ${this.items.map((t=>o`<kanban-item
                id="${t.id}"
                content="${t.content}"
              ></kanban-item>
              <kanban-dropzone></kanban-dropzone>`))}
      </div>
      <button class="kanban__add-item" @click="${this._addItem}" type="button">
        + Add
      </button>`}_blurHandler(){const t=this._input.innerText.trim();t!==this.title&&this.dispatchEvent(new CustomEvent("kanban-column-update",{bubbles:!0,composed:!0,detail:{id:this.id,title:t}}))}_generateUniqueId(){return`${Date.now()}-${Math.random().toString(36).substring(2,11)}`}_addItem(t){const e={id:this._generateUniqueId(),content:""};this.dispatchEvent(new CustomEvent("kanban-item-add",{bubbles:!0,composed:!0,detail:{columnId:this.id,item:e}}))}};d.styles=i`
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
  `,a([t()],d.prototype,"id",void 0),a([t()],d.prototype,"title",void 0),a([t({type:Array,reflect:!0,converter:{fromAttribute:t=>{if(!t)return[];try{return JSON.parse(t)}catch(t){return[]}},toAttribute:t=>JSON.stringify(t)}})],d.prototype,"items",void 0),a([e(".kanban__column-title")],d.prototype,"_input",void 0),d=a([n("kanban-column")],d);var s=d;export{s as default};
//# sourceMappingURL=Column.js.map
