# CSS ::part() Selectors Reference

Complete reference for customizing the kanban-board component using CSS `::part()` selectors.

## Overview

The kanban-board component exposes 24 named parts that allow you to customize every aspect of the board's appearance from outside the shadow DOM.

## Browser Support

- Chrome/Edge: 73+
- Firefox: 72+
- Safari: 13.1+
- Opera: 60+

## All Available Parts

### Main Container

| Part Name | Element | Description |
|-----------|---------|-------------|
| `kanban-container` | `<div>` | The main kanban board container |

### Columns

| Part Name | Element | Description |
|-----------|---------|-------------|
| `column` | `<kanban-column>` | Individual column component |
| `column-title` | `<div>` | Column title (editable) |
| `column-items` | `<div>` | Container for items in a column |
| `column-add-button` | `<button>` | "Add" button at bottom of column |

### Items

| Part Name | Element | Description |
|-----------|---------|-------------|
| `item` | `<kanban-item>` | Individual item component |
| `item-container` | `<div>` | Outer container for an item |
| `item-content` | `<div>` | Item content area (editable) |
| `item-actions` | `<div>` | Container for item action buttons |

### Item Actions

| Part Name | Element | Description |
|-----------|---------|-------------|
| `item-action-up` | `<button>` | Move item up button (↑) |
| `item-action-down` | `<button>` | Move item down button (↓) |
| `item-action-left` | `<button>` | Move item left button (←) |
| `item-action-right` | `<button>` | Move item right button (→) |
| `item-action-delete` | `<button>` | Delete item button (❌) |

### Drop Zones

| Part Name | Element | Description |
|-----------|---------|-------------|
| `dropzone` | `<kanban-dropzone>` | Drop zone component |
| `dropzone-area` | `<div>` | Outer drop zone area |
| `dropzone-content` | `<div>` | Inner drop zone visual indicator |

### Dialog

| Part Name | Element | Description |
|-----------|---------|-------------|
| `dialog` | `<dialog>` | Delete confirmation dialog |
| `dialog-form` | `<form>` | Form wrapper inside dialog |
| `dialog-title` | `<h2>` | Dialog title ("Confirm Delete") |
| `dialog-description` | `<p>` | Dialog description text |
| `dialog-buttons` | `<div>` | Container for dialog buttons |
| `dialog-cancel-button` | `<button>` | Cancel button |
| `dialog-confirm-button` | `<button>` | Confirm/delete button |

## Usage Examples

### Basic Styling

```css
/* Style the main container */
kanban-board::part(kanban-container) {
  background: #f5f5f5;
  padding: 40px;
  border-radius: 8px;
}

/* Style all columns */
kanban-board::part(column) {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 16px;
}

/* Style column titles */
kanban-board::part(column-title) {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
}

/* Style items */
kanban-board::part(item-container) {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

kanban-board::part(item-container):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
```

### Theme Example: Dark Mode

```css
/* Dark theme */
kanban-board::part(kanban-container) {
  background: #1a1a1a;
}

kanban-board::part(column) {
  background: #2d2d2d;
  border: 1px solid #404040;
}

kanban-board::part(column-title) {
  color: #e0e0e0;
  border-bottom: 2px solid #4a9eff;
}

kanban-board::part(item-container) {
  background: #3a3a3a;
  border: 1px solid #4a4a4a;
  color: #e0e0e0;
}

kanban-board::part(item-content) {
  color: #e0e0e0;
}

kanban-board::part(column-add-button) {
  background: #2d5f8a;
  color: #fff;
}

kanban-board::part(column-add-button):hover {
  background: #3a7ab5;
}
```

### Item Actions Styling

```css
/* Style all action buttons */
kanban-board::part(item-actions) {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 4px;
}

/* Individual action buttons */
kanban-board::part(item-action-up),
kanban-board::part(item-action-down),
kanban-board::part(item-action-left),
kanban-board::part(item-action-right) {
  background: #3498db;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background 0.2s;
}

kanban-board::part(item-action-up):hover {
  background: #2980b9;
}

kanban-board::part(item-action-delete) {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 4px 8px;
}

kanban-board::part(item-action-delete):hover {
  background: #c0392b;
}
```

