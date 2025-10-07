# Changelog

All notable changes to this project will be documented in this file.

## [1.3.4] - 2025-10-07

### Added - Complete ::part() Selector Support

#### Comprehensive Shadow DOM Customization
Added **24 named parts** across all components, enabling complete external customization via CSS `::part()` selectors:

**Main Container (1 part)**
- `kanban-container` - Main board container

**Column Parts (4 parts)**
- `column` - Individual column component
- `column-title` - Editable column title
- `column-items` - Items container
- `column-add-button` - Add item button

**Item Parts (9 parts)**
- `item` - Item component
- `item-container` - Item outer container
- `item-content` - Editable content area
- `item-actions` - Action buttons container
- `item-action-up` - Move up button
- `item-action-down` - Move down button
- `item-action-left` - Move left button
- `item-action-right` - Move right button
- `item-action-delete` - Delete button

**Drop Zone Parts (3 parts)**
- `dropzone` - Drop zone component
- `dropzone-area` - Drop zone outer area
- `dropzone-content` - Drop zone visual indicator

**Dialog Parts (7 parts)**
- `dialog` - Delete confirmation dialog
- `dialog-form` - Dialog form wrapper
- `dialog-title` - Dialog title
- `dialog-description` - Dialog description
- `dialog-buttons` - Buttons container
- `dialog-cancel-button` - Cancel button
- `dialog-confirm-button` - Confirm button

#### New Documentation
- `docs/PART-SELECTORS.md` - Complete reference for all 24 part selectors
- `examples/complete-parts-demo.html` - Interactive demo with 5 preset themes
- Updated README with comprehensive customization section

#### Updated Components
- `src/index.ts` - Added `kanban-container` part
- `src/view/Column.ts` - Added column-related parts
- `src/view/Item.ts` - Added item and action parts
- `src/view/DropZone.ts` - Added dropzone parts

### Fixed

- Rollup configuration now preserves all HTML attributes during bundling
- Added terser `format` options with `preserve_annotations: true`
- All 24 part attributes successfully exported in distribution bundle

### Browser Support

CSS `::part()` selector support:
- Chrome/Edge 73+
- Firefox 72+
- Safari 13.1+
- Opera 60+

## [1.3.3] - 2024-10-06

### Changed
- Removed `data` property reflection to avoid attribute size limits
- Added `getData()` and `setData()` methods for data management

## [1.3.0] - 2024-10-05

### Added
- Zod schema validation for runtime type checking
- Comprehensive error handling with user-friendly messages

## [1.2.0] - 2024-10-04

### Added
- Keyboard navigation support
- Screen reader announcements

## [1.1.1] - 2024-10-03

### Fixed
- Column boundary rendering issues

## [1.1.0] - 2024-10-02

### Added
- Drag and drop animations
- Visual feedback for drop zones

## [1.0.0] - 2024-10-01

### Added
- Initial release
- Basic kanban board functionality
- Column and item management
- Drag and drop support
