# ISSUE-007: Accessibility Issues

## Severity
🟡 **MEDIUM** - Legal compliance and user experience

## Description
The component has multiple accessibility issues that prevent use by people with disabilities.

## Current Issues

### 1. Missing ARIA Labels
```typescript
// Column title has no label
<div class="kanban__column-title" contenteditable></div>

// Items have no accessible names
<kanban-item id="${item.id}" content="${item.content}"></kanban-item>

// Buttons lack descriptive labels
<button class="kanban__add-item">+ Add</button>
```

### 2. Keyboard Navigation Issues
- No keyboard shortcuts
- Tab order not logical
- No focus indicators
- Drag & drop not keyboard accessible
- Delete button requires mouse

### 3. Screen Reader Problems
- Content editable areas not announced
- Drop zones not described
- State changes not announced
- No live regions for updates

### 4. Color Contrast
```css
background: rgba(0, 0, 0, 0.1); // Low contrast
color: rgba(0, 0, 0, 0.5); // Fails WCAG AA
```

### 5. Focus Management
- No focus trap in dialog
- Lost focus after operations
- No focus indicators
- Content editable focus unclear

## Impact
- Violates WCAG 2.1 guidelines
- Legal compliance issues
- Excludes users with disabilities
- Poor user experience for keyboard users

## Proposed Solutions

### 1. Add ARIA Labels
```typescript
render() {
  return html`
    <div 
      class="kanban__column-title"
      role="textbox"
      aria-label="Column title: ${this.title}"
      aria-describedby="column-desc-${this.id}"
      contenteditable
    ></div>
    <span id="column-desc-${this.id}" class="sr-only">
      Edit column title by typing
    </span>
  `;
}
```

### 2. Add Keyboard Navigation
```typescript
// Add keyboard handler
private _handleKeydown = (e: KeyboardEvent) => {
  switch(e.key) {
    case 'Enter':
      if (e.ctrlKey) this._addItem(null);
      break;
    case 'Delete':
      if (e.shiftKey) this._deleteItem();
      break;
    case 'ArrowDown':
      this._focusNextItem();
      break;
    // ... etc
  }
};
```

### 3. Add Screen Reader Support
```typescript
// Live region for announcements
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
  class="sr-only"
>
  ${this._statusMessage}
</div>

// Announce changes
private _announceChange(message: string) {
  this._statusMessage = message;
  this.requestUpdate();
  setTimeout(() => {
    this._statusMessage = '';
    this.requestUpdate();
  }, 1000);
}
```

### 4. Fix Color Contrast
```css
.kanban__item-delete {
  color: #c00; /* Better contrast */
  background: rgba(255, 255, 255, 0.9);
}

.kanban__add-item {
  background: rgba(0, 0, 0, 0.15); /* Better contrast */
  color: #000;
}

/* Focus indicators */
*:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

### 5. Improve Dialog Accessibility
```typescript
<dialog 
  role="alertdialog"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
  aria-modal="true"
>
  <h2 id="dialog-title">Confirm Delete</h2>
  <p id="dialog-desc">
    Are you sure you want to delete this item? This action cannot be undone.
  </p>
  <button 
    value="cancel" 
    formmethod="dialog"
    aria-label="Cancel deletion"
  >
    Cancel
  </button>
  <button 
    value="yes"
    aria-label="Confirm deletion"
  >
    Confirm
  </button>
</dialog>
```

### 6. Alternative to Drag & Drop
```typescript
// Add move buttons for keyboard users
<div class="item-actions">
  <button 
    @click="${() => this._moveUp()}"
    aria-label="Move item up"
  >↑</button>
  <button 
    @click="${() => this._moveDown()}"
    aria-label="Move item down"
  >↓</button>
  <button 
    @click="${() => this._moveLeft()}"
    aria-label="Move to previous column"
  >←</button>
  <button 
    @click="${() => this._moveRight()}"
    aria-label="Move to next column"
  >→</button>
</div>
```

## Testing Requirements
1. Test with screen readers (NVDA, JAWS, VoiceOver)
2. Test keyboard-only navigation
3. Test with browser zoom (200%, 400%)
4. Check color contrast ratios
5. Validate with axe DevTools
6. Test with keyboard shortcuts

## Standards to Meet
- WCAG 2.1 Level AA minimum
- ARIA Authoring Practices Guide
- Section 508 compliance

## Files Affected
- All view components
- `src/index.ts`
- Add new CSS for accessibility

## Resources
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)
- [Inclusive Components](https://inclusive-components.design/)
