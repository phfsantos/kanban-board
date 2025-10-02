# FEATURE-001: Undo/Redo Functionality

## Priority
🟢 **HIGH** - Greatly improves user experience

## Description
Add undo/redo functionality to allow users to revert accidental changes.

## User Stories
- As a user, I want to undo my last action so I can fix mistakes
- As a user, I want to redo actions I've undone
- As a user, I want keyboard shortcuts (Ctrl+Z, Ctrl+Y) for undo/redo
- As a user, I want to see what action will be undone/redone

## Requirements

### Functional Requirements
1. Track all user actions (create, update, delete, move)
2. Implement undo stack with configurable max size
3. Implement redo stack
4. Keyboard shortcuts support
5. Clear redo stack on new action
6. Persist history across sessions (optional)

### Non-Functional Requirements
- Max history: 50 actions (configurable)
- Performance: O(1) undo/redo operations
- Memory: Limit history size to prevent memory issues
- Compatibility: Works with all existing operations

## Technical Design

### 1. History Manager
```typescript
// src/controllers/history.ts
export type ActionType = 
  | 'item-create'
  | 'item-update' 
  | 'item-delete'
  | 'item-move'
  | 'column-update';

export interface Action {
  type: ActionType;
  timestamp: number;
  data: {
    before: any;
    after: any;
  };
  itemId?: string;
  columnId?: string;
}

export class HistoryController {
  private undoStack: Action[] = [];
  private redoStack: Action[] = [];
  private maxSize = 50;
  
  pushAction(action: Action): void {
    this.undoStack.push(action);
    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }
    this.redoStack = []; // Clear redo on new action
    this._notifyChange();
  }
  
  canUndo(): boolean {
    return this.undoStack.length > 0;
  }
  
  canRedo(): boolean {
    return this.redoStack.length > 0;
  }
  
  undo(): Action | null {
    const action = this.undoStack.pop();
    if (action) {
      this.redoStack.push(action);
      this._notifyChange();
    }
    return action;
  }
  
  redo(): Action | null {
    const action = this.redoStack.pop();
    if (action) {
      this.undoStack.push(action);
      this._notifyChange();
    }
    return action;
  }
  
  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
    this._notifyChange();
  }
  
  getUndoDescription(): string | null {
    const action = this.undoStack[this.undoStack.length - 1];
    return action ? this._describeAction(action) : null;
  }
  
  getRedoDescription(): string | null {
    const action = this.redoStack[this.redoStack.length - 1];
    return action ? this._describeAction(action) : null;
  }
  
  private _describeAction(action: Action): string {
    const descriptions = {
      'item-create': 'Create item',
      'item-update': 'Update item',
      'item-delete': 'Delete item',
      'item-move': 'Move item',
      'column-update': 'Update column',
    };
    return descriptions[action.type];
  }
  
  private _notifyChange(): void {
    // Dispatch event for UI updates
  }
}
```

### 2. Integrate with KanbanController
```typescript
// src/controllers/kanban.ts
export class KanbanController {
  private history = new HistoryController();
  
  insertItem(columnId: string, item: KanbanItem) {
    const data = { ...this.host.data };
    const column = data.columns.find((column) => column.id === columnId);
    
    if (!column) {
      throw new Error("Column does not exist.");
    }
    
    column.items.push(item);
    
    // Record action
    this.history.pushAction({
      type: 'item-create',
      timestamp: Date.now(),
      data: {
        before: null,
        after: item
      },
      itemId: item.id,
      columnId
    });
    
    this._saveData(data);
    return item;
  }
  
  undo(): void {
    const action = this.history.undo();
    if (!action) return;
    
    this._applyAction(action, 'undo');
  }
  
  redo(): void {
    const action = this.history.redo();
    if (!action) return;
    
    this._applyAction(action, 'redo');
  }
  
  private _applyAction(action: Action, direction: 'undo' | 'redo'): void {
    const data = direction === 'undo' ? action.data.before : action.data.after;
    
    switch (action.type) {
      case 'item-create':
        if (direction === 'undo') {
          this._deleteItemDirect(action.itemId!);
        } else {
          this._insertItemDirect(action.columnId!, data);
        }
        break;
      case 'item-delete':
        if (direction === 'undo') {
          this._insertItemDirect(action.columnId!, data);
        } else {
          this._deleteItemDirect(action.itemId!);
        }
        break;
      // ... handle other action types
    }
  }
}
```

