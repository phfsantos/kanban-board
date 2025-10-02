# ISSUE-004: Memory Leak in Dialog Event Listeners

## Status
✅ **RESOLVED** - Fixed on October 1, 2025

## Severity
🟡 **MEDIUM** - Causes memory leaks with repeated use

## Description
Event listeners are added to the dialog every time an item is deleted, but never removed, causing memory leaks.

## Current Implementation
```typescript
private _itemDeleteHandler = (e: CustomEvent) => {
  this._dialog.showModal();

  // New listener added EVERY time
  this._dialog.addEventListener("click", (e) => { ... });
  
  // New listener added EVERY time  
  this._dialogConfirmButton.addEventListener("click", (event) => { ... });
  
  // New listener added EVERY time
  this._dialog.addEventListener("close", (_event) => { ... });
};
```

## Problems
1. **Multiple Listeners**: Each deletion adds 3 new event listeners
2. **Never Removed**: Listeners are never cleaned up
3. **Memory Leak**: Memory usage grows with each deletion attempt
4. **Duplicate Execution**: Multiple deletions may occur from stacked listeners
5. **Performance Degradation**: More listeners = slower event handling

## Impact
- Memory usage increases over time
- Application becomes slower
- Potential crashes in long-running sessions
- Unexpected behavior with multiple executions

## Test to Reproduce
1. Open/close delete dialog 100 times
2. Monitor memory usage (increases each time)
3. Click confirm - multiple delete events may fire

## Proposed Solution

### Option 1: Setup Listeners Once (Recommended)
```typescript
connectedCallback() {
  super.connectedCallback();
  this._setupDialogListeners();
}

private _setupDialogListeners() {
  this._dialog.addEventListener("click", this._handleDialogBackdropClick);
  this._dialogConfirmButton.addEventListener("click", this._handleDialogConfirm);
  this._dialog.addEventListener("close", this._handleDialogClose);
}

disconnectedCallback() {
  super.disconnectedCallback();
  this._dialog.removeEventListener("click", this._handleDialogBackdropClick);
  this._dialogConfirmButton.removeEventListener("click", this._handleDialogConfirm);
  this._dialog.removeEventListener("close", this._handleDialogClose);
}

private _handleDialogClose = (_event: Event) => {
  if (this._dialog.returnValue === "yes" && this._pendingDeleteId) {
    this.kanbanAPI.deleteItem(this._pendingDeleteId);
    this._pendingDeleteId = null;
  }
};
```

### Option 2: AbortController Pattern
```typescript
private _dialogController: AbortController | null = null;

private _itemDeleteHandler = (e: CustomEvent) => {
  // Abort previous listeners
  this._dialogController?.abort();
  this._dialogController = new AbortController();
  
  const signal = this._dialogController.signal;
  
  this._dialog.showModal();
  
  this._dialog.addEventListener("click", handler, { signal });
  this._dialogConfirmButton.addEventListener("click", handler, { signal });
  this._dialog.addEventListener("close", handler, { signal });
};
```

## Files Affected
- `src/index.ts`

## Solution Implemented
Implemented **Option 1** (Setup Listeners Once) as recommended:

1. Added `_pendingDeleteId` property to store the ID of the item being deleted
2. Created `_setupDialogListeners()` method that adds event listeners once in `connectedCallback()`
3. Created `_cleanupDialogListeners()` method that removes event listeners in `disconnectedCallback()`
4. Extracted dialog event handlers as named methods:
   - `_handleDialogBackdropClick` - Closes dialog when clicking outside
   - `_handleDialogConfirm` - Handles the confirm button click
   - `_handleDialogClose` - Performs the actual deletion when dialog closes with "yes"
5. Simplified `_itemDeleteHandler()` to just store the pending ID and show the dialog

**Benefits:**
- ✅ No memory leaks - listeners are added once and properly cleaned up
- ✅ Better performance - no listener creation/destruction on each deletion
- ✅ Cleaner code - separation of concerns with named handler methods
- ✅ Proper lifecycle management - uses Lit's lifecycle callbacks correctly

## Additional Notes
The same pattern should be reviewed in all components for similar issues.
