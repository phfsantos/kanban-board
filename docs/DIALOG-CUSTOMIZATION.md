# Dialog Customization with CSS ::part()

## Overview

The kanban-board component now exposes the delete confirmation dialog's internal elements using CSS `::part()` selectors, allowing you to customize the dialog's appearance from outside the shadow DOM.

## Available Parts

| Part Name | Element | Description |
|-----------|---------|-------------|
| `dialog` | `<dialog>` | The main dialog element |
| `dialog-form` | `<form>` | The form container inside the dialog |
| `dialog-title` | `<h2>` | The dialog title ("Confirm Delete") |
| `dialog-description` | `<p>` | The description text |
| `dialog-buttons` | `<div>` | Container for the buttons |
| `dialog-cancel-button` | `<button>` | The cancel button |
| `dialog-confirm-button` | `<button>` | The confirm/delete button |

## Usage

### Basic Styling

```css
/* Style the dialog container */
kanban-board::part(dialog) {
  border: 2px solid #3b82f6;
  border-radius: 12px;
  background: white;
}

/* Style the confirm button */
kanban-board::part(dialog-confirm-button) {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
}
```

### Theme Integration

```css
/* Light theme */
kanban-board::part(dialog) {
  background: white;
  color: #1f2937;
  border: 1px solid #e5e7eb;
}

/* Dark theme */
.dark-mode kanban-board::part(dialog) {
  background: #1f2937;
  color: #f3f4f6;
  border: 1px solid #374151;
}
```

### Advanced Styling

```css
/* Gradient background with custom buttons */
kanban-board::part(dialog) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

kanban-board::part(dialog-title) {
  font-size: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

kanban-board::part(dialog-cancel-button) {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

kanban-board::part(dialog-cancel-button):hover {
  background: rgba(255, 255, 255, 0.3);
}

kanban-board::part(dialog-confirm-button) {
  background: #ef4444;
  border: none;
  color: white;
}

kanban-board::part(dialog-confirm-button):hover {
  background: #dc2626;
}
```

## Examples

### Material Design Style

```css
kanban-board::part(dialog) {
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 11px 15px -7px rgba(0,0,0,.2),
              0 24px 38px 3px rgba(0,0,0,.14),
              0 9px 46px 8px rgba(0,0,0,.12);
}

kanban-board::part(dialog-title) {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 16px;
}

kanban-board::part(dialog-buttons) {
  margin-top: 24px;
  justify-content: flex-end;
  gap: 8px;
}

kanban-board::part(dialog-cancel-button),
kanban-board::part(dialog-confirm-button) {
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 8px 16px;
  border-radius: 4px;
}
```

### Minimal Style

```css
kanban-board::part(dialog) {
  border: none;
  border-radius: 8px;
  background: #f9fafb;
  padding: 2rem;
}

kanban-board::part(dialog-title) {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

kanban-board::part(dialog-description) {
  color: #6b7280;
  font-size: 0.875rem;
}

kanban-board::part(dialog-buttons) {
  gap: 0.5rem;
}

kanban-board::part(dialog-cancel-button),
kanban-board::part(dialog-confirm-button) {
  border: 1px solid #d1d5db;
  background: white;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 6px;
}

kanban-board::part(dialog-confirm-button) {
  background: #111827;
  color: white;
  border-color: #111827;
}
```

## Browser Support

The `::part()` pseudo-element is supported in:
- Chrome/Edge 73+
- Firefox 72+
- Safari 13.1+
- Opera 60+

## Why Use ::part()?

1. **Encapsulation**: The dialog remains in the shadow DOM, maintaining component encapsulation
2. **Flexibility**: External stylesheets can customize the dialog without modifying the component
3. **Theme Integration**: Easy to integrate with design systems and theme switchers
4. **Maintainability**: Component internals can change without breaking external styles (as long as part names remain the same)

## Demo

See the `custom-dialog-styling.html` example in the examples folder for a live demonstration.

## Migration from Previous Versions

If you were previously unable to style the dialog, you can now use the `::part()` selectors instead of trying to pierce the shadow DOM with deprecated methods.

**Before (not recommended):**
```css
/* This won't work with shadow DOM */
dialog {
  background: red;
}
```

**After (recommended):**
```css
/* This works with shadow DOM */
kanban-board::part(dialog) {
  background: red;
}
```
