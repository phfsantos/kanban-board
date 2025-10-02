# kanban-board

A simple kanban board to be used as an add-on to markdown files within markdown files in vscode.

## About

The Kanban Board is an add-on to markdown files, allowing for a visual representation of tasks and progress directly within your repository. This project aims to integrate a Kanban-style board to enhance project management and workflow visualization. It can also be used in any website.

```html
<kanban-board id="board"></kanban-board>
<script type="module">
  import '@phfsantos/kanban-board';
  
  const board = document.getElementById('board');
  board.setData({
    columns: [
      { id: "1", title: "Todo", items: [{ id: "1", content: "Fix bugs" }] },
      { id: "2", title: "Doing", items: [{ id: "2", content: "Basic design" }] },
      { id: "3", title: "Done", items: [{ id: "3", content: "Created repo" }] }
    ]
  });
</script>
```

![](assets/20240611_051537_image.png)

## Features

- **Drag-and-Drop Interface**: Easily move tasks between different stages of your workflow.
- **Customizable Columns**: Tailor the board to fit your project's specific needs with customizable columns.
- **Comprehensive Error Handling**: Built-in validation and user-friendly error messages with event-based error reporting.
- **Keyboard Navigation**: Full accessibility support with keyboard controls for moving items between columns.
- **Data Validation**: Automatic validation with Zod to ensure data integrity.
- **Event-Driven Architecture**: Listen to data changes for automatic persistence.
- **TypeScript Support**: Full type safety with TypeScript definitions included.
- **Lit**: It is powered by [Lit](https://www.npmjs.com/package/lit), a simple and fast library for building lightweight web components.

## Getting Started

### Installation via npm

Install the package in your project:

```bash
npm install @phfsantos/kanban-board
```

Or with yarn:

```bash
yarn add @phfsantos/kanban-board
```

### Usage in Your Project

Import and use the kanban-board web component in your application:

```javascript
import '@phfsantos/kanban-board';
```

Then use it in your HTML with the new API:

```html
<kanban-board id="board"></kanban-board>

<script type="module">
  const board = document.getElementById('board');
  
  // Set initial data
  board.setData({
    columns: [
      { 
        id: "1", 
        title: "Todo", 
        items: [
          { id: "1", content: "Fix bugs" }
        ] 
      },
      { id: "2", title: "Doing", items: [] },
      { id: "3", title: "Done", items: [] }
    ]
  });
  
  // Listen for data changes to persist them
  board.addEventListener('kanban-change', (e) => {
    // Save to localStorage, backend API, etc.
    localStorage.setItem('kanban-data', JSON.stringify(e.detail.data));
  });
</script>
```

> **Note:** The old `data` attribute is deprecated. See [MIGRATION-GUIDE-v1.3.md](MIGRATION-GUIDE-v1.3.md) for details.

## API Reference

### Methods

#### `setData(data, dispatchEvent = true): boolean`

Set the kanban board data with automatic validation.

**Parameters:**
- `data` (KanbanBoardData): The board data to set
- `dispatchEvent` (boolean, optional): Whether to dispatch a `kanban-change` event (default: `true`)

**Returns:** `boolean` - `true` if data was set successfully, `false` if validation failed

**Example:**
```javascript
const success = board.setData({
  columns: [
    { id: "1", title: "Todo", items: [] }
  ]
});

if (!success) {
  console.error('Invalid data provided');
}
```

#### `getData(): KanbanBoardData`

Get a copy of the current board data.

**Returns:** `KanbanBoardData` - A deep copy of the current board state

**Example:**
```javascript
const currentData = board.getData();
console.log(currentData);

// Save to backend
fetch('/api/kanban', {
  method: 'POST',
  body: JSON.stringify(currentData)
});
```

### Events

#### `kanban-change`

Dispatched whenever the board data changes (items moved, added, deleted, or updated).

**Event Detail:**
```typescript
{
  data: KanbanBoardData,  // Current board data
  timestamp: number        // Unix timestamp in milliseconds
}
```

**Example:**
```javascript
board.addEventListener('kanban-change', (e) => {
  console.log('Data changed at:', new Date(e.detail.timestamp));
  localStorage.setItem('kanban-data', JSON.stringify(e.detail.data));
});
```

#### `kanban-error`

Dispatched when an error occurs in the board.

**Event Detail:**
```typescript
{
  type: 'validation' | 'operation' | 'system',
  message: string,          // Technical error message
  userMessage?: string,     // User-friendly message
  details?: any            // Additional error details
}
```

**Example:**
```javascript
board.addEventListener('kanban-error', (e) => {
  const error = e.detail;
  
  // Show user-friendly message
  alert(error.userMessage || error.message);
  
  // Log technical details
  console.error('Kanban error:', error);
});
```

### Data Types

The `data` structure follows this TypeScript interface:

```typescript
type KanbanBoardData = {
  columns?: Array<{
    id: string;
    title: string;
    items: Array<{
      id: string;
      content: string;
    }>;
  }>;
}
```

### Validation Schemas

The component uses Zod for runtime validation. You can import and use these schemas:

```typescript
import { 
  KanbanBoardDataSchema,
  KanbanColumnSchema,
  KanbanItemSchema 
} from '@phfsantos/kanban-board';

// Validate data before setting
try {
  const validated = KanbanBoardDataSchema.parse(myData);
  board.setData(validated);
} catch (error) {
  console.error('Validation failed:', error);
}
```

### Error Handling

The kanban-board component includes comprehensive error handling with user-friendly error messages and event-based error reporting.

#### Listening to Error Events

You can listen to the `kanban-error` event to handle errors in your application:

```javascript
const board = document.querySelector('kanban-board');

board.addEventListener('kanban-error', (event) => {
  const error = event.detail;
  
  // Display user-friendly message
  console.error('User Message:', error.userMessage);
  
  // Log technical details for debugging
  console.error('Technical Details:', error.message, error.details);
  
  // Show notification to user
  showNotification(error.userMessage || error.message);
});
```

#### Error Event Structure

```typescript
type KanbanError = {
  type: 'validation' | 'operation' | 'system';
  message: string;          // Technical error message
  userMessage?: string;     // User-friendly message
  details?: any;            // Additional error details
};
```

#### Error Types

- **validation**: Invalid input data (e.g., invalid column ID, invalid item data)
- **operation**: Failed operation (e.g., failed to move item, failed to update)
- **system**: System-level errors (e.g., data corruption)

#### Available Error Messages

- `COLUMN_NOT_FOUND`: The column you are trying to update does not exist
- `ITEM_NOT_FOUND`: The item you are trying to update does not exist
- `INVALID_DATA`: The data provided is invalid
- `NO_COLUMNS`: No columns are available
- `MOVE_FAILED`: Failed to move the item
- `UPDATE_FAILED`: Failed to update the item
- `ADD_FAILED`: Failed to add the item

For a complete demonstration of error handling, see [test-error-handling.html](test-error-handling.html).

### Development Setup

To contribute or run the project locally:

#### Prerequisites

- Node.js >= 16.0.0
- npm

#### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/phfsantos/kanban-board.git
   ```
2. Navigate to the project directory:

   ```bash
   cd kanban-board
   ```
3. Install the dependencies:

   ```bash
   npm install
   ```

#### Development

To launch the development server:

```bash
npm start
```

This will open the board in your default web browser with hot reload.

To build the project:

```bash
npm run build
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag “enhancement”.

Don’t forget to give the project a star! Thanks again!

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Pedro Santos - [@ordepim](https://twitter.com/ordepim) - phfsantos@hotmail.com - Project Link: [https://github.com/phfsantos/kanban-board](https://github.com/phfsantos/kanban-board)

## Acknowledgments

- Domenic (dcode) - [@dcodeyt](https://twitter.com/dcodeyt) - Project Link: [https://github.com/dcode-youtube/kanban-board](https://github.com/dcode-youtube/kanban-board)

```

Please make sure to update the placeholders (like `Your Name`, `@your_twitter`, and `email@example.com`) with your actual information. Also, feel free to adjust the sections according to the specifics of the `kanban-board` project. Enjoy managing your projects with the new Kanban Board!
```