### 3. Add UI Controls
```typescript
// In index.ts template
<div class="kanban-toolbar">
  <button 
    @click="${this._undo}"
    ?disabled="${!this.kanbanAPI.canUndo()}"
    title="${this.kanbanAPI.getUndoDescription()}"
  >
    ↶ Undo
  </button>
  <button 
    @click="${this._redo}"
    ?disabled="${!this.kanbanAPI.canRedo()}"
    title="${this.kanbanAPI.getRedoDescription()}"
  >
    ↷ Redo
  </button>
</div>
```

### 4. Add Keyboard Shortcuts
```typescript
// In index.ts
connectedCallback() {
  super.connectedCallback();
  document.addEventListener('keydown', this._handleKeyboard);
}

disconnectedCallback() {
  super.disconnectedCallback();
  document.removeEventListener('keydown', this._handleKeyboard);
}

private _handleKeyboard = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
    e.preventDefault();
    if (e.shiftKey) {
      this._redo();
    } else {
      this._undo();
    }
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
    e.preventDefault();
    this._redo();
  }
};
```

## Implementation Plan

### Phase 1: Core History (Week 1)
- [ ] Create HistoryController class
- [ ] Define Action types and interfaces
- [ ] Implement undo/redo stack logic
- [ ] Add unit tests

### Phase 2: Integration (Week 2)
- [ ] Integrate with KanbanController
- [ ] Track all action types
- [ ] Implement _applyAction logic
- [ ] Test all action types

### Phase 3: UI (Week 3)
- [ ] Add undo/redo buttons
- [ ] Add keyboard shortcuts
- [ ] Add tooltips with action descriptions
- [ ] Add visual feedback

### Phase 4: Polish (Week 4)
- [ ] Add persistence (localStorage)
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Documentation

## Testing Strategy
1. Unit tests for HistoryController
2. Integration tests for each action type
3. E2E tests for keyboard shortcuts
4. Test edge cases (max history, empty stacks)
5. Performance tests with large histories

## API Changes
```typescript
// New public methods
interface KanbanBoard {
  undo(): void;
  redo(): void;
  canUndo(): boolean;
  canRedo(): boolean;
  clearHistory(): void;
}

// New events
interface KanbanEvents {
  'kanban-history-change': {
    canUndo: boolean;
    canRedo: boolean;
    undoDescription: string | null;
    redoDescription: string | null;
  }
}
```

## Configuration Options
```typescript
interface KanbanBoardConfig {
  history?: {
    enabled: boolean;
    maxSize: number;
    persist: boolean;
    storageKey: string;
  }
}
```

## Documentation Needs
- API documentation for history methods
- User guide for undo/redo
- Migration guide if breaking changes
- Examples in README

## Risks & Mitigation
- **Risk**: Large history consumes memory
  - **Mitigation**: Configurable max size, data compression
- **Risk**: Complex state restoration
  - **Mitigation**: Thorough testing, snapshot whole state
- **Risk**: Performance impact
  - **Mitigation**: Debounce actions, optimize data structures

## Success Criteria
- [ ] All CRUD operations can be undone/redone
- [ ] Keyboard shortcuts work
- [ ] UI shows current undo/redo state
- [ ] Performance: <10ms for undo/redo
- [ ] Memory: <1MB for 50 actions
- [ ] Test coverage: >90%
