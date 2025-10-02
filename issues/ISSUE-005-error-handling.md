# ISSUE-005: Missing Error Handling

## Severity
🟡 **MEDIUM** - Poor user experience and debugging difficulties

## Description
The codebase throws errors but doesn't provide user-friendly feedback or proper error boundaries.

## Current Implementation
```typescript
// In kanban.ts
insertItem(columnId: string, item: KanbanItem) {
  const data = { ...this.host.data };
  const column = data.columns.find((column) => column.id == columnId);

  if (!column) {
    throw new Error("Column does not exist."); // No user feedback
  }
  // ...
}
```

## Problems Identified

### 1. Silent Throws
- Errors thrown without user notification
- No error logging mechanism
- Developer-focused error messages only

### 2. No Error Boundaries
- Uncaught errors crash the entire component
- No graceful degradation
- No recovery mechanism

### 3. Missing Validation
```typescript
// No validation before operations
updateItem(itemId: string, newProps: {...}) {
  // What if itemId is null/undefined?
  // What if newProps.content is an object instead of string?
}
```

### 4. No User Feedback
- User doesn't know why operation failed
- No toast/notification system
- Silent failures confuse users

## Impact
- Poor user experience
- Difficult debugging
- Production crashes
- Data loss without notification

## Proposed Solution

### 1. Add Error Event System
```typescript
// In index.ts
export type KanbanError = {
  type: 'validation' | 'operation' | 'system';
  message: string;
  details?: any;
};

// Emit errors as events
private _emitError(error: KanbanError) {
  this.dispatchEvent(
    new CustomEvent("kanban-error", {
      detail: error,
      bubbles: true,
      composed: true,
    })
  );
  console.error('[Kanban]', error);
}
```

### 2. Add Try-Catch Wrappers
```typescript
private _itemDropHandler = (e: CustomEvent) => {
  try {
    const dropzone = e.detail.dropzone;
    // ... existing code
    this.kanbanAPI.updateItem(itemId, {
      columnId,
      position: droppedIndex,
    });
  } catch (error) {
    this._emitError({
      type: 'operation',
      message: 'Failed to move item',
      details: error
    });
  }
};
```

### 3. Add Validation Helper
```typescript
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

class KanbanController {
  private _validateColumnId(columnId: string): void {
    if (!columnId || typeof columnId !== 'string') {
      throw new ValidationError('Invalid column ID');
    }
    const exists = this.host.data.columns.some(c => c.id === columnId);
    if (!exists) {
      throw new ValidationError(`Column ${columnId} does not exist`);
    }
  }
}
```

### 4. Add User-Friendly Messages
```typescript
const ERROR_MESSAGES = {
  COLUMN_NOT_FOUND: 'The column you are trying to update does not exist',
  ITEM_NOT_FOUND: 'The item you are trying to update does not exist',
  INVALID_DATA: 'The data provided is invalid',
  SAVE_FAILED: 'Failed to save your changes',
};
```

## Files Affected
- `src/controllers/kanban.ts`
- `src/index.ts`
- All view components

## Testing Scenarios
1. Try to drop item in deleted column
2. Try to update non-existent item
3. Provide invalid data format
4. Simulate save failures

## Priority
Implement at minimum:
1. Error event system
2. Try-catch in all handlers
3. User-friendly error messages
