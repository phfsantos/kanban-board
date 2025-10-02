# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Accessibility**: Comprehensive WCAG 2.1 Level AA compliance (ISSUE-007)
  - ARIA labels and roles on all interactive elements
  - Full keyboard navigation support (Tab, Enter, Escape, Shift+Delete)
  - Keyboard alternative to drag & drop (arrow buttons: ↑ ↓ ← →)
  - Screen reader support with live region announcements
  - Focus management with visible focus indicators
  - Semantic HTML structure with proper roles
- Public `findItemAndColumn()` method in KanbanController API

### Changed
- Improved npm package configuration for better distribution
- Fixed build output paths to use `dist/` consistently
- Added proper TypeScript type definitions export
- Moved Lit to peer dependencies
- Added package exports map for better module resolution

### Added
- `.npmignore` file to exclude development files
- `CHANGELOG.md` for tracking changes
- Package validation scripts
- Tree-shaking configuration

## [1.1.1] - Previous Release

### Features
- Drag-and-Drop Interface
- Customizable Columns
- Lit-based web components