### Drop Zone Styling

```css
/* Style drop zones */
kanban-board::part(dropzone-area) {
  background: rgba(52, 152, 219, 0.1);
  border: 2px dashed transparent;
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* Active drop zone (when dragging over) */
kanban-board::part(dropzone-area):hover,
kanban-board::part(dropzone-area).kanban__dropzone--active {
  background: rgba(52, 152, 219, 0.2);
  border-color: #3498db;
}

kanban-board::part(dropzone-content) {
  background: linear-gradient(
    135deg, 
    rgba(52, 152, 219, 0.3), 
    rgba(41, 128, 185, 0.3)
  );
  border-radius: 4px;
}
```

### Dialog Styling

```css
/* Customize delete dialog */
kanban-board::part(dialog) {
  border: 2px solid #e74c3c;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px;
}

kanban-board::part(dialog-title) {
  color: white;
  font-size: 1.5em;
  margin-bottom: 16px;
}

kanban-board::part(dialog-description) {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1em;
}

kanban-board::part(dialog-cancel-button) {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

kanban-board::part(dialog-confirm-button) {
  background: #e74c3c;
  color: white;
  font-weight: bold;
}

kanban-board::part(dialog-confirm-button):hover {
  background: #c0392b;
}
```

### Material Design Theme

```css
/* Material Design inspired theme */
kanban-board::part(kanban-container) {
  background: #fafafa;
  font-family: 'Roboto', sans-serif;
}

kanban-board::part(column) {
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-radius: 2px;
}

kanban-board::part(column-title) {
  color: #212121;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: 0.5px;
}

kanban-board::part(item-container) {
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  border-radius: 2px;
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

kanban-board::part(item-container):hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

kanban-board::part(column-add-button) {
  background: #2196f3;
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 
              0 3px 1px -2px rgba(0,0,0,0.12), 
              0 1px 5px 0 rgba(0,0,0,0.2);
}

kanban-board::part(column-add-button):hover {
  background: #1976d2;
  box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 
              0 1px 10px 0 rgba(0,0,0,0.12), 
              0 2px 4px -1px rgba(0,0,0,0.2);
}
```

### Responsive Design

```css
/* Mobile-friendly styling */
@media (max-width: 768px) {
  kanban-board::part(kanban-container) {
    flex-direction: column;
    padding: 16px;
  }

  kanban-board::part(column) {
    width: 100%;
    margin-bottom: 16px;
  }

  kanban-board::part(column-title) {
    font-size: 18px;
  }

  kanban-board::part(item-actions) {
    opacity: 1; /* Always show on mobile */
  }
}
```

## Advanced Techniques

### Combining Multiple Parts

```css
/* Style all buttons the same way */
kanban-board::part(column-add-button),
kanban-board::part(dialog-cancel-button),
kanban-board::part(dialog-confirm-button) {
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.2s;
}
```

### State-Based Styling

```css
/* Different styles for active/hover states */
kanban-board::part(item-container):hover {
  border-color: #3498db;
}

kanban-board::part(item-container):focus-within {
  outline: 2px solid #3498db;
  outline-offset: 2px;
}
```

### Animation

```css
/* Add animations to parts */
kanban-board::part(item-container) {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

kanban-board::part(dropzone-content) {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
```

## Notes

- Part selectors work across shadow DOM boundaries
- Multiple classes can share the same part name
- Part names are case-sensitive
- Parts can be combined with pseudo-classes (`:hover`, `:focus`, etc.)
- Cannot select descendants of parts (use separate part names instead)

## See Also

- [MDN: ::part()](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)
- [Dialog Customization Guide](./DIALOG-CUSTOMIZATION.md)
- [Main Documentation](../README.md)
