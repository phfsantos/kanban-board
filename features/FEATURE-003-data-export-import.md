# FEATURE-003: Data Export/Import

## Priority
🟢 **MEDIUM** - Enhances interoperability

## Description
Add functionality to export kanban board data in various formats and import from external sources.

## User Stories
- As a user, I want to export my kanban board to JSON so I can backup my data
- As a user, I want to export to CSV so I can use data in spreadsheets
- As a user, I want to import from other kanban tools
- As a user, I want to export for printing or sharing

## Export Formats

### 1. JSON Export (Current)
- Already available via `data` attribute
- Add dedicated export method

### 2. CSV Export
```typescript
exportCSV(): string {
  const rows: string[][] = [];
  
  // Header row
  rows.push(['Column', 'Item ID', 'Content']);
  
  // Data rows
  this.data.columns.forEach(column => {
    column.items.forEach(item => {
      rows.push([
        `"${column.title}"`,
        `"${item.id}"`,
        `"${item.content.replace(/"/g, '""')}"`
      ]);
    });
  });
  
  return rows.map(row => row.join(',')).join('\n');
}
```

### 3. Markdown Export
```typescript
exportMarkdown(): string {
  let markdown = '# Kanban Board\n\n';
  
  this.data.columns.forEach(column => {
    markdown += `## ${column.title}\n\n`;
    
    column.items.forEach((item, index) => {
      markdown += `${index + 1}. ${item.content}\n`;
    });
    
    markdown += '\n';
  });
  
  return markdown;
}
```

### 4. HTML Export
```typescript
exportHTML(): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Kanban Board Export</title>
        <style>/* styles */</style>
      </head>
      <body>
        <div class="kanban">
          ${this.data.columns.map(column => `
            <div class="column">
              <h2>${column.title}</h2>
              <ul>
                ${column.items.map(item => `
                  <li>${item.content}</li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </body>
    </html>
  `;
}
```

## Import Sources

### 1. JSON Import
```typescript
importJSON(json: string): void {
  try {
    const data = JSON.parse(json);
    this.validateAndLoadData(data);
  } catch (e) {
    throw new Error('Invalid JSON format');
  }
}
```

### 2. CSV Import
```typescript
importCSV(csv: string): void {
  const lines = csv.split('\n');
  const columns = new Map<string, KanbanItem[]>();
  
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const [columnTitle, id, content] = this.parseCSVLine(lines[i]);
    
    if (!columns.has(columnTitle)) {
      columns.set(columnTitle, []);
    }
    
    columns.get(columnTitle)!.push({ id, content });
  }
  
  this.loadFromColumns(columns);
}
```

### 3. Trello Import
```typescript
interface TrelloBoard {
  lists: Array<{
    name: string;
    cards: Array<{
      id: string;
      name: string;
    }>;
  }>;
}

importTrello(trelloData: TrelloBoard): void {
  const data: KanbanBoardData = {
    columns: trelloData.lists.map(list => ({
      id: nanoid(),
      title: list.name,
      items: list.cards.map(card => ({
        id: card.id,
        content: card.name
      }))
    }))
  };
  
  this.data = data;
}
```

## UI Implementation

```typescript
// Add export menu
<div class="kanban-actions">
  <button @click="${this._showExportMenu}">
    Export ▼
  </button>
  <button @click="${this._showImportDialog}">
    Import
  </button>
</div>

<div class="export-menu" ?hidden="${!this.showExportMenu}">
  <button @click="${() => this._export('json')}">Export as JSON</button>
  <button @click="${() => this._export('csv')}">Export as CSV</button>
  <button @click="${() => this._export('markdown')}">Export as Markdown</button>
  <button @click="${() => this._export('html')}">Export as HTML</button>
</div>
```

## Configuration

```typescript
interface ExportConfig {
  formats: {
    json: boolean;
    csv: boolean;
    markdown: boolean;
    html: boolean;
  };
  filename?: string;
  includeMetadata?: boolean;
}
```

## Files Affected
- `src/index.ts`
- New: `src/utils/exporter.ts`
- New: `src/utils/importer.ts`
