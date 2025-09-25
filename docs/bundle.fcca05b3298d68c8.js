(()=>{"use strict";var e={445:function(e,t,n){n.d(t,{A:()=>a});var r=n(947),o=n.n(r),i=n(529),l=n.n(i)()(o());l.push([e.id,`.md-wysiwyg-editor-wrapper {
  border: 1px solid var(--border-color, #ddd);
  border-radius: 8px;
  background-color: var(--bg-color, #fff);
  color: var(--text-color, #24292e);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.md-wysiwyg-editor-wrapper[data-theme='light'] {
  --bg-color: #ffffff;
  --text-color: #24292e;
  --border-color: #ddd;
  --toolbar-bg: #f7f7f7;
  --toolbar-border: #ddd;
  --button-bg: #fff;
  --button-hover: #e9e9e9;
  --button-active: #007bff;
  --button-border: #ccc;
  --button-text: #24292e;
  --input-bg: #ffffff;
  --editable-bg: #ffffff;
}

.md-wysiwyg-editor-wrapper[data-theme='dark'] {
  --bg-color: #0d1117;
  --text-color: #f0f6fc;
  --border-color: #30363d;
  --toolbar-bg: #161b22;
  --toolbar-border: #30363d;
  --button-bg: #21262d;
  --button-hover: #30363d;
  --button-active: #1f6feb;
  --button-border: #30363d;
  --button-text: #f0f6fc;
  --input-bg: #0d1117;
  --editable-bg: #0d1117;
}

.md-toolbar {
  background-color: var(--toolbar-bg);
  padding: 8px 10px;
  border-bottom: 1px solid var(--toolbar-border);
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
}

.md-toolbar-button {
  padding: 6px 8px;
  border: 1px solid var(--button-border);
  background-color: var(--button-bg);
  color: var(--button-text);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  min-height: 30px;
}

.md-toolbar-button:hover {
  background-color: var(--button-hover);
  border-color: var(--button-border);
}

.md-toolbar-button.active {
  background-color: var(--button-active);
  border-color: var(--button-active);
  color: var(--bg-color);
}

.md-toolbar-button.disabled,
.md-toolbar-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.md-toolbar-button svg {
  width: 18px;
  height: 18px;
  vertical-align: middle;
}

.md-editor-content-area {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 500px;
}

.md-editable-area {
  height: 100%;
  overflow-y: auto;
  padding: 15px;
  outline: none;
  word-wrap: break-word;
  font-size: 15px;
  line-height: 1.7;
  width: 100%;
  box-sizing: border-box;
  border: none;
  background-color: var(--editable-bg);
  color: var(--text-color);
}

.md-editable-area h1 {
  font-size: 2em;
  font-weight: bold;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
}

.md-editable-area h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
}

.md-editable-area h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 1em;
}

.md-editable-area p {
  margin-bottom: 1em;
}

.md-editable-area strong,
.md-editable-area b {
  font-weight: bold;
}

.md-editable-area em,
.md-editable-area i {
  font-style: italic;
}

.md-editable-area s,
.md-editable-area del {
  text-decoration: line-through;
}

.md-editable-area a {
  color: #0366d6;
  text-decoration: underline;
}

.md-editable-area ul,
.md-editable-area ol {
  margin-left: 20px;
  margin-bottom: 1em;
}

.md-editable-area li {
  margin-bottom: 0.2em;
}

.md-editable-area blockquote {
  border-left: 3px solid #007bff;
  margin-left: 0;
  padding-left: 1em;
  font-style: italic;
  margin-bottom: 1em;
}

.md-editable-area blockquote p {
  margin-bottom: 0.5em;
}

.md-editable-area pre {
  background-color: var(--toolbar-bg, #f0f0f0);
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Menlo', 'Consolas', monospace;
  font-size: 0.9em;
  margin-bottom: 1em;
  white-space: pre;
}

.md-editable-area code {
  font-family: 'Menlo', 'Consolas', monospace;
  background-color: var(--toolbar-bg, #f0f0f0);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

.md-editable-area pre code {
  background-color: transparent;
  padding: 0;
  font-size: inherit;
}

.md-editable-area hr {
  margin-top: 1em;
  margin-bottom: 1em;
  border: 0;
  border-top: 1px solid #eee;
}

.md-editable-area table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1em;
  border: 1px solid #ddd;
}

.md-editable-area th,
.md-editable-area td {
  border: 1px solid #ddd;
  padding: 8px 10px;
  text-align: left;
  min-width: 50px;
}

.md-editable-area th {
  background-color: var(--toolbar-bg, #f7f7f7);
  font-weight: bold;
}

.md-editable-area td:empty::before,
.md-editable-area th:empty::before {
  content: '\\200B';
}

.md-markdown-editor-container {
  display: flex;
  height: 100%;
  background-color: #fff;
  color: #333;
  font-family: 'Menlo', 'Consolas', monospace;
  display: none;
  width: 100%;
  box-sizing: border-box;
}

.md-markdown-line-numbers {
  padding: 15px 10px 15px 15px;
  text-align: right;
  user-select: none;
  background-color: #f7f7f7;
  color: #888;
  border-right: 1px solid #ddd;
  overflow: hidden;
  box-sizing: border-box;
}

.md-markdown-textarea-wrapper {
  flex-grow: 1;
  position: relative;
  height: 100%;
  overflow: hidden;
}

.md-markdown-area {
  height: 100%;
  width: 100%;
  padding: 15px;
  border: none;
  outline: none;
  resize: none;
  background-color: var(--bg-color, transparent);
  color: var(--text-color, inherit);
  font-family: inherit;
  box-sizing: border-box;
  overflow-y: auto;
}

.md-tabs {
  display: flex;
  border-top: 1px solid var(--border-color);
  background-color: var(--toolbar-bg);
}

.md-tab-button {
  padding: 10px 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color);
  border-right: 1px solid var(--border-color);
}

.md-tab-button:last-child {
  border-right: none;
}

.md-tab-button.active {
  background-color: var(--bg-color);
  color: var(--button-active);
  font-weight: bold;
  border-bottom: 2px solid var(--button-active);
  margin-bottom: -1px;
}

.md-tab-button:hover:not(.active) {
  background-color: var(--button-hover);
}

.md-toolbar-separator {
  width: 1px;
  height: 22px;
  background-color: #ddd;
  margin: 0 6px;
  align-self: center;
}

/* Mithril integration classes */

.editor-toolbar {
  background-color: #f7f7f7;
  padding: 8px 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
}

.toolbar-button {
  padding: 6px 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  min-height: 30px;
}

.toolbar-button:hover {
  background-color: #e9e9e9;
  border-color: #bbb;
}

.toolbar-separator {
  width: 1px;
  height: 22px;
  background-color: #ddd;
  margin: 0 6px;
  align-self: center;
}

.editor-mode-toggle {
  display: flex;
  margin-left: auto;
}

.mode-button {
  padding: 10px 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;
  color: #555;
  border-right: 1px solid #ddd;
}

.mode-button:last-child {
  border-right: none;
}

.mode-button.active {
  background-color: #fff;
  color: #007bff;
  font-weight: bold;
  border-bottom: 2px solid #007bff;
  margin-bottom: -1px;
}

.mode-button:hover:not(.active) {
  background-color: #e9e9e9;
}

.editor-content {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 500px;
}

.editor-textarea {
  height: 100%;
  width: 100%;
  padding: 15px;
  border: none;
  outline: none;
  resize: none;
  background-color: transparent;
  color: #333;
  font-family: 'Menlo', 'Consolas', monospace;
  box-sizing: border-box;
  overflow-y: auto;
  font-size: 15px;
  line-height: 1.7;
}

.editor-wysiwyg {
  height: 100%;
  overflow-y: auto;
  padding: 15px;
  outline: none;
  word-wrap: break-word;
  font-size: 15px;
  line-height: 1.7;
  width: 100%;
  box-sizing: border-box;
  border: none;
  background-color: #fff;
}

.editor-wysiwyg:empty::before {
  content: attr(data-placeholder);
  color: #999;
  pointer-events: none;
}

.editor-wysiwyg h1 {
  font-size: 2em;
  font-weight: bold;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
}

.editor-wysiwyg h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
}

.editor-wysiwyg h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 1em;
}

.editor-wysiwyg p {
  margin-bottom: 1em;
}

.editor-wysiwyg strong,
.editor-wysiwyg b {
  font-weight: bold;
}

.editor-wysiwyg em,
.editor-wysiwyg i {
  font-style: italic;
}

.editor-wysiwyg a {
  color: #0366d6;
  text-decoration: underline;
}

.editor-wysiwyg ul,
.editor-wysiwyg ol {
  margin-left: 20px;
  margin-bottom: 1em;
}

.editor-wysiwyg li {
  margin-bottom: 0.2em;
}

.editor-wysiwyg blockquote {
  border-left: 3px solid #007bff;
  margin-left: 0;
  padding-left: 1em;
  color: #555;
  font-style: italic;
  margin-bottom: 1em;
}

.editor-wysiwyg pre {
  background-color: var(--toolbar-bg, #f0f0f0);
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Menlo', 'Consolas', monospace;
  font-size: 0.9em;
  margin-bottom: 1em;
  white-space: pre;
}

.editor-wysiwyg code {
  font-family: 'Menlo', 'Consolas', monospace;
  background-color: var(--toolbar-bg, #f0f0f0);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

.editor-wysiwyg table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1em;
  border: 1px solid #ddd;
}

.editor-wysiwyg th,
.editor-wysiwyg td {
  border: 1px solid #ddd;
  padding: 8px 10px;
  text-align: left;
  min-width: 50px;
}

.editor-wysiwyg th {
  background-color: var(--toolbar-bg, #f7f7f7);
  font-weight: bold;
}

.editor-preview {
  padding: 15px;
  background-color: #fff;
  color: #333;
  line-height: 1.7;
  overflow-y: auto;
  max-height: 500px;
  border-top: 1px solid #ddd;
}

/* Table Context Menu Styles */
.table-context-menu {
  position: fixed;
  /*z-index: 1000;*/
}

.table-menu-content {
  background: var(--button-bg, white);
  border: 1px solid var(--border-color, #ddd);
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  padding: 4px 0;
}

.table-menu-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color, #333);
  background: var(--button-bg, white);
  border: none;
  width: 100%;
  text-align: left;
  gap: 8px;
  transition: background-color 0.15s ease;
}

.table-menu-item:hover,
.table-menu-item:focus {
  background-color: var(--button-hover, #f5f5f5);
  outline: none;
}

.table-menu-item.danger {
  color: #dc3545;
}

.table-menu-item.danger:hover,
.table-menu-item.danger:focus {
  background-color: #ffeaea;
}

.table-menu-icon {
  min-width: 16px;
  text-align: center;
  font-size: 12px;
  opacity: 0.7;
}

.table-menu-label {
  flex: 1;
}

.table-menu-separator {
  height: 1px;
  background-color: #eee;
  margin: 4px 0;
}

/* Dropdown Menu Styles */
.dropdown-menu-container {
  position: fixed;
  z-index: 1000;
}

.dropdown-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

.dropdown-menu-content {
  background: var(--button-bg, #fff);
  border: 1px solid var(--border-color, #ddd);
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  padding: 4px 0;
  max-height: 300px;
  overflow-y: auto;
  position: relative;
  z-index: 1001;
}

.dropdown-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  background: var(--button-bg, #fff);
  border: none;
  color: var(--text-color, #333);
  text-align: left;
  width: 100%;
  font-size: 14px;
  transition: background-color 0.15s ease;
}

.dropdown-menu-item:hover,
.dropdown-menu-item:focus,
.dropdown-menu-item.selected {
  background-color: var(--button-hover, #f5f5f5);
  outline: none;
}

.dropdown-menu-icon {
  min-width: 16px;
  text-align: center;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu-icon svg {
  width: 16px;
  height: 16px;
}

.dropdown-menu-label {
  flex: 1;
  font-weight: 500;
}

.dropdown-menu-shortcut {
  font-size: 12px;
  opacity: 0.6;
  font-family: monospace;
}

/* Toolbar button with dropdown indicator */
.md-toolbar-button.has-dropdown {
  position: relative;
}

.md-toolbar-button.has-dropdown::after {
  content: '';
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 3px solid currentColor;
  opacity: 0.6;
}

/* Dark theme support for dropdowns */
.md-wysiwyg-editor-wrapper[data-theme='dark'] .dropdown-menu-content {
  background: var(--button-bg);
  border-color: var(--border-color);
  color: var(--text-color);
}

.md-wysiwyg-editor-wrapper[data-theme='dark'] .dropdown-menu-item {
  background: var(--button-bg);
  color: var(--text-color);
}

.md-wysiwyg-editor-wrapper[data-theme='dark'] .dropdown-menu-item:hover,
.md-wysiwyg-editor-wrapper[data-theme='dark'] .dropdown-menu-item:focus,
.md-wysiwyg-editor-wrapper[data-theme='dark'] .dropdown-menu-item.selected {
  background-color: var(--button-hover);
}
`,"",{version:3,sources:["webpack://./../lib/dist/index.css"],names:[],mappings:"AAAA;EACE,2CAA2C;EAC3C,kBAAkB;EAClB,uCAAuC;EACvC,iCAAiC;EACjC,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,oBAAoB;EACpB,qBAAqB;EACrB,sBAAsB;EACtB,iBAAiB;EACjB,uBAAuB;EACvB,wBAAwB;EACxB,qBAAqB;EACrB,sBAAsB;EACtB,mBAAmB;EACnB,sBAAsB;AACxB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,uBAAuB;EACvB,qBAAqB;EACrB,yBAAyB;EACzB,oBAAoB;EACpB,uBAAuB;EACvB,wBAAwB;EACxB,wBAAwB;EACxB,sBAAsB;EACtB,mBAAmB;EACnB,sBAAsB;AACxB;;AAEA;EACE,mCAAmC;EACnC,iBAAiB;EACjB,8CAA8C;EAC9C,aAAa;EACb,eAAe;EACf,QAAQ;EACR,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,sCAAsC;EACtC,kCAAkC;EAClC,yBAAyB;EACzB,kBAAkB;EAClB,eAAe;EACf,eAAe;EACf,sCAAsC;EACtC,oBAAoB;EACpB,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,qCAAqC;EACrC,kCAAkC;AACpC;;AAEA;EACE,sCAAsC;EACtC,kCAAkC;EAClC,sBAAsB;AACxB;;AAEA;;EAEE,YAAY;EACZ,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,aAAa;EACb,qBAAqB;EACrB,eAAe;EACf,gBAAgB;EAChB,WAAW;EACX,sBAAsB;EACtB,YAAY;EACZ,oCAAoC;EACpC,wBAAwB;AAC1B;;AAEA;EACE,cAAc;EACd,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qBAAqB;AACvB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qBAAqB;AACvB;;AAEA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;;EAEE,iBAAiB;AACnB;;AAEA;;EAEE,kBAAkB;AACpB;;AAEA;;EAEE,6BAA6B;AAC/B;;AAEA;EACE,cAAc;EACd,0BAA0B;AAC5B;;AAEA;;EAEE,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,8BAA8B;EAC9B,cAAc;EACd,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,4CAA4C;EAC5C,aAAa;EACb,kBAAkB;EAClB,gBAAgB;EAChB,2CAA2C;EAC3C,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,2CAA2C;EAC3C,4CAA4C;EAC5C,oBAAoB;EACpB,kBAAkB;AACpB;;AAEA;EACE,6BAA6B;EAC7B,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,SAAS;EACT,0BAA0B;AAC5B;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;;EAEE,sBAAsB;EACtB,iBAAiB;EACjB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,4CAA4C;EAC5C,iBAAiB;AACnB;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,sBAAsB;EACtB,WAAW;EACX,2CAA2C;EAC3C,aAAa;EACb,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE,4BAA4B;EAC5B,iBAAiB;EACjB,iBAAiB;EACjB,yBAAyB;EACzB,WAAW;EACX,4BAA4B;EAC5B,gBAAgB;EAChB,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,8CAA8C;EAC9C,iCAAiC;EACjC,oBAAoB;EACpB,sBAAsB;EACtB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,yCAAyC;EACzC,mCAAmC;AACrC;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,6BAA6B;EAC7B,eAAe;EACf,eAAe;EACf,wBAAwB;EACxB,2CAA2C;AAC7C;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,iCAAiC;EACjC,2BAA2B;EAC3B,iBAAiB;EACjB,6CAA6C;EAC7C,mBAAmB;AACrB;;AAEA;EACE,qCAAqC;AACvC;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,sBAAsB;EACtB,aAAa;EACb,kBAAkB;AACpB;;AAEA,gCAAgC;;AAEhC;EACE,yBAAyB;EACzB,iBAAiB;EACjB,6BAA6B;EAC7B,aAAa;EACb,eAAe;EACf,QAAQ;EACR,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,sBAAsB;EACtB,kBAAkB;EAClB,eAAe;EACf,eAAe;EACf,sCAAsC;EACtC,oBAAoB;EACpB,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;EACzB,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,sBAAsB;EACtB,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,6BAA6B;EAC7B,eAAe;EACf,eAAe;EACf,WAAW;EACX,4BAA4B;AAC9B;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,sBAAsB;EACtB,cAAc;EACd,iBAAiB;EACjB,gCAAgC;EAChC,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,6BAA6B;EAC7B,WAAW;EACX,2CAA2C;EAC3C,sBAAsB;EACtB,gBAAgB;EAChB,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,aAAa;EACb,qBAAqB;EACrB,eAAe;EACf,gBAAgB;EAChB,WAAW;EACX,sBAAsB;EACtB,YAAY;EACZ,sBAAsB;AACxB;;AAEA;EACE,+BAA+B;EAC/B,WAAW;EACX,oBAAoB;AACtB;;AAEA;EACE,cAAc;EACd,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qBAAqB;AACvB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qBAAqB;AACvB;;AAEA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;;EAEE,iBAAiB;AACnB;;AAEA;;EAEE,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,0BAA0B;AAC5B;;AAEA;;EAEE,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,8BAA8B;EAC9B,cAAc;EACd,iBAAiB;EACjB,WAAW;EACX,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,4CAA4C;EAC5C,aAAa;EACb,kBAAkB;EAClB,gBAAgB;EAChB,2CAA2C;EAC3C,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,2CAA2C;EAC3C,4CAA4C;EAC5C,oBAAoB;EACpB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;;EAEE,sBAAsB;EACtB,iBAAiB;EACjB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,4CAA4C;EAC5C,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;EACX,gBAAgB;EAChB,gBAAgB;EAChB,iBAAiB;EACjB,0BAA0B;AAC5B;;AAEA,8BAA8B;AAC9B;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,mCAAmC;EACnC,2CAA2C;EAC3C,kBAAkB;EAClB,yCAAyC;EACzC,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;EACf,eAAe;EACf,8BAA8B;EAC9B,mCAAmC;EACnC,YAAY;EACZ,WAAW;EACX,gBAAgB;EAChB,QAAQ;EACR,uCAAuC;AACzC;;AAEA;;EAEE,8CAA8C;EAC9C,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;;EAEE,yBAAyB;AAC3B;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,eAAe;EACf,YAAY;AACd;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,WAAW;EACX,sBAAsB;EACtB,aAAa;AACf;;AAEA,yBAAyB;AACzB;EACE,eAAe;EACf,aAAa;AACf;;AAEA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,YAAY;AACd;;AAEA;EACE,kCAAkC;EAClC,2CAA2C;EAC3C,kBAAkB;EAClB,yCAAyC;EACzC,gBAAgB;EAChB,cAAc;EACd,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,iBAAiB;EACjB,eAAe;EACf,kCAAkC;EAClC,YAAY;EACZ,8BAA8B;EAC9B,gBAAgB;EAChB,WAAW;EACX,eAAe;EACf,uCAAuC;AACzC;;AAEA;;;EAGE,8CAA8C;EAC9C,aAAa;AACf;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,OAAO;EACP,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,sBAAsB;AACxB;;AAEA,2CAA2C;AAC3C;EACE,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,UAAU;EACV,WAAW;EACX,QAAQ;EACR,SAAS;EACT,kCAAkC;EAClC,mCAAmC;EACnC,kCAAkC;EAClC,YAAY;AACd;;AAEA,qCAAqC;AACrC;EACE,4BAA4B;EAC5B,iCAAiC;EACjC,wBAAwB;AAC1B;;AAEA;EACE,4BAA4B;EAC5B,wBAAwB;AAC1B;;AAEA;;;EAGE,qCAAqC;AACvC",sourcesContent:[".md-wysiwyg-editor-wrapper {\n  border: 1px solid var(--border-color, #ddd);\n  border-radius: 8px;\n  background-color: var(--bg-color, #fff);\n  color: var(--text-color, #24292e);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n}\n\n.md-wysiwyg-editor-wrapper[data-theme='light'] {\n  --bg-color: #ffffff;\n  --text-color: #24292e;\n  --border-color: #ddd;\n  --toolbar-bg: #f7f7f7;\n  --toolbar-border: #ddd;\n  --button-bg: #fff;\n  --button-hover: #e9e9e9;\n  --button-active: #007bff;\n  --button-border: #ccc;\n  --button-text: #24292e;\n  --input-bg: #ffffff;\n  --editable-bg: #ffffff;\n}\n\n.md-wysiwyg-editor-wrapper[data-theme='dark'] {\n  --bg-color: #0d1117;\n  --text-color: #f0f6fc;\n  --border-color: #30363d;\n  --toolbar-bg: #161b22;\n  --toolbar-border: #30363d;\n  --button-bg: #21262d;\n  --button-hover: #30363d;\n  --button-active: #1f6feb;\n  --button-border: #30363d;\n  --button-text: #f0f6fc;\n  --input-bg: #0d1117;\n  --editable-bg: #0d1117;\n}\n\n.md-toolbar {\n  background-color: var(--toolbar-bg);\n  padding: 8px 10px;\n  border-bottom: 1px solid var(--toolbar-border);\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  align-items: center;\n}\n\n.md-toolbar-button {\n  padding: 6px 8px;\n  border: 1px solid var(--button-border);\n  background-color: var(--button-bg);\n  color: var(--button-text);\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background-color 0.2s ease;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 30px;\n  min-height: 30px;\n}\n\n.md-toolbar-button:hover {\n  background-color: var(--button-hover);\n  border-color: var(--button-border);\n}\n\n.md-toolbar-button.active {\n  background-color: var(--button-active);\n  border-color: var(--button-active);\n  color: var(--bg-color);\n}\n\n.md-toolbar-button.disabled,\n.md-toolbar-button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n\n.md-toolbar-button svg {\n  width: 18px;\n  height: 18px;\n  vertical-align: middle;\n}\n\n.md-editor-content-area {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  height: 500px;\n}\n\n.md-editable-area {\n  height: 100%;\n  overflow-y: auto;\n  padding: 15px;\n  outline: none;\n  word-wrap: break-word;\n  font-size: 15px;\n  line-height: 1.7;\n  width: 100%;\n  box-sizing: border-box;\n  border: none;\n  background-color: var(--editable-bg);\n  color: var(--text-color);\n}\n\n.md-editable-area h1 {\n  font-size: 2em;\n  font-weight: bold;\n  margin-top: 0.67em;\n  margin-bottom: 0.67em;\n  border-bottom: 1px solid #eee;\n  padding-bottom: 0.3em;\n}\n\n.md-editable-area h2 {\n  font-size: 1.5em;\n  font-weight: bold;\n  margin-top: 0.83em;\n  margin-bottom: 0.83em;\n  border-bottom: 1px solid #eee;\n  padding-bottom: 0.3em;\n}\n\n.md-editable-area h3 {\n  font-size: 1.17em;\n  font-weight: bold;\n  margin-top: 1em;\n  margin-bottom: 1em;\n}\n\n.md-editable-area p {\n  margin-bottom: 1em;\n}\n\n.md-editable-area strong,\n.md-editable-area b {\n  font-weight: bold;\n}\n\n.md-editable-area em,\n.md-editable-area i {\n  font-style: italic;\n}\n\n.md-editable-area s,\n.md-editable-area del {\n  text-decoration: line-through;\n}\n\n.md-editable-area a {\n  color: #0366d6;\n  text-decoration: underline;\n}\n\n.md-editable-area ul,\n.md-editable-area ol {\n  margin-left: 20px;\n  margin-bottom: 1em;\n}\n\n.md-editable-area li {\n  margin-bottom: 0.2em;\n}\n\n.md-editable-area blockquote {\n  border-left: 3px solid #007bff;\n  margin-left: 0;\n  padding-left: 1em;\n  font-style: italic;\n  margin-bottom: 1em;\n}\n\n.md-editable-area blockquote p {\n  margin-bottom: 0.5em;\n}\n\n.md-editable-area pre {\n  background-color: var(--toolbar-bg, #f0f0f0);\n  padding: 10px;\n  border-radius: 4px;\n  overflow-x: auto;\n  font-family: 'Menlo', 'Consolas', monospace;\n  font-size: 0.9em;\n  margin-bottom: 1em;\n  white-space: pre;\n}\n\n.md-editable-area code {\n  font-family: 'Menlo', 'Consolas', monospace;\n  background-color: var(--toolbar-bg, #f0f0f0);\n  padding: 0.1em 0.3em;\n  border-radius: 3px;\n}\n\n.md-editable-area pre code {\n  background-color: transparent;\n  padding: 0;\n  font-size: inherit;\n}\n\n.md-editable-area hr {\n  margin-top: 1em;\n  margin-bottom: 1em;\n  border: 0;\n  border-top: 1px solid #eee;\n}\n\n.md-editable-area table {\n  border-collapse: collapse;\n  width: 100%;\n  margin-bottom: 1em;\n  border: 1px solid #ddd;\n}\n\n.md-editable-area th,\n.md-editable-area td {\n  border: 1px solid #ddd;\n  padding: 8px 10px;\n  text-align: left;\n  min-width: 50px;\n}\n\n.md-editable-area th {\n  background-color: var(--toolbar-bg, #f7f7f7);\n  font-weight: bold;\n}\n\n.md-editable-area td:empty::before,\n.md-editable-area th:empty::before {\n  content: '\\200B';\n}\n\n.md-markdown-editor-container {\n  display: flex;\n  height: 100%;\n  background-color: #fff;\n  color: #333;\n  font-family: 'Menlo', 'Consolas', monospace;\n  display: none;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.md-markdown-line-numbers {\n  padding: 15px 10px 15px 15px;\n  text-align: right;\n  user-select: none;\n  background-color: #f7f7f7;\n  color: #888;\n  border-right: 1px solid #ddd;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n\n.md-markdown-textarea-wrapper {\n  flex-grow: 1;\n  position: relative;\n  height: 100%;\n  overflow: hidden;\n}\n\n.md-markdown-area {\n  height: 100%;\n  width: 100%;\n  padding: 15px;\n  border: none;\n  outline: none;\n  resize: none;\n  background-color: var(--bg-color, transparent);\n  color: var(--text-color, inherit);\n  font-family: inherit;\n  box-sizing: border-box;\n  overflow-y: auto;\n}\n\n.md-tabs {\n  display: flex;\n  border-top: 1px solid var(--border-color);\n  background-color: var(--toolbar-bg);\n}\n\n.md-tab-button {\n  padding: 10px 15px;\n  border: none;\n  background-color: transparent;\n  cursor: pointer;\n  font-size: 14px;\n  color: var(--text-color);\n  border-right: 1px solid var(--border-color);\n}\n\n.md-tab-button:last-child {\n  border-right: none;\n}\n\n.md-tab-button.active {\n  background-color: var(--bg-color);\n  color: var(--button-active);\n  font-weight: bold;\n  border-bottom: 2px solid var(--button-active);\n  margin-bottom: -1px;\n}\n\n.md-tab-button:hover:not(.active) {\n  background-color: var(--button-hover);\n}\n\n.md-toolbar-separator {\n  width: 1px;\n  height: 22px;\n  background-color: #ddd;\n  margin: 0 6px;\n  align-self: center;\n}\n\n/* Mithril integration classes */\n\n.editor-toolbar {\n  background-color: #f7f7f7;\n  padding: 8px 10px;\n  border-bottom: 1px solid #ddd;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  align-items: center;\n}\n\n.toolbar-button {\n  padding: 6px 8px;\n  border: 1px solid #ccc;\n  background-color: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background-color 0.2s ease;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 30px;\n  min-height: 30px;\n}\n\n.toolbar-button:hover {\n  background-color: #e9e9e9;\n  border-color: #bbb;\n}\n\n.toolbar-separator {\n  width: 1px;\n  height: 22px;\n  background-color: #ddd;\n  margin: 0 6px;\n  align-self: center;\n}\n\n.editor-mode-toggle {\n  display: flex;\n  margin-left: auto;\n}\n\n.mode-button {\n  padding: 10px 15px;\n  border: none;\n  background-color: transparent;\n  cursor: pointer;\n  font-size: 14px;\n  color: #555;\n  border-right: 1px solid #ddd;\n}\n\n.mode-button:last-child {\n  border-right: none;\n}\n\n.mode-button.active {\n  background-color: #fff;\n  color: #007bff;\n  font-weight: bold;\n  border-bottom: 2px solid #007bff;\n  margin-bottom: -1px;\n}\n\n.mode-button:hover:not(.active) {\n  background-color: #e9e9e9;\n}\n\n.editor-content {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  height: 500px;\n}\n\n.editor-textarea {\n  height: 100%;\n  width: 100%;\n  padding: 15px;\n  border: none;\n  outline: none;\n  resize: none;\n  background-color: transparent;\n  color: #333;\n  font-family: 'Menlo', 'Consolas', monospace;\n  box-sizing: border-box;\n  overflow-y: auto;\n  font-size: 15px;\n  line-height: 1.7;\n}\n\n.editor-wysiwyg {\n  height: 100%;\n  overflow-y: auto;\n  padding: 15px;\n  outline: none;\n  word-wrap: break-word;\n  font-size: 15px;\n  line-height: 1.7;\n  width: 100%;\n  box-sizing: border-box;\n  border: none;\n  background-color: #fff;\n}\n\n.editor-wysiwyg:empty::before {\n  content: attr(data-placeholder);\n  color: #999;\n  pointer-events: none;\n}\n\n.editor-wysiwyg h1 {\n  font-size: 2em;\n  font-weight: bold;\n  margin-top: 0.67em;\n  margin-bottom: 0.67em;\n  border-bottom: 1px solid #eee;\n  padding-bottom: 0.3em;\n}\n\n.editor-wysiwyg h2 {\n  font-size: 1.5em;\n  font-weight: bold;\n  margin-top: 0.83em;\n  margin-bottom: 0.83em;\n  border-bottom: 1px solid #eee;\n  padding-bottom: 0.3em;\n}\n\n.editor-wysiwyg h3 {\n  font-size: 1.17em;\n  font-weight: bold;\n  margin-top: 1em;\n  margin-bottom: 1em;\n}\n\n.editor-wysiwyg p {\n  margin-bottom: 1em;\n}\n\n.editor-wysiwyg strong,\n.editor-wysiwyg b {\n  font-weight: bold;\n}\n\n.editor-wysiwyg em,\n.editor-wysiwyg i {\n  font-style: italic;\n}\n\n.editor-wysiwyg a {\n  color: #0366d6;\n  text-decoration: underline;\n}\n\n.editor-wysiwyg ul,\n.editor-wysiwyg ol {\n  margin-left: 20px;\n  margin-bottom: 1em;\n}\n\n.editor-wysiwyg li {\n  margin-bottom: 0.2em;\n}\n\n.editor-wysiwyg blockquote {\n  border-left: 3px solid #007bff;\n  margin-left: 0;\n  padding-left: 1em;\n  color: #555;\n  font-style: italic;\n  margin-bottom: 1em;\n}\n\n.editor-wysiwyg pre {\n  background-color: var(--toolbar-bg, #f0f0f0);\n  padding: 10px;\n  border-radius: 4px;\n  overflow-x: auto;\n  font-family: 'Menlo', 'Consolas', monospace;\n  font-size: 0.9em;\n  margin-bottom: 1em;\n  white-space: pre;\n}\n\n.editor-wysiwyg code {\n  font-family: 'Menlo', 'Consolas', monospace;\n  background-color: var(--toolbar-bg, #f0f0f0);\n  padding: 0.1em 0.3em;\n  border-radius: 3px;\n}\n\n.editor-wysiwyg table {\n  border-collapse: collapse;\n  width: 100%;\n  margin-bottom: 1em;\n  border: 1px solid #ddd;\n}\n\n.editor-wysiwyg th,\n.editor-wysiwyg td {\n  border: 1px solid #ddd;\n  padding: 8px 10px;\n  text-align: left;\n  min-width: 50px;\n}\n\n.editor-wysiwyg th {\n  background-color: var(--toolbar-bg, #f7f7f7);\n  font-weight: bold;\n}\n\n.editor-preview {\n  padding: 15px;\n  background-color: #fff;\n  color: #333;\n  line-height: 1.7;\n  overflow-y: auto;\n  max-height: 500px;\n  border-top: 1px solid #ddd;\n}\n\n/* Table Context Menu Styles */\n.table-context-menu {\n  position: fixed;\n  /*z-index: 1000;*/\n}\n\n.table-menu-content {\n  background: var(--button-bg, white);\n  border: 1px solid var(--border-color, #ddd);\n  border-radius: 6px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n  min-width: 180px;\n  padding: 4px 0;\n}\n\n.table-menu-item {\n  display: flex;\n  align-items: center;\n  padding: 8px 12px;\n  cursor: pointer;\n  font-size: 14px;\n  color: var(--text-color, #333);\n  background: var(--button-bg, white);\n  border: none;\n  width: 100%;\n  text-align: left;\n  gap: 8px;\n  transition: background-color 0.15s ease;\n}\n\n.table-menu-item:hover,\n.table-menu-item:focus {\n  background-color: var(--button-hover, #f5f5f5);\n  outline: none;\n}\n\n.table-menu-item.danger {\n  color: #dc3545;\n}\n\n.table-menu-item.danger:hover,\n.table-menu-item.danger:focus {\n  background-color: #ffeaea;\n}\n\n.table-menu-icon {\n  min-width: 16px;\n  text-align: center;\n  font-size: 12px;\n  opacity: 0.7;\n}\n\n.table-menu-label {\n  flex: 1;\n}\n\n.table-menu-separator {\n  height: 1px;\n  background-color: #eee;\n  margin: 4px 0;\n}\n\n/* Dropdown Menu Styles */\n.dropdown-menu-container {\n  position: fixed;\n  z-index: 1000;\n}\n\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 999;\n}\n\n.dropdown-menu-content {\n  background: var(--button-bg, #fff);\n  border: 1px solid var(--border-color, #ddd);\n  border-radius: 6px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n  min-width: 180px;\n  padding: 4px 0;\n  max-height: 300px;\n  overflow-y: auto;\n  position: relative;\n  z-index: 1001;\n}\n\n.dropdown-menu-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  cursor: pointer;\n  background: var(--button-bg, #fff);\n  border: none;\n  color: var(--text-color, #333);\n  text-align: left;\n  width: 100%;\n  font-size: 14px;\n  transition: background-color 0.15s ease;\n}\n\n.dropdown-menu-item:hover,\n.dropdown-menu-item:focus,\n.dropdown-menu-item.selected {\n  background-color: var(--button-hover, #f5f5f5);\n  outline: none;\n}\n\n.dropdown-menu-icon {\n  min-width: 16px;\n  text-align: center;\n  opacity: 0.7;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.dropdown-menu-icon svg {\n  width: 16px;\n  height: 16px;\n}\n\n.dropdown-menu-label {\n  flex: 1;\n  font-weight: 500;\n}\n\n.dropdown-menu-shortcut {\n  font-size: 12px;\n  opacity: 0.6;\n  font-family: monospace;\n}\n\n/* Toolbar button with dropdown indicator */\n.md-toolbar-button.has-dropdown {\n  position: relative;\n}\n\n.md-toolbar-button.has-dropdown::after {\n  content: '';\n  position: absolute;\n  right: 2px;\n  bottom: 2px;\n  width: 0;\n  height: 0;\n  border-left: 3px solid transparent;\n  border-right: 3px solid transparent;\n  border-top: 3px solid currentColor;\n  opacity: 0.6;\n}\n\n/* Dark theme support for dropdowns */\n.md-wysiwyg-editor-wrapper[data-theme='dark'] .dropdown-menu-content {\n  background: var(--button-bg);\n  border-color: var(--border-color);\n  color: var(--text-color);\n}\n\n.md-wysiwyg-editor-wrapper[data-theme='dark'] .dropdown-menu-item {\n  background: var(--button-bg);\n  color: var(--text-color);\n}\n\n.md-wysiwyg-editor-wrapper[data-theme='dark'] .dropdown-menu-item:hover,\n.md-wysiwyg-editor-wrapper[data-theme='dark'] .dropdown-menu-item:focus,\n.md-wysiwyg-editor-wrapper[data-theme='dark'] .dropdown-menu-item.selected {\n  background-color: var(--button-hover);\n}\n"],sourceRoot:""}]);let a=l},529:function(e){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n}).join("")},t.i=function(e,n,r,o,i){"string"==typeof e&&(e=[[null,e,void 0]]);var l={};if(r)for(var a=0;a<this.length;a++){var s=this[a][0];null!=s&&(l[s]=!0)}for(var d=0;d<e.length;d++){var c=[].concat(e[d]);r&&l[c[0]]||(void 0!==i&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=i),n&&(c[2]&&(c[1]="@media ".concat(c[2]," {").concat(c[1],"}")),c[2]=n),o&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=o):c[4]="".concat(o)),t.push(c))}},t}},947:function(e){e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(n))));return[t].concat(["/*# ".concat("sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r)," */")]).join("\n")}return[t].join("\n")}},302:function(e,t,n){var r=n(329);e.exports=function(e,t,n){var o=[],i=!1,l=-1;function a(){for(l=0;l<o.length;l+=2)try{e(o[l],r(o[l+1]),s)}catch(e){n.error(e)}l=-1}function s(){i||(i=!0,t(function(){i=!1,a()}))}return s.sync=a,{mount:function(t,n){if(null!=n&&null==n.view&&"function"!=typeof n)throw TypeError("m.mount expects a component, not a vnode.");var i=o.indexOf(t);i>=0&&(o.splice(i,2),i<=l&&(l-=2),e(t,[])),null!=n&&(o.push(t,n),e(t,r(n),s))},redraw:s}}},872:function(e,t,n){var r=n(329),o=n(970),i=n(743),l=n(652),a=n(288),s=n(345);function d(e){try{return decodeURIComponent(e)}catch(t){return e}}e.exports=function(e,t){var n,c,u,p,h,g,A,f,m=null==e?null:"function"==typeof e.setImmediate?e.setImmediate:e.setTimeout,b=Promise.resolve(),x=!1,y=!1,w=!1,k={onremove:function(){y=w=!1,e.removeEventListener("popstate",E,!1)},view:function(){var e=r(h,g.key,g);return p?p.render(e):[e]}},C=B.SKIP={};function v(){x=!1;var r=e.location.hash;"#"!==B.prefix[0]&&(r=e.location.search+r,"?"!==B.prefix[0]&&"/"!==(r=e.location.pathname+r)[0]&&(r="/"+r));var o=r.concat().replace(/(?:%[a-f89][a-f0-9])+/gim,d).slice(B.prefix.length),i=l(o);function a(e){console.error(e),B.set(u,null,{replace:!0})}Object.assign(i.params,e.history.state),function e(r){for(;r<c.length;r++)if(c[r].check(i)){var l=c[r].component,s=c[r].route,d=l,m=f=function(a){if(m===f){if(a===C)return e(r+1);h=null!=a&&("function"==typeof a.view||"function"==typeof a)?a:"div",g=i.params,A=o,f=null,p=l.render?l:null,w?t.redraw():(w=!0,t.mount(n,k))}};l.view||"function"==typeof l?(l={},m(d)):l.onmatch?b.then(function(){return l.onmatch(i.params,o,s)}).then(m,o===u?null:a):m();return}if(o===u)throw Error("Could not resolve default route "+u+".");B.set(u,null,{replace:!0})}(0)}function E(){x||(x=!0,m(v))}function B(t,r,o){if(!t)throw TypeError("DOM element being rendered to does not exist.");if(c=Object.keys(o).map(function(e){if("/"!==e[0])throw SyntaxError("Routes must start with a '/'.");if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.");return{route:e,component:o[e],check:a(e)}}),u=r,null!=r){var i=l(r);if(!c.some(function(e){return e.check(i)}))throw ReferenceError("Default route doesn't match any known routes.")}n=t,e.addEventListener("popstate",E,!1),y=!0,v()}return B.set=function(t,n,r){if(null!=f&&((r=r||{}).replace=!0),f=null,t=i(t,n),y){E();var o=r?r.state:null,l=r?r.title:null;r&&r.replace?e.history.replaceState(o,l,B.prefix+t):e.history.pushState(o,l,B.prefix+t)}else e.location.href=B.prefix+t},B.get=function(){return A},B.prefix="#!",B.Link={view:function(e){var t,n,r,l=o(e.attrs.selector||"a",s(e.attrs,["options","params","selector","onclick"]),e.children);return(l.attrs.disabled=!!l.attrs.disabled)?(l.attrs.href=null,l.attrs["aria-disabled"]="true"):(t=e.attrs.options,n=e.attrs.onclick,r=i(l.attrs.href,e.attrs.params),l.attrs.href=B.prefix+r,l.attrs.onclick=function(e){var o;"function"==typeof n?o=n.call(e.currentTarget,e):null==n||"object"!=typeof n||"function"==typeof n.handleEvent&&n.handleEvent(e),!1===o||e.defaultPrevented||0!==e.button&&0!==e.which&&1!==e.which||e.currentTarget.target&&"_self"!==e.currentTarget.target||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||(e.preventDefault(),e.redraw=!1,B.set(r,null,t))}),l}},B.param=function(e){return g&&null!=e?g[e]:g},B}},847:function(e,t,n){var r=n(970);r.trust=n(653),r.fragment=n(263),e.exports=r},114:function(e,t,n){var r=n(847),o=n(851),i=n(323),l=n(336),a=function(){return r.apply(this,arguments)};a.m=r,a.trust=r.trust,a.fragment=r.fragment,a.Fragment="[",a.mount=i.mount,a.route=n(487),a.render=n(932),a.redraw=i.redraw,a.request=o.request,a.parseQueryString=n(127),a.buildQueryString=n(60),a.parsePathname=n(652),a.buildPathname=n(743),a.vnode=n(329),a.censor=n(345),a.domFor=l.domFor,e.exports=a},323:function(e,t,n){var r=n(932);e.exports=n(302)(r,"undefined"!=typeof requestAnimationFrame?requestAnimationFrame:null,"undefined"!=typeof console?console:null)},743:function(e,t,n){var r=n(60);e.exports=function(e,t){if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.");if(null==t)return e;var n=e.indexOf("?"),o=e.indexOf("#"),i=o<0?e.length:o,l=e.slice(0,n<0?i:n),a={};Object.assign(a,t);var s=l.replace(/:([^\/\.-]+)(\.{3})?/g,function(e,n,r){return(delete a[n],null==t[n])?e:r?t[n]:encodeURIComponent(String(t[n]))}),d=s.indexOf("?"),c=s.indexOf("#"),u=c<0?s.length:c,p=s.slice(0,d<0?u:d);n>=0&&(p+=e.slice(n,i)),d>=0&&(p+=(n<0?"?":"&")+s.slice(d,u));var h=r(a);return h&&(p+=(n<0&&d<0?"?":"&")+h),o>=0&&(p+=e.slice(o)),c>=0&&(p+=(o<0?"":"&")+s.slice(c)),p}},288:function(e,t,n){var r=n(652);e.exports=function(e){var t=r(e),n=Object.keys(t.params),o=[],i=RegExp("^"+t.path.replace(/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,function(e,t,n){return null==t?"\\"+e:(o.push({k:t,r:"..."===n}),"..."===n)?"(.*)":"."===n?"([^/]+)\\.":"([^/]+)"+(n||"")})+"\\/?$");return function(e){for(var r=0;r<n.length;r++)if(t.params[n[r]]!==e.params[n[r]])return!1;if(!o.length)return i.test(e.path);var l=i.exec(e.path);if(null==l)return!1;for(var r=0;r<o.length;r++)e.params[o[r].k]=o[r].r?l[r+1]:decodeURIComponent(l[r+1]);return!0}}},652:function(e,t,n){var r=n(127);e.exports=function(e){var t=e.indexOf("?"),n=e.indexOf("#"),o=n<0?e.length:n,i=e.slice(0,t<0?o:t).replace(/\/{2,}/g,"/");return i?"/"!==i[0]&&(i="/"+i):i="/",{path:i,params:t<0?{}:r(e.slice(t+1,o))}}},60:function(e){e.exports=function(e){if("[object Object]"!==Object.prototype.toString.call(e))return"";var t=[];for(var n in e)!function e(n,r){if(Array.isArray(r))for(var o=0;o<r.length;o++)e(n+"["+o+"]",r[o]);else if("[object Object]"===Object.prototype.toString.call(r))for(var o in r)e(n+"["+o+"]",r[o]);else t.push(encodeURIComponent(n)+(null!=r&&""!==r?"="+encodeURIComponent(r):""))}(n,e[n]);return t.join("&")}},127:function(e){function t(e){try{return decodeURIComponent(e)}catch(t){return e}}e.exports=function(e){if(""===e||null==e)return{};"?"===e.charAt(0)&&(e=e.slice(1));for(var n=e.split("&"),r={},o={},i=0;i<n.length;i++){var l=n[i].split("="),a=t(l[0]),s=2===l.length?t(l[1]):"";"true"===s?s=!0:"false"===s&&(s=!1);var d=a.split(/\]\[?|\[/),c=o;a.indexOf("[")>-1&&d.pop();for(var u=0;u<d.length;u++){var p=d[u],h=d[u+1],g=""==h||!isNaN(parseInt(h,10));if(""===p){var a=d.slice(0,u).join();null==r[a]&&(r[a]=Array.isArray(c)?c.length:0),p=r[a]++}else if("__proto__"===p)break;if(u===d.length-1)c[p]=s;else{var A=Object.getOwnPropertyDescriptor(c,p);null!=A&&(A=A.value),null==A&&(c[p]=A=g?[]:{}),c=A}}}return o}},932:function(e,t,n){e.exports=n(367)("undefined"!=typeof window?window:null)},9:function(e,t,n){e.exports=new Map([[n(372),!0]])},336:function(e){var t=new WeakMap;e.exports={delayedRemoval:t,domFor:function*(e){var n=e.dom,r=e.domSize,o=t.get(n);if(null!=n)do{var i=n.nextSibling;t.get(n)===o&&(yield n,r--),n=i}while(r)}}},372:function(e){e.exports={}},263:function(e,t,n){var r=n(329),o=n(470);e.exports=function(e,...t){var n=o(e,t);return null==n.attrs&&(n.attrs={}),n.tag="[",n.children=r.normalizeChildren(n.children),n}},970:function(e,t,n){var r=n(329),o=n(470),i=n(239),l=n(372),a=n(9),s=/(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,d=Object.create(null);e.exports=function(e,t,...n){if(null==e||"string"!=typeof e&&"function"!=typeof e&&"function"!=typeof e.view)throw Error("The selector must be either a string or a component.");var c=o(t,n);return"string"==typeof e&&(c.children=r.normalizeChildren(c.children),"["!==e)?function(e,t){t.tag=e.tag;var n=t.attrs;if(null==n)return t.attrs=e.attrs,t.is=e.is,t;var r=i.call(n,"class"),o=r?n.class:n.className;return e.attrs!==l?(n=Object.assign({},e.attrs,n),(null!=o||null!=e.attrs.className)&&(n.className=null!=o?null!=e.attrs.className?String(e.attrs.className)+" "+String(o):o:e.attrs.className)):null!=o&&(n.className=o),r&&(n.class=null),"input"===e.tag&&i.call(n,"type")&&(n=Object.assign({type:n.type},n)),t.is=n.is,t.attrs=n,t}(d[e]||function(e){for(var t,n="div",r=[],o={},c=!0;t=s.exec(e);){var u=t[1],p=t[2];if(""===u&&""!==p)n=p;else if("#"===u)o.id=p;else if("."===u)r.push(p);else if("["===t[3][0]){var h,g=t[6];(g&&(g=g.replace(/\\(["'])/g,"$1").replace(/\\\\/g,"\\")),"class"===t[4])?r.push(g):(o[t[4]]=""===g?g:g||!0,("value"===(h=t[4])||"checked"===h||"selectedIndex"===h||"selected"===h)&&(c=!1))}}return r.length>0&&(o.className=r.join(" ")),!function(e){for(var t in e)if(i.call(e,t))return!1;return!0}(o)?a.set(o,c):o=l,d[e]={tag:n,attrs:o,is:o.is}}(e),c):(null==c.attrs&&(c.attrs={}),c.tag=e,c)}},470:function(e,t,n){var r=n(329);e.exports=function(e,t){return null!=e&&("object"!=typeof e||null!=e.tag||Array.isArray(e))?(t=0===t.length&&Array.isArray(e)?e:[e,...t],e=void 0):1===t.length&&Array.isArray(t[0])&&(t=t[0]),r("",e&&e.key,e,t)}},367:function(e,t,n){var r=n(329),o=n(336),i=o.delayedRemoval,l=o.domFor,a=n(9);e.exports=function(){var e,t,n,o={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"};function s(e){return e.ownerDocument}function d(e){return e.attrs&&e.attrs.xmlns||o[e.tag]}function c(e,t){if(e.state!==t)throw Error("'vnode.state' must not be modified.")}function u(e){var t=e.state;try{return this.apply(t,arguments)}finally{c(e,t)}}function p(e){try{return s(e).activeElement}catch(e){return null}}function h(e,t,n,r,o,i,l){for(var a=n;a<r;a++){var s=t[a];null!=s&&g(e,s,o,l,i)}}function g(e,t,n,o,i){var l,a,c,p,A,m,b,x,y=t.tag;if("string"==typeof y)switch(t.state={},null!=t.attrs&&N(t.attrs,t,n),y){case"#":l=e,a=t,c=i,a.dom=s(l).createTextNode(a.children),k(l,a.dom,c);break;case"<":f(e,t,o,i);break;case"[":var w=e,v=t,E=n,B=o,T=i,$=s(w).createDocumentFragment();if(null!=v.children){var R=v.children;h($,R,0,R.length,E,null,B)}v.dom=$.firstChild,v.domSize=$.childNodes.length,k(w,$,T);break;default:!function(e,t,n,r,o){var i=t.tag,l=t.attrs,a=t.is,c=(r=d(t)||r)?a?s(e).createElementNS(r,i,{is:a}):s(e).createElementNS(r,i):a?s(e).createElement(i,{is:a}):s(e).createElement(i);if(t.dom=c,null!=l&&function(e,t,n){for(var r in t)S(e,r,null,t[r],n)}(t,l,r),k(e,c,o),!C(t)&&null!=t.children){var u=t.children;h(c,u,0,u.length,n,null,r),"select"===t.tag&&null!=l&&function(e,t){if("value"in t)if(null===t.value)-1!==e.dom.selectedIndex&&(e.dom.value=null);else{var n=""+t.value;(e.dom.value!==n||-1===e.dom.selectedIndex)&&(e.dom.value=n)}"selectedIndex"in t&&S(e,"selectedIndex",null,t.selectedIndex,void 0)}(t,l)}}(e,t,n,o,i)}else{p=e,A=t,m=n,b=o,x=i,!function(e,t){var n;if("function"==typeof e.tag.view){if(e.state=Object.create(e.tag),null!=(n=e.state.view).$$reentrantLock$$)return;n.$$reentrantLock$$=!0}else{if(e.state=void 0,null!=(n=e.tag).$$reentrantLock$$)return;n.$$reentrantLock$$=!0,e.state=null!=e.tag.prototype&&"function"==typeof e.tag.prototype.view?new e.tag(e):e.tag(e)}if(N(e.state,e,t),null!=e.attrs&&N(e.attrs,e,t),e.instance=r.normalize(u.call(e.state.view,e)),e.instance===e)throw Error("A view cannot return the vnode it received as argument");n.$$reentrantLock$$=null}(A,m),null!=A.instance?(g(p,A.instance,m,b,x),A.dom=A.instance.dom,A.domSize=null!=A.dom?A.instance.domSize:0):A.domSize=0}}var A={caption:"table",thead:"table",tbody:"table",tfoot:"table",tr:"tbody",th:"tr",td:"tr",colgroup:"table",col:"colgroup"};function f(e,t,n,r){var o,i=t.children.match(/^\s*?<(\w+)/im)||[],l=s(e).createElement(A[i[1]]||"div");"http://www.w3.org/2000/svg"===n?(l.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+t.children+"</svg>",l=l.firstChild):l.innerHTML=t.children,t.dom=l.firstChild,t.domSize=l.childNodes.length;for(var a=s(e).createDocumentFragment();o=l.firstChild;)a.appendChild(o);k(e,a,r)}function m(e,t,n,r,o,i){if(t!==n&&(null!=t||null!=n))if(null==t||0===t.length)h(e,n,0,n.length,r,o,i);else if(null==n||0===n.length)v(e,t,0,t.length);else{var l=null!=t[0]&&null!=t[0].key,a=null!=n[0]&&null!=n[0].key,s=0,d=0;if(!l)for(;d<t.length&&null==t[d];)d++;if(!a)for(;s<n.length&&null==n[s];)s++;if(l!==a)v(e,t,d,t.length),h(e,n,s,n.length,r,o,i);else if(a){for(var c,u,p,A,f,m,k=t.length-1,C=n.length-1;k>=d&&C>=s&&(A=t[k],f=n[C],A.key===f.key);)A!==f&&b(e,A,f,r,o,i),null!=f.dom&&(o=f.dom),k--,C--;for(;k>=d&&C>=s&&(u=t[d],p=n[s],u.key===p.key);)d++,s++,u!==p&&b(e,u,p,r,y(t,d,o),i);for(;k>=d&&C>=s&&s!==C&&u.key===f.key&&A.key===p.key;)w(e,A,m=y(t,d,o)),A!==p&&b(e,A,p,r,m,i),++s<=--C&&w(e,u,o),u!==f&&b(e,u,f,r,o,i),null!=f.dom&&(o=f.dom),d++,A=t[--k],f=n[C],u=t[d],p=n[s];for(;k>=d&&C>=s&&A.key===f.key;)A!==f&&b(e,A,f,r,o,i),null!=f.dom&&(o=f.dom),k--,C--,A=t[k],f=n[C];if(s>C)v(e,t,d,k+1);else if(d>k)h(e,n,s,C+1,r,o,i);else{var c,E,B=o,$=C-s+1,S=Array($),R=0,z=0,M=0x7fffffff,L=0;for(z=0;z<$;z++)S[z]=-1;for(z=C;z>=s;z--){null==c&&(c=function(e,t,n){for(var r=Object.create(null);t<n;t++){var o=e[t];if(null!=o){var i=o.key;null!=i&&(r[i]=t)}}return r}(t,d,k+1));var I=c[(f=n[z]).key];null!=I&&(M=I<M?I:-1,S[z-s]=I,A=t[I],t[I]=null,A!==f&&b(e,A,f,r,o,i),null!=f.dom&&(o=f.dom),L++)}if(o=B,L!==k-d+1&&v(e,t,d,k+1),0===L)h(e,n,s,C+1,r,o,i);else if(-1===M)for(R=(E=function(e){for(var t=[0],n=0,r=0,o=0,i=x.length=e.length,o=0;o<i;o++)x[o]=e[o];for(var o=0;o<i;++o)if(-1!==e[o]){var l=t[t.length-1];if(e[l]<e[o]){x[o]=l,t.push(o);continue}for(n=0,r=t.length-1;n<r;){var a=(n>>>1)+(r>>>1)+(n&r&1);e[t[a]]<e[o]?n=a+1:r=a}e[o]<e[t[n]]&&(n>0&&(x[o]=t[n-1]),t[n]=o)}for(n=t.length,r=t[n-1];n-- >0;)t[n]=r,r=x[r];return x.length=0,t}(S)).length-1,z=C;z>=s;z--)p=n[z],-1===S[z-s]?g(e,p,r,i,o):E[R]===z-s?R--:w(e,p,o),null!=p.dom&&(o=n[z].dom);else for(z=C;z>=s;z--)p=n[z],-1===S[z-s]&&g(e,p,r,i,o),null!=p.dom&&(o=n[z].dom)}}else{var N=t.length<n.length?t.length:n.length;for(s=s<d?s:d;s<N;s++)(u=t[s])!==(p=n[s])&&(null!=u||null!=p)&&(null==u?g(e,p,r,i,y(t,s+1,o)):null==p?T(e,u):b(e,u,p,r,y(t,s+1,o),i));t.length>N&&v(e,t,s,t.length),n.length>N&&h(e,n,s,n.length,r,o,i)}}}function b(e,t,n,o,i,l){var s=t.tag;if(s===n.tag&&t.is===n.is){if(n.state=t.state,n.events=t.events,function(e,t){do{if(null!=e.attrs&&"function"==typeof e.attrs.onbeforeupdate){var n=u.call(e.attrs.onbeforeupdate,e,t);if(void 0!==n&&!n)break}if("string"!=typeof e.tag&&"function"==typeof e.state.onbeforeupdate){var n=u.call(e.state.onbeforeupdate,e,t);if(void 0!==n&&!n)break}return!1}while(!1);return e.dom=t.dom,e.domSize=t.domSize,e.instance=t.instance,e.attrs=t.attrs,e.children=t.children,e.text=t.text,!0}(n,t))return;if("string"==typeof s)switch(null!=n.attrs&&H(n.attrs,n,o),s){case"#":c=t,h=n,c.children.toString()!==h.children.toString()&&(c.dom.nodeValue=h.children),h.dom=c.dom;break;case"<":A=e,x=t,y=n,w=l,k=i,x.children!==y.children?($(A,x),f(A,y,w,k)):(y.dom=x.dom,y.domSize=x.domSize);break;case"[":var c,h,A,x,y,w,k,v,E,B,L,N,O=e,j=t,_=n,q=o,P=i,D=l;m(O,j.children,_.children,q,P,D);var W=0,Y=_.children;if(_.dom=null,null!=Y){for(var Z=0;Z<Y.length;Z++){var U=Y[Z];null!=U&&null!=U.dom&&(null==_.dom&&(_.dom=U.dom),W+=U.domSize||1)}1!==W&&(_.domSize=W)}break;default:v=t,E=n,B=o,L=l,N=E.dom=v.dom,L=d(E)||L,v.attrs==E.attrs&&(null==E.attrs||a.get(E.attrs))||function(e,t,n,r){var o;if(null!=t)for(var i in t!==n||a.has(n)||console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major"),t)null!=(o=t[i])&&(null==n||null==n[i])&&function(e,t,n,r){if(!("key"===t||null==n||R(t)))if("o"===t[0]&&"n"===t[1])I(e,t,void 0);else if("style"===t)M(e.dom,n,null);else if(z(e,t,r)&&"className"!==t&&"title"!==t&&("value"!==t||"option"!==e.tag&&("select"!==e.tag||-1!==e.dom.selectedIndex||e.dom!==p(e.dom)))&&("input"!==e.tag||"type"!==t))e.dom[t]=null;else{var o=t.indexOf(":");-1!==o&&(t=t.slice(o+1)),!1!==n&&e.dom.removeAttribute("className"===t?"class":t)}}(e,i,o,r);if(null!=n)for(var i in n)S(e,i,t&&t[i],n[i],r)}(E,v.attrs,E.attrs,L),C(E)||m(N,v.children,E.children,B,null,L)}else{var V=e,F=t,X=n,Q=o,K=i,G=l;if(X.instance=r.normalize(u.call(X.state.view,X)),X.instance===X)throw Error("A view cannot return the vnode it received as argument");H(X.state,X,Q),null!=X.attrs&&H(X.attrs,X,Q),null!=X.instance?(null==F.instance?g(V,X.instance,Q,G,K):b(V,F.instance,X.instance,Q,K,G),X.dom=X.instance.dom,X.domSize=X.instance.domSize):null!=F.instance?(T(V,F.instance),X.dom=void 0,X.domSize=0):(X.dom=F.dom,X.domSize=F.domSize)}}else T(e,t),g(e,n,o,l,i)}var x=[];function y(e,t,n){for(;t<e.length;t++)if(null!=e[t]&&null!=e[t].dom)return e[t].dom;return n}function w(e,t,n){if(null!=t.dom){var r;if(null==t.domSize)r=t.dom;else for(var o of(r=s(e).createDocumentFragment(),l(t)))r.appendChild(o);k(e,r,n)}}function k(e,t,n){null!=n?e.insertBefore(t,n):e.appendChild(t)}function C(e){if(null==e.attrs||null==e.attrs.contenteditable&&null==e.attrs.contentEditable)return!1;var t=e.children;if(null!=t&&1===t.length&&"<"===t[0].tag){var n=t[0].children;e.dom.innerHTML!==n&&(e.dom.innerHTML=n)}else if(null!=t&&0!==t.length)throw Error("Child node of a contenteditable must be trusted.");return!0}function v(e,t,n,r){for(var o=n;o<r;o++){var i=t[o];null!=i&&T(e,i)}}function E(e,n,r,o){var a=n.state,s=u.call(r.onbeforeremove,n);if(null!=s){var d=t;for(var p of l(n))i.set(p,d);o.v++,Promise.resolve(s).finally(function(){c(n,a),B(e,n,o)})}}function B(e,t,n){0==--n.v&&(function e(t){if("string"!=typeof t.tag&&"function"==typeof t.state.onremove&&u.call(t.state.onremove,t),t.attrs&&"function"==typeof t.attrs.onremove&&u.call(t.attrs.onremove,t),"string"!=typeof t.tag)null!=t.instance&&e(t.instance);else{null!=t.events&&(t.events._=null);var n=t.children;if(Array.isArray(n))for(var r=0;r<n.length;r++){var o=n[r];null!=o&&e(o)}}}(t),$(e,t))}function T(e,t){var n={v:1};"string"!=typeof t.tag&&"function"==typeof t.state.onbeforeremove&&E(e,t,t.state,n),t.attrs&&"function"==typeof t.attrs.onbeforeremove&&E(e,t,t.attrs,n),B(e,t,n)}function $(e,t){if(null!=t.dom)if(null==t.domSize)e.removeChild(t.dom);else for(var n of l(t))e.removeChild(n)}function S(e,t,n,r,o){var i,l;if(!("key"===t||null==r||R(t))&&(n!==r||(i=e,"value"===(l=t)||"checked"===l||"selectedIndex"===l||"selected"===l&&(i.dom===p(i.dom)||"option"===i.tag&&i.dom.parentNode===p(i.dom)))||"object"==typeof r)){if("o"===t[0]&&"n"===t[1])return I(e,t,r);if("xlink:"===t.slice(0,6))e.dom.setAttributeNS("http://www.w3.org/1999/xlink",t.slice(6),r);else if("style"===t)M(e.dom,n,r);else if(z(e,t,o)){if("value"===t){if(("input"===e.tag||"textarea"===e.tag)&&e.dom.value===""+r||"select"===e.tag&&null!==n&&e.dom.value===""+r||"option"===e.tag&&null!==n&&e.dom.value===""+r)return;if("input"===e.tag&&"file"===e.attrs.type&&""+r!="")return void console.error("`value` is read-only on file inputs!")}"input"===e.tag&&"type"===t?e.dom.setAttribute(t,r):e.dom[t]=r}else"boolean"==typeof r?r?e.dom.setAttribute(t,""):e.dom.removeAttribute(t):e.dom.setAttribute("className"===t?"class":t,r)}}function R(e){return"oninit"===e||"oncreate"===e||"onupdate"===e||"onremove"===e||"onbeforeremove"===e||"onbeforeupdate"===e}function z(e,t,n){return void 0===n&&(e.tag.indexOf("-")>-1||e.is||"href"!==t&&"list"!==t&&"form"!==t&&"width"!==t&&"height"!==t)&&t in e.dom}function M(e,t,n){if(t===n);else if(null==n)e.style="";else if("object"!=typeof n)e.style=n;else if(null==t||"object"!=typeof t)for(var r in e.style="",n){var o=n[r];null!=o&&(r.includes("-")?e.style.setProperty(r,String(o)):e.style[r]=String(o))}else{for(var r in t)null!=t[r]&&null==n[r]&&(r.includes("-")?e.style.removeProperty(r):e.style[r]="");for(var r in n){var o=n[r];null!=o&&(o=String(o))!==String(t[r])&&(r.includes("-")?e.style.setProperty(r,o):e.style[r]=o)}}}function L(){this._=e}function I(t,n,r){null!=t.events?(t.events._=e,t.events[n]!==r&&(null!=r&&("function"==typeof r||"object"==typeof r)?(null==t.events[n]&&t.dom.addEventListener(n.slice(2),t.events,!1),t.events[n]=r):(null!=t.events[n]&&t.dom.removeEventListener(n.slice(2),t.events,!1),t.events[n]=void 0))):null!=r&&("function"==typeof r||"object"==typeof r)&&(t.events=new L,t.dom.addEventListener(n.slice(2),t.events,!1),t.events[n]=r)}function N(e,t,n){"function"==typeof e.oninit&&u.call(e.oninit,t),"function"==typeof e.oncreate&&n.push(u.bind(e.oncreate,t))}function H(e,t,n){"function"==typeof e.onupdate&&n.push(u.bind(e.onupdate,t))}return L.prototype=Object.create(null),L.prototype.handleEvent=function(e){var t,n=this["on"+e.type];"function"==typeof n?t=n.call(e.currentTarget,e):"function"==typeof n.handleEvent&&n.handleEvent(e);var r=this;null!=r._&&(!1!==e.redraw&&(0,r._)(),null!=t&&"function"==typeof t.then&&Promise.resolve(t).then(function(){null!=r._&&!1!==e.redraw&&(0,r._)()})),!1===t&&(e.preventDefault(),e.stopPropagation())},function(o,i,l){if(!o)throw TypeError("DOM element being rendered to does not exist.");if(null!=n&&o.contains(n))throw TypeError("Node is currently being rendered to and thus is locked.");var a=e,s=n,d=[],c=p(o),u=o.namespaceURI;n=o,e="function"==typeof l?l:void 0,t={};try{null==o.vnodes&&(o.textContent=""),i=r.normalizeChildren(Array.isArray(i)?i:[i]),m(o,o.vnodes,i,d,null,"http://www.w3.org/1999/xhtml"===u?void 0:u),o.vnodes=i,null!=c&&p(o)!==c&&"function"==typeof c.focus&&c.focus();for(var h=0;h<d.length;h++)d[h]()}finally{e=a,n=s}}}},653:function(e,t,n){var r=n(329);e.exports=function(e){return null==e&&(e=""),r("<",void 0,void 0,e,void 0,void 0)}},329:function(e){function t(e,t,n,r,o,i){return{tag:e,key:t,attrs:n,children:r,text:o,dom:i,is:void 0,domSize:void 0,state:void 0,events:void 0,instance:void 0}}t.normalize=function(e){return Array.isArray(e)?t("[",void 0,void 0,t.normalizeChildren(e),void 0,void 0):null==e||"boolean"==typeof e?null:"object"==typeof e?e:t("#",void 0,void 0,String(e),void 0,void 0)},t.normalizeChildren=function(e){var n=[];if(e.length){for(var r=null!=e[0]&&null!=e[0].key,o=1;o<e.length;o++)if((null!=e[o]&&null!=e[o].key)!==r)throw TypeError(r&&(null==e[o]||"boolean"==typeof e[o])?"In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole.":"In fragments, vnodes must either all have keys or none have keys.");for(var o=0;o<e.length;o++)n[o]=t.normalize(e[o])}return n},e.exports=t},851:function(e,t,n){var r=n(323);e.exports=n(841)("undefined"!=typeof window?window:null,r.redraw)},841:function(e,t,n){var r=n(743),o=n(239);e.exports=function(e,t){function n(e){return new Promise(e)}function i(e,t){for(var n in e.headers)if(o.call(e.headers,n)&&n.toLowerCase()===t)return!0;return!1}return n.prototype=Promise.prototype,n.__proto__=Promise,{request:function(l,a){"string"!=typeof l?(a=l,l=l.url):null==a&&(a={});var s,d,c=(s=l,d=a,new Promise(function(t,n){s=r(s,d.params);var l,a=null!=d.method?d.method.toUpperCase():"GET",c=d.body,u=(null==d.serialize||d.serialize===JSON.serialize)&&!(c instanceof e.FormData||c instanceof e.URLSearchParams),p=d.responseType||("function"==typeof d.extract?"":"json"),h=new e.XMLHttpRequest,g=!1,A=!1,f=h,m=h.abort;for(var b in h.abort=function(){g=!0,m.call(this)},h.open(a,s,!1!==d.async,"string"==typeof d.user?d.user:void 0,"string"==typeof d.password?d.password:void 0),u&&null!=c&&!i(d,"content-type")&&h.setRequestHeader("Content-Type","application/json; charset=utf-8"),"function"==typeof d.deserialize||i(d,"accept")||h.setRequestHeader("Accept","application/json, text/*"),d.withCredentials&&(h.withCredentials=d.withCredentials),d.timeout&&(h.timeout=d.timeout),h.responseType=p,d.headers)o.call(d.headers,b)&&h.setRequestHeader(b,d.headers[b]);h.onreadystatechange=function(e){if(!g&&4===e.target.readyState)try{var r,o=e.target.status>=200&&e.target.status<300||304===e.target.status||/^file:\/\//i.test(s),i=e.target.response;if("json"===p){if(!e.target.responseType&&"function"!=typeof d.extract)try{i=JSON.parse(e.target.responseText)}catch(e){i=null}}else p&&"text"!==p||null!=i||(i=e.target.responseText);if("function"==typeof d.extract?(i=d.extract(e.target,d),o=!0):"function"==typeof d.deserialize&&(i=d.deserialize(i)),o){if("function"==typeof d.type)if(Array.isArray(i))for(var l=0;l<i.length;l++)i[l]=new d.type(i[l]);else i=new d.type(i);t(i)}else{var a=function(){try{r=e.target.responseText}catch(e){r=i}var t=Error(r);t.code=e.target.status,t.response=i,n(t)};0===h.status?setTimeout(function(){A||a()}):a()}}catch(e){n(e)}},h.ontimeout=function(e){A=!0;var t=Error("Request timed out");t.code=e.target.status,n(t)},"function"==typeof d.config&&(h=d.config(h,d,s)||h)!==f&&(l=h.abort,h.abort=function(){g=!0,l.call(this)}),null==c?h.send():"function"==typeof d.serialize?h.send(d.serialize(c)):c instanceof e.FormData||c instanceof e.URLSearchParams?h.send(c):h.send(JSON.stringify(c))}));if(!0===a.background)return c;var u=0;function p(){0==--u&&"function"==typeof t&&t()}return function e(t){var r=t.then;return t.constructor=n,t.then=function(){u++;var n=r.apply(t,arguments);return n.then(p,function(e){if(p(),0===u)throw e}),e(n)},t}(c)}}}},487:function(e,t,n){var r=n(323);e.exports=n(872)("undefined"!=typeof window?window:null,r)},345:function(e,t,n){var r=n(239),o=RegExp("^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$");e.exports=function(e,t){var n={};if(null!=t)for(var i in e)r.call(e,i)&&!o.test(i)&&0>t.indexOf(i)&&(n[i]=e[i]);else for(var i in e)r.call(e,i)&&!o.test(i)&&(n[i]=e[i]);return n}},239:function(e){e.exports=({}).hasOwnProperty},450:function(e){var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var o={},i=[],l=0;l<e.length;l++){var a=e[l],s=r.base?a[0]+r.base:a[0],d=o[s]||0,c="".concat(s," ").concat(d);o[s]=d+1;var u=n(c),p={css:a[1],media:a[2],sourceMap:a[3],supports:a[4],layer:a[5]};if(-1!==u)t[u].references++,t[u].updater(p);else{var h=function(e,t){var n=t.domAPI(t);return n.update(e),function(t){t?(t.css!==e.css||t.media!==e.media||t.sourceMap!==e.sourceMap||t.supports!==e.supports||t.layer!==e.layer)&&n.update(e=t):n.remove()}}(p,r);r.byIndex=l,t.splice(l,0,{identifier:c,updater:h,references:1})}i.push(c)}return i}e.exports=function(e,o){var i=r(e=e||[],o=o||{});return function(e){e=e||[];for(var l=0;l<i.length;l++){var a=n(i[l]);t[a].references--}for(var s=r(e,o),d=0;d<i.length;d++){var c=n(i[d]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}i=s}}},265:function(e){var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},238:function(e){e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},962:function(e,t,n){e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},683:function(e){e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){var r,o,i;r="",n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {")),(o=void 0!==n.layer)&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}"),(i=n.sourceMap)&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(r,t,e.options)},remove:function(){var e;null===(e=t).parentNode||e.parentNode.removeChild(e)}}}},971:function(e){e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,n.rv=()=>"1.5.6",n.ruid="bundler=rspack@1.5.6",(()=>{var e=n(114),t=n.n(e);let r=[{name:"paragraph",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 6V2H8c-1 0-2 1-2 2v8c0 1 1 2 2 2h4V8h8m-8 8v6"/></svg>',title:"Paragraph",action:"paragraph",shortcut:"Ctrl+0"},{name:"heading-1",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4V20 M18 4V20 M6 12H18"/><text x="20" y="8" font-size="4" fill="currentColor">1</text></svg>',title:"Heading 1",action:"heading-1",shortcut:"Ctrl+1"},{name:"heading-2",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4V20 M18 4V20 M6 12H18"/><text x="20" y="8" font-size="4" fill="currentColor">2</text></svg>',title:"Heading 2",action:"heading-2",shortcut:"Ctrl+2"},{name:"heading-3",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4V20 M18 4V20 M6 12H18"/><text x="20" y="8" font-size="4" fill="currentColor">3</text></svg>',title:"Heading 3",action:"heading-3",shortcut:"Ctrl+3"},{name:"heading-4",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4V20 M18 4V20 M6 12H18"/><text x="20" y="8" font-size="4" fill="currentColor">4</text></svg>',title:"Heading 4",action:"heading-4",shortcut:"Ctrl+4"},{name:"heading-5",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4V20 M18 4V20 M6 12H18"/><text x="20" y="8" font-size="4" fill="currentColor">5</text></svg>',title:"Heading 5",action:"heading-5",shortcut:"Ctrl+5"},{name:"heading-6",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4V20 M18 4V20 M6 12H18"/><text x="20" y="8" font-size="4" fill="currentColor">6</text></svg>',title:"Heading 6",action:"heading-6",shortcut:"Ctrl+6"}],o=[[{name:"heading-dropdown",icon:'<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M6 4V20 M18 4V20 M6 12H18"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"/></svg>',title:"Heading",action:"toggleHeading",dropdown:r,shortcut:"Ctrl+H"}],[{name:"bold",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>',title:"Bold",action:"bold",shortcut:"Ctrl+B",toggle:!0},{name:"italic",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>',title:"Italic",action:"italic",shortcut:"Ctrl+I",toggle:!0},{name:"strikethrough",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/></svg>',title:"Strikethrough",action:"strikethrough",shortcut:"Ctrl+U",toggle:!0}],[{name:"link",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',title:"Insert Link",action:"link",shortcut:"Ctrl+K",modal:!0},{name:"inline-code",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.75 4.75L9 19.25"/><path d="M15.25 4.75L13.5 19.25"/><path d="M19.25 7.5L22 10.5L19.25 13.5"/><path d="M4.75 7.5L2 10.5L4.75 13.5"/></svg>',title:"Inline Code",action:"inlineCode",shortcut:"Ctrl+`",toggle:!0},{name:"code-block",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>',title:"Code Block",action:"codeBlock",shortcut:"Ctrl+Shift+`"}],[{name:"unordered-list",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>',title:"Bullet List",action:"unorderedList",shortcut:"Ctrl+L",toggle:!0},{name:"ordered-list",icon:'<svg viewBox="0 0 24 24" fill="none"><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="10" y1="6" x2="22" y2="6"/><line x1="10" y1="12" x2="22" y2="12"/><line x1="10" y1="18" x2="22" y2="18"/></g><g fill="currentColor" font-family="sans-serif" font-size="6" text-anchor="middle" dominant-baseline="middle"><text x="5" y="6.5">1</text><text x="5" y="12.5">2</text><text x="5" y="18.5">3</text></g></svg>',title:"Numbered List",action:"orderedList",shortcut:"Ctrl+Shift+L",toggle:!0},{name:"checklist",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,11 12,14 22,4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',title:"Task List",action:"taskList",shortcut:"Ctrl+Shift+T",toggle:!0},{name:"outdent",icon:'<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 8 3 12 7 16"></polyline><line x1="21" y1="12" x2="3" y2="12"></line><line x1="21" y1="5" x2="9" y2="5"></line><line x1="21" y1="19" x2="9" y2="19"></line></svg>',title:"Decrease Indent",action:"outdent",shortcut:"Shift+Tab"},{name:"indent",icon:'<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 8 21 12 17 16"></polyline><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="5" x2="15" y2="5"></line><line x1="3" y1="19" x2="15" y2="19"></line></svg>',title:"Increase Indent",action:"indent",shortcut:"Tab"}],[{name:"blockquote",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>',title:"Quote",action:"blockquote",shortcut:"Ctrl+Q",toggle:!0},{name:"horizontal-rule",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="12" x2="20" y2="12"/></svg>',title:"Horizontal Rule",action:"horizontalRule",shortcut:"Ctrl+R"}],[{name:"image",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',title:"Insert Image",action:"image",shortcut:"Ctrl+G",modal:!0},{name:"table",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>',title:"Insert Table",action:"table",shortcut:"Ctrl+T",modal:!0}],[{name:"undo",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',title:"Undo",action:"undo",shortcut:"Ctrl+Z"},{name:"redo",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',title:"Redo",action:"redo",shortcut:"Ctrl+Y"},{name:"clear-format",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><line x1="2" y1="2" x2="22" y2="22"/></svg>',title:"Clear Formatting",action:"removeFormat"}]],i=e=>({start:e.selectionStart,end:e.selectionEnd,text:e.value.substring(e.selectionStart,e.selectionEnd)}),l=(e,t,n=0,r=0)=>{let{start:o,end:l}=i(e),a=e.value,s=a.slice(0,o)+t+a.slice(l);return e.value=s,e.setSelectionRange(o+n,o+t.length+r),e.focus(),s},a=(e,t,n,r)=>{let o=i(e);return l(e,t+(o.text||r||"")+n,o.text?0:t.length,o.text?0:-n.length)},s=(e,t)=>{let n=i(e);if(n.text)return n.text.split("\n").every(e=>e.startsWith(t));let{value:r,selectionStart:o}=e,l=r.lastIndexOf("\n",o-1)+1,a=r.indexOf("\n",o);return r.slice(l,-1===a?void 0:a).startsWith(t)},d=e=>{let{value:t,selectionStart:n}=e,r=t.lastIndexOf("\n",n-1)+1,o=t.indexOf("\n",n),i=-1===o?t.length:o;return{line:t.slice(r,i),start:r,end:i}},c=(e,t)=>{let{start:n,end:r}=d(e),o=e.value,i=o.slice(0,n)+t+o.slice(r);return e.value=i,e.setSelectionRange(n+t.length,n+t.length),e.focus(),i},u=e=>t=>{let{line:n}=d(t),r=/^-\s/.test(n),o=/^\d+\.\s/.test(n);if("unordered"===e)if(r)return c(t,n.slice(2));else if(o)return c(t,n.replace(/^\d+\.\s/,"- "));else return c(t,n?`- ${n}`:"- List item");return o?c(t,n.replace(/^\d+\.\s/,"")):r?c(t,n.replace(/^-\s/,"1. ")):c(t,n?`1. ${n}`:"1. List item")},p=(e,t,n)=>{i(e);let{value:r,selectionStart:o,selectionEnd:l}=e,a=r.slice(Math.max(0,o-t.length),o),s=r.slice(l,l+n.length);return a===t&&s===n},h=(e,t,n)=>{e.focus();let r=document.getSelection();return r&&r.rangeCount>0&&r.getRangeAt(0),document.execCommand(t,!1,n),e.innerHTML},g=()=>{let e=document.getSelection();if(!e||0===e.rangeCount)return null;let t=e.getRangeAt(0).commonAncestorContainer;for(;t&&t!==document.body;){if(t.nodeType===Node.ELEMENT_NODE){let e=t;if("TABLE"===e.tagName)return e;if("TD"===e.tagName||"TH"===e.tagName)return e.closest("table")}t=t.parentNode}return null},A=()=>{let e=document.getSelection();if(!e||0===e.rangeCount)return null;let t=e.getRangeAt(0).commonAncestorContainer;for(;t&&t!==document.body;){if(t.nodeType===Node.ELEMENT_NODE){let e=t;if("TD"===e.tagName||"TH"===e.tagName)return e}t=t.parentNode}return null},f=e=>{let t=e.closest("tr");return{row:Array.from(e.closest("table").rows).indexOf(t),col:Array.from(t.cells).indexOf(e)}},m=[{key:"b",ctrl:!0,action:"bold",description:"Bold text"},{key:"i",ctrl:!0,action:"italic",description:"Italic text"},{key:"u",ctrl:!0,action:"strikethrough",description:"Strikethrough text"},{key:"`",ctrl:!0,action:"inlineCode",description:"Inline code"},{key:"1",ctrl:!0,action:"heading-1",description:"Heading 1"},{key:"2",ctrl:!0,action:"heading-2",description:"Heading 2"},{key:"3",ctrl:!0,action:"heading-3",description:"Heading 3"},{key:"4",ctrl:!0,action:"heading-4",description:"Heading 4"},{key:"5",ctrl:!0,action:"heading-5",description:"Heading 5"},{key:"6",ctrl:!0,action:"heading-6",description:"Heading 6"},{key:"0",ctrl:!0,action:"paragraph",description:"Paragraph"},{key:"l",ctrl:!0,action:"unorderedList",description:"Unordered list"},{key:"l",ctrl:!0,shift:!0,action:"orderedList",description:"Ordered list"},{key:"Tab",action:"indent",description:"Indent"},{key:"Tab",shift:!0,action:"outdent",description:"Outdent"},{key:"]",ctrl:!0,action:"indent",description:"Indent"},{key:"[",ctrl:!0,action:"outdent",description:"Outdent"},{key:"q",ctrl:!0,action:"blockquote",description:"Blockquote"},{key:"k",ctrl:!0,action:"link",description:"Insert link"},{key:"g",ctrl:!0,action:"image",description:"Insert image"},{key:"t",ctrl:!0,action:"table",description:"Insert table"},{key:"r",ctrl:!0,action:"horizontalRule",description:"Horizontal rule"},{key:"`",ctrl:!0,shift:!0,action:"codeBlock",description:"Code block"},{key:"z",ctrl:!0,action:"undo",description:"Undo"},{key:"z",ctrl:!0,shift:!0,action:"redo",description:"Redo"},{key:"y",ctrl:!0,action:"redo",description:"Redo"},{key:"a",ctrl:!0,action:"selectAll",description:"Select all"},{key:"m",ctrl:!0,action:"toggleMode",description:"Toggle mode"},{key:"p",ctrl:!0,action:"togglePreview",description:"Toggle preview"}],b=m.map(e=>({...e,ctrl:!1,meta:e.ctrl}));class x{constructor(e){this.mode="wysiwyg",this.textarea=null,this.contentEditable=null,this.onContentChange=e}setOnContentChange(e){this.onContentChange=e}setTextarea(e){this.textarea=e,this.setupKeyboardHandlers(e)}getTextarea(){return this.textarea}setContentEditable(e){this.contentEditable=e,this.setupKeyboardHandlers(e)}setMode(e){this.mode=e}executeAndNotify(e){var t;try{let n=e();null==(t=this.onContentChange)||t.call(this,n)}catch(e){console.error("Editor action failed:",e)}}setupKeyboardHandlers(e){let t=t=>{var n,r;if(!((e,t,n=m)=>{let r=((e,t=m)=>t.find(t=>((e,t)=>{var n,r,o,i;if(e.key.toLowerCase()!==t.key.toLowerCase())return!1;let l=(null!=(n=t.ctrl)&&n)===e.ctrlKey,a=(null!=(r=t.alt)&&r)===e.altKey,s=(null!=(o=t.shift)&&o)===e.shiftKey,d=(null!=(i=t.meta)&&i)===e.metaKey;return l&&a&&s&&d})(e,t))||null)(e,n);return!!r&&(e.preventDefault(),e.stopPropagation(),t(r.action),!0)})(t,e=>this.executeAction(e),"undefined"!=typeof navigator&&/Mac|iPhone|iPad|iPod/.test(navigator.platform)?b:m)&&"markdown"===this.mode&&e instanceof HTMLTextAreaElement){if("Tab"===t.key){((e,t,n=!1)=>{if(t instanceof HTMLTextAreaElement){let{value:r,selectionStart:o}=t,i=r.lastIndexOf("\n",o-1)+1,l=r.indexOf("\n",o),a=r.slice(i,-1===l?void 0:l),s=/^\s*[-*+]\s/.test(a)||/^\s*\d+\.\s/.test(a),d=(r.slice(0,o).match(/```/g)||[]).length%2==1;if(s||d){if(e.preventDefault(),n){let e=a.match(/^(\s+)/);if(e){let n=e[1],s=(n.length>=2?n.slice(2):"")+a.slice(n.length);t.value=r.slice(0,i)+s+r.slice(-1===l?void 0:l),t.setSelectionRange(o-Math.min(2,n.length),o-Math.min(2,n.length))}}else{let e=a.replace(/^(\s*)/,"$1  ");t.value=r.slice(0,i)+e+r.slice(-1===l?void 0:l),t.setSelectionRange(o+2,o+2)}return!0}}return!1})(t,e,t.shiftKey)&&(null==(n=this.onContentChange)||n.call(this,e.value));return}if("Enter"===t.key){((e,t)=>{let{value:n,selectionStart:r}=t,o=n.lastIndexOf("\n",r-1)+1,i=n.indexOf("\n",r),l=n.slice(o,-1===i?void 0:i),a=l.match(/^(\s*)([-*+])\s(.*)$/),s=l.match(/^(\s*)(\d+)\.\s(.*)$/);if(a){let[,r,l,s]=a;if(""===s.trim())return e.preventDefault(),t.value=n.slice(0,o)+r+n.slice(-1===i?void 0:i),t.setSelectionRange(o+r.length,o+r.length),!0;{e.preventDefault();let o=`
${r}${l} `,a=-1===i?n.length:i;return t.value=n.slice(0,a)+o+n.slice(a),t.setSelectionRange(a+o.length,a+o.length),!0}}if(s){let[,r,l,a]=s;if(""===a.trim())return e.preventDefault(),t.value=n.slice(0,o)+r+n.slice(-1===i?void 0:i),t.setSelectionRange(o+r.length,o+r.length),!0;{e.preventDefault();let o=parseInt(l)+1,a=`
${r}${o}. `,s=-1===i?n.length:i;return t.value=n.slice(0,s)+a+n.slice(s),t.setSelectionRange(s+a.length,s+a.length),!0}}return!1})(t,e)&&(null==(r=this.onContentChange)||r.call(this,e.value));return}}};e.addEventListener("keydown",t)}executeAction(e){switch(e){case"bold":this.bold();break;case"italic":this.italic();break;case"strikethrough":this.strikethrough();break;case"inlineCode":this.inlineCode();break;case"codeBlock":this.codeBlock();break;case"heading":case"toggleHeading":this.toggleHeading();break;case"heading-1":this.heading(1);break;case"heading-2":this.heading(2);break;case"heading-3":this.heading(3);break;case"heading-4":this.heading(4);break;case"heading-5":this.heading(5);break;case"heading-6":this.heading(6);break;case"paragraph":this.paragraph();break;case"unorderedList":this.unorderedList();break;case"orderedList":this.orderedList();break;case"indent":this.indent();break;case"outdent":this.outdent();break;case"blockquote":this.blockquote();break;case"horizontalRule":this.horizontalRule();break;case"link":this.link();break;case"image":this.image();break;case"table":this.table();break;case"undo":this.undo();break;case"redo":this.redo();break;case"selectAll":this.selectAll();break;case"removeFormat":this.removeFormat();break;default:console.warn(`Unknown action: ${e}`)}}bold(){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>h(this.contentEditable,"bold")):this.textarea&&this.executeAndNotify(()=>a(this.textarea,"**","**","bold text"))}italic(){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>h(this.contentEditable,"italic")):this.textarea&&this.executeAndNotify(()=>a(this.textarea,"*","*","italic text"))}strikethrough(){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>h(this.contentEditable,"strikeThrough")):this.textarea&&this.executeAndNotify(()=>a(this.textarea,"~~","~~","strikethrough text"))}inlineCode(){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>{var e;let t,n;return e=this.contentEditable,n=(null==(t=document.getSelection())?void 0:t.toString())||"code",h(e,"insertHTML",`<code>${n}</code>`)}):this.textarea&&this.executeAndNotify(()=>a(this.textarea,"`","`","code"))}codeBlock(){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>{var e;let t,n;return e=this.contentEditable,n=(null==(t=document.getSelection())?void 0:t.toString())||"code block",h(e,"insertHTML",`<pre><code>${n}</code></pre>`)}):this.textarea&&this.executeAndNotify(()=>{var e;let t,n;return n=(t=i(e=this.textarea)).text||"code block",l(e,`\`\`\`
${n}
\`\`\``,4*!t.text,0)})}toggleHeading(){this.textarea&&this.executeAndNotify(()=>(e=>{let{line:t}=d(e),n=t.match(/^(#{1,6})\s/);if(!n)return c(e,t.trim()?`# ${t}`:"# Heading");{let r=n[1].length;return r<6?c(e,"#".repeat(r+1)+t.slice(r)):c(e,t.slice(7))}})(this.textarea))}heading(e){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>(t=>e<1||e>6?t.innerHTML:h(t,"formatBlock",`h${e}`))(this.contentEditable)):this.textarea&&this.executeAndNotify(()=>(t=>{if(e<1||e>6)return t.value;let{line:n}=d(t),r="#".repeat(e)+" ",o=n.replace(/^#{1,6}\s*/,"");return c(t,o?`${r}${o}`:`${r}Heading ${e}`)})(this.textarea))}paragraph(){"wysiwyg"===this.mode&&this.contentEditable&&this.executeAndNotify(()=>h(this.contentEditable,"formatBlock","p"))}unorderedList(){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>h(this.contentEditable,"insertUnorderedList")):this.textarea&&this.executeAndNotify(()=>u("unordered")(this.textarea))}orderedList(){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>h(this.contentEditable,"insertOrderedList")):this.textarea&&this.executeAndNotify(()=>u("ordered")(this.textarea))}indent(){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>h(this.contentEditable,"indent")):this.textarea&&this.executeAndNotify(()=>((e,t="  ")=>{var n;let r;return((r=i(e).text)||!n||(r=n),r)?l(e,r.split("\n").map(e=>t+e).join("\n"),0,0):l(e,t,t.length,0)})(this.textarea))}outdent(){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>h(this.contentEditable,"outdent")):this.textarea&&this.executeAndNotify(()=>((e,t="  ")=>{let n=i(e).text;if(!n){let{line:n}=d(e);return n.startsWith(t)?c(e,n.slice(t.length)):e.value}return l(e,n.split("\n").map(e=>e.startsWith(t)?e.slice(t.length):e).join("\n"),0,0)})(this.textarea))}blockquote(){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>h(this.contentEditable,"formatBlock","blockquote")):this.textarea&&this.executeAndNotify(()=>((e,t,n)=>{let r=i(e).text;if(!r&&n&&(r=n),!r)return l(e,t,t.length,0);let o=r.split("\n");return l(e,o.every(e=>e.startsWith(t))?o.map(e=>e.slice(t.length)).join("\n"):o.map(e=>t+e).join("\n"),0,0)})(this.textarea,"> ","Quote"))}horizontalRule(){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>h(this.contentEditable,"insertHTML","<hr>")):this.textarea&&this.executeAndNotify(()=>l(this.textarea,"\n---\n",0,0))}link(e,t){e&&t?"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>(n=>{let r=document.getSelection(),o=t||(null==r?void 0:r.toString())||"link text";return h(n,"insertHTML",`<a href="${e}">${o}</a>`)})(this.contentEditable)):this.textarea&&this.executeAndNotify(()=>{let n=`[${t}](${e})`;return l(this.textarea,n,0,0)}):this.textarea&&this.executeAndNotify(()=>{var e;let t;return t=i(e=this.textarea).text||"link text",l(e,`[${t}](url)`,t.length+2,-4)})}image(e,t,n){if(e){let r=t||"";"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>((e,t="",n)=>r=>{let o=n?` title="${n}"`:"";return h(r,"insertHTML",`<img src="${e}" alt="${t}"${o}>`)})(e,r,n)(this.contentEditable)):this.textarea&&this.executeAndNotify(()=>{let t=n?` "${n}"`:"",o=`![${r}](${e}${t})`;return l(this.textarea,o,0,0)})}else this.textarea&&this.executeAndNotify(()=>{var e;let t;return t=i(e=this.textarea).text||"alt text",l(e,`![${t}](image-url)`,t.length+3,-11)})}table(e=3,t=3){"wysiwyg"===this.mode&&this.contentEditable?this.executeAndNotify(()=>((e=3,t=3)=>n=>{let r=Array(t).fill(null).map((e,t)=>`<th>Header ${t+1}</th>`).join(""),o=`<tr>${r}</tr>`,i=Array(e-1).fill(null).map((e,n)=>{let r=Array(t).fill(null).map((e,t)=>`<td>Cell ${n+1}-${t+1}</td>`).join("");return`<tr>${r}</tr>`}).join("");return h(n,"insertHTML",`<table><thead>${o}</thead><tbody>${i}</tbody></table>`)})(e,t)(this.contentEditable)):this.textarea&&this.executeAndNotify(()=>((e=3,t=3)=>n=>{let r=Array(t).fill("Header").map((e,t)=>`${e} ${t+1}`),o=[`| ${r.join(" | ")} |`,`| ${Array(t).fill("-------").join(" | ")} |`,...Array(e-1).fill(null).map((e,n)=>{let r=Array(t).fill("Cell").map((e,t)=>`${e} ${n+1}-${t+1}`);return`| ${r.join(" | ")} |`})].join("\n");return l(n,`
${o}
`,0,0)})(e,t)(this.textarea))}undo(){"wysiwyg"===this.mode&&this.contentEditable&&this.executeAndNotify(()=>h(this.contentEditable,"undo"))}redo(){"wysiwyg"===this.mode&&this.contentEditable&&this.executeAndNotify(()=>h(this.contentEditable,"redo"))}selectAll(){"wysiwyg"===this.mode&&this.contentEditable&&this.executeAndNotify(()=>h(this.contentEditable,"selectAll"))}removeFormat(){"wysiwyg"===this.mode&&this.contentEditable&&this.executeAndNotify(()=>h(this.contentEditable,"removeFormat"))}getFormattingState(){return"wysiwyg"===this.mode&&this.contentEditable?(this.contentEditable,{bold:document.queryCommandState("bold"),italic:document.queryCommandState("italic"),strikethrough:document.queryCommandState("strikeThrough"),underline:document.queryCommandState("underline"),unorderedList:document.queryCommandState("insertUnorderedList"),orderedList:document.queryCommandState("insertOrderedList"),blockquote:(()=>{let e=document.getSelection();if(e&&e.rangeCount>0){let t=e.getRangeAt(0).commonAncestorContainer,n=t.nodeType===Node.TEXT_NODE?t.parentElement:t;return(null==n?void 0:n.closest("blockquote"))!==null}return!1})(),heading:(()=>{let e=document.getSelection();if(e&&e.rangeCount>0){let t=e.getRangeAt(0).commonAncestorContainer,n=t.nodeType===Node.TEXT_NODE?t.parentElement:t,r=null==n?void 0:n.closest("h1, h2, h3, h4, h5, h6");if(r)return{isHeading:!0,level:parseInt(r.tagName.charAt(1))}}return{isHeading:!1,level:0}})()}):this.textarea?(e=>{let t,{line:n}=d(e);return{bold:p(e,"**","**"),italic:p(e,"*","*"),strikethrough:p(e,"~~","~~"),inlineCode:p(e,"`","`"),heading:/^#{1,6}\s/.test(n),headingLevel:(t=n.match(/^(#{1,6})\s/))?t[1].length:0,unorderedList:s(e,"- "),orderedList:/^\d+\.\s/.test(n),blockquote:s(e,"> ")}})(this.textarea):{}}canUndo(){return"wysiwyg"===this.mode&&!!this.contentEditable&&(this.contentEditable,document.queryCommandEnabled("undo"))}canRedo(){return"wysiwyg"===this.mode&&!!this.contentEditable&&(this.contentEditable,document.queryCommandEnabled("redo"))}code(){this.inlineCode()}quote(){this.blockquote()}insertRowAbove(){"wysiwyg"===this.mode&&this.contentEditable&&this.executeAndNotify(()=>(e=>{let t=g(),n=A();if(!t||!n)return e.innerHTML;let{row:r}=f(n),o=t.rows[r].cells.length,i=t.insertRow(r);for(let e=0;e<o;e++)i.insertCell().innerHTML="&nbsp;";return e.innerHTML})(this.contentEditable))}insertRowBelow(){"wysiwyg"===this.mode&&this.contentEditable&&this.executeAndNotify(()=>(e=>{let t=g(),n=A();if(!t||!n)return e.innerHTML;let{row:r}=f(n),o=t.rows[r].cells.length,i=t.insertRow(r+1);for(let e=0;e<o;e++)i.insertCell().innerHTML="&nbsp;";return e.innerHTML})(this.contentEditable))}insertColumnLeft(){"wysiwyg"===this.mode&&this.contentEditable&&this.executeAndNotify(()=>(e=>{var t;let n=g(),r=A();if(!n||!r)return e.innerHTML;let{col:o}=f(r);for(let e=0;e<n.rows.length;e++){let r=n.rows[e],i=r.insertCell(o);if(0===e&&r.querySelector("th")){let e=document.createElement("th");e.innerHTML="&nbsp;",null==(t=i.parentNode)||t.replaceChild(e,i)}else i.innerHTML="&nbsp;"}return e.innerHTML})(this.contentEditable))}insertColumnRight(){"wysiwyg"===this.mode&&this.contentEditable&&this.executeAndNotify(()=>(e=>{var t;let n=g(),r=A();if(!n||!r)return e.innerHTML;let{col:o}=f(r);for(let e=0;e<n.rows.length;e++){let r=n.rows[e],i=r.insertCell(o+1);if(0===e&&r.querySelector("th")){let e=document.createElement("th");e.innerHTML="&nbsp;",null==(t=i.parentNode)||t.replaceChild(e,i)}else i.innerHTML="&nbsp;"}return e.innerHTML})(this.contentEditable))}deleteCurrentRow(){"wysiwyg"===this.mode&&this.contentEditable&&this.executeAndNotify(()=>(e=>{let t=g(),n=A();if(!t||!n)return e.innerHTML;let{row:r}=f(n);return t.rows.length<=1||t.deleteRow(r),e.innerHTML})(this.contentEditable))}deleteCurrentColumn(){"wysiwyg"===this.mode&&this.contentEditable&&this.executeAndNotify(()=>(e=>{let t=g(),n=A();if(!t||!n)return e.innerHTML;let{col:r}=f(n);if(t.rows.length>0&&t.rows[0].cells.length<=1)return e.innerHTML;for(let e=0;e<t.rows.length;e++){let n=t.rows[e];n.cells[r]&&n.deleteCell(r)}return e.innerHTML})(this.contentEditable))}deleteCurrentTable(){"wysiwyg"===this.mode&&this.contentEditable&&this.executeAndNotify(()=>{var e;let t;return e=this.contentEditable,(t=g())&&t.remove(),e.innerHTML})}}let y={view:({attrs:e,children:n})=>{let{isOpen:r,title:o,onClose:i,onConfirm:l,confirmText:a="OK",cancelText:s="Cancel",size:d="medium"}=e;return r?t()(".md-modal-overlay",{onclick:e=>{e.target===e.currentTarget&&i()},onkeydown:e=>{"Escape"===e.key?i():"Enter"===e.key&&l&&l()},tabindex:-1,style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3}},[t()(`.md-modal.md-modal--${d}`,{onclick:e=>e.stopPropagation(),style:{backgroundColor:"var(--bg-color, white)",color:"var(--text-color, black)",borderRadius:"8px",padding:"20px",minWidth:"small"===d?"300px":"large"===d?"600px":"450px",maxWidth:"90vw",maxHeight:"90vh",overflow:"auto",boxShadow:"0 10px 25px rgba(0, 0, 0, 0.2)",border:"1px solid var(--border-color, #e0e0e0)"}},[t()(".md-modal-header",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px",paddingBottom:"15px",borderBottom:"1px solid var(--border-color, #e0e0e0)"}},[t()("h3.md-modal-title",{style:{margin:0,fontSize:"18px",fontWeight:"600"}},o),t()("button.md-modal-close",{onclick:i,style:{background:"none",border:"none",fontSize:"24px",cursor:"pointer",padding:"0",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"4px",color:"var(--text-color, #666)"}},"\xd7")]),t()(".md-modal-content",{style:{marginBottom:l?"20px":"0"}},n),l&&t()(".md-modal-footer",{style:{display:"flex",justifyContent:"flex-end",gap:"10px",paddingTop:"15px",borderTop:"1px solid var(--border-color, #e0e0e0)"}},[t()("button.md-modal-cancel",{onclick:i,style:{padding:"8px 16px",border:"1px solid var(--border-color, #ddd)",backgroundColor:"var(--button-bg, #f5f5f5)",color:"var(--text-color, #333)",borderRadius:"4px",cursor:"pointer"}},s),t()("button.md-modal-confirm",{onclick:l,style:{padding:"8px 16px",border:"none",backgroundColor:"var(--primary-color, #007bff)",color:"white",borderRadius:"4px",cursor:"pointer"}},a)])])]):null}},w=()=>{let e={src:"",alt:"",title:""};return{oninit:({attrs:t})=>{var n,r,o;e.src=(null==(n=t.initialValues)?void 0:n.src)||"",e.alt=(null==(r=t.initialValues)?void 0:r.alt)||"",e.title=(null==(o=t.initialValues)?void 0:o.title)||""},view:({attrs:n})=>{let{isOpen:r,onClose:o,onInsert:i}=n,l={width:"100%",padding:"8px 12px",border:"1px solid var(--border-color, #ddd)",borderRadius:"4px",fontSize:"14px",backgroundColor:"var(--input-bg, white)",color:"var(--text-color, black)"},a={display:"block",marginBottom:"5px",fontWeight:"500",fontSize:"14px"},s={marginBottom:"15px"};return t()(y,{isOpen:r,title:"Insert Image",onClose:o,onConfirm:()=>{e.src.trim()&&(i(e.src.trim(),e.alt.trim(),e.title.trim()||void 0),o(),e.src="",e.alt="",e.title="")},confirmText:"Insert",size:"medium"},[t()(".md-image-form",[t()(".md-field",{style:s},[t()("label",{style:a},"Image URL *"),t()("input[type=url]",{style:l,placeholder:"https://example.com/image.jpg",value:e.src,oninput:t=>{e.src=t.target.value},oncreate:({dom:e})=>{setTimeout(()=>e.focus(),100)}})]),t()(".md-field",{style:s},[t()("label",{style:a},"Alt Text"),t()("input[type=text]",{style:l,placeholder:"Describe the image",value:e.alt,oninput:t=>{e.alt=t.target.value}})]),t()(".md-field",{style:s},[t()("label",{style:a},"Title (optional)"),t()("input[type=text]",{style:l,placeholder:"Image title for tooltip",value:e.title,oninput:t=>{e.title=t.target.value}})]),e.src&&t()(".md-image-preview",{style:{marginTop:"15px",padding:"10px",border:"1px dashed var(--border-color, #ddd)",borderRadius:"4px",backgroundColor:"var(--preview-bg, #f9f9f9)"}},[t()("div",{style:{marginBottom:"8px",fontSize:"12px",color:"var(--text-muted, #666)"}},"Preview:"),t()("img",{src:e.src,alt:e.alt,title:e.title,style:{maxWidth:"100%",maxHeight:"200px",objectFit:"contain"},onerror:e=>{e.target.style.display="none"},onload:e=>{e.target.style.display="block"}})])])])}}},k=()=>{let e={url:"",text:"",title:""};return{oninit:({attrs:t})=>{var n,r,o;e.url=(null==(n=t.initialValues)?void 0:n.url)||"",e.text=(null==(r=t.initialValues)?void 0:r.text)||"",e.title=(null==(o=t.initialValues)?void 0:o.title)||""},view:({attrs:n})=>{let{isOpen:r,onClose:o,onInsert:i}=n,l={width:"100%",padding:"8px 12px",border:"1px solid var(--border-color, #ddd)",borderRadius:"4px",fontSize:"14px",backgroundColor:"var(--input-bg, white)",color:"var(--text-color, black)"},a={display:"block",marginBottom:"5px",fontWeight:"500",fontSize:"14px"},s={marginBottom:"15px"};return t()(y,{isOpen:r,title:"Insert Link",onClose:o,onConfirm:()=>{e.url.trim()&&e.text.trim()&&(i(e.url.trim(),e.text.trim(),e.title.trim()||void 0),o(),e.url="",e.text="",e.title="")},confirmText:"Insert",size:"medium"},[t()(".md-link-form",[t()(".md-field",{style:s},[t()("label",{style:a},"Link Text *"),t()("input[type=text]",{style:l,placeholder:"Text to display",value:e.text,oninput:t=>{e.text=t.target.value},oncreate:({dom:e})=>{setTimeout(()=>e.focus(),100)}})]),t()(".md-field",{style:s},[t()("label",{style:a},"URL *"),t()("input[type=url]",{style:l,placeholder:"https://example.com",value:e.url,oninput:t=>{e.url=t.target.value}})]),t()(".md-field",{style:s},[t()("label",{style:a},"Title (optional)"),t()("input[type=text]",{style:l,placeholder:"Link title for tooltip",value:e.title,oninput:t=>{e.title=t.target.value}})]),e.url&&e.text&&t()(".md-link-preview",{style:{marginTop:"15px",padding:"10px",border:"1px dashed var(--border-color, #ddd)",borderRadius:"4px",backgroundColor:"var(--preview-bg, #f9f9f9)"}},[t()("div",{style:{marginBottom:"8px",fontSize:"12px",color:"var(--text-muted, #666)"}},"Preview:"),t()("a",{href:e.url,title:e.title,target:"_blank",rel:"noopener noreferrer",style:{color:"var(--link-color, #007bff)",textDecoration:"underline"},onclick:e=>e.preventDefault()},e.text)])])])}}},C={oninit:({state:e})=>{e.hoverRows=0,e.hoverCols=0},view:({state:e,attrs:n})=>{let{isOpen:r,onClose:o,onSelect:i,maxRows:l=8,maxCols:a=8}=n;return r?t()(".md-table-selector-overlay",{onclick:e=>{e.target===e.currentTarget&&o()},style:{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:999,backgroundColor:"rgba(0, 0, 0, 0.1)"}},[t()(".md-table-selector",{style:{position:"absolute",backgroundColor:"var(--bg-color, white)",border:"1px solid var(--border-color, #ddd)",borderRadius:"6px",padding:"15px",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.15)",zIndex:1e3,top:"50px",left:"50%",transform:"translateX(-50%)"},onclick:e=>e.stopPropagation()},[t()(".md-table-selector-header",{style:{marginBottom:"10px",fontSize:"14px",fontWeight:"500",color:"var(--text-color, #333)",textAlign:"center"}},[`${e.hoverRows} \xd7 ${e.hoverCols} Table`,0===e.hoverRows&&0===e.hoverCols&&"Select table size"]),t()(".md-table-grid",{style:{display:"grid",gridTemplateRows:`repeat(${l}, 20px)`,gridTemplateColumns:`repeat(${a}, 20px)`,gap:"2px",marginBottom:"10px"}},Array.from({length:l},(n,r)=>Array.from({length:a},(n,l)=>{let a,s;return t()(".md-table-cell",{style:(a=r+1,s=l+1,{width:"20px",height:"20px",border:"1px solid var(--border-color, #ddd)",backgroundColor:a<=e.hoverRows&&s<=e.hoverCols?"var(--primary-color, #007bff)":"var(--cell-bg, white)",cursor:"pointer",transition:"background-color 0.1s ease"}),onmouseover:()=>{var t,n;return t=r+1,n=l+1,void(e.hoverRows=t,e.hoverCols=n)},onclick:()=>{i(r+1,l+1),o()},key:`${r}-${l}`})})).flat()),t()(".md-table-selector-footer",{style:{borderTop:"1px solid var(--border-color, #e0e0e0)",paddingTop:"10px",fontSize:"12px",color:"var(--text-muted, #666)",textAlign:"center"}},[t()("div","Click to insert table"),t()("button",{style:{marginTop:"5px",padding:"4px 8px",fontSize:"11px",border:"1px solid var(--border-color, #ddd)",backgroundColor:"var(--button-bg, #f5f5f5)",color:"var(--text-color, #333)",borderRadius:"3px",cursor:"pointer"},onclick:()=>{let e=prompt("Number of rows:","3"),t=prompt("Number of columns:","3");if(e&&t){let n=parseInt(e),r=parseInt(t);n>0&&r>0&&n<=20&&r<=20&&(i(n,r),o())}}},"Custom size...")])])]):null}},v={view:({attrs:e})=>{if(!e.isVisible)return t()("");let n=[{label:"Insert Row Above",action:e.onInsertRowAbove,icon:'<svg viewBox="0 0 24 24" fill="none"><g fill="#4a90e2"><rect x="3" y="10" width="5" height="3" rx=".5"/><rect x="9" y="10" width="5" height="3" rx=".5"/><rect x="15" y="10" width="5" height="3" rx=".5"/></g><g fill="#999"><rect x="3" y="15" width="5" height="3" rx=".5"/><rect x="9" y="15" width="5" height="3" rx=".5"/><rect x="15" y="15" width="5" height="3" rx=".5"/></g><path stroke="#4a90e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 8V4M10 5l2-2 2 2"/></svg>'},{label:"Insert Row Below",action:e.onInsertRowBelow,icon:'<svg viewBox="0 0 24 24" fill="none"><g fill="#999"><rect x="3" y="6" width="5" height="3" rx=".5"/><rect x="9" y="6" width="5" height="3" rx=".5"/><rect x="15" y="6" width="5" height="3" rx=".5"/></g><g fill="#4a90e2"><rect x="3" y="11" width="5" height="3" rx=".5"/><rect x="9" y="11" width="5" height="3" rx=".5"/><rect x="15" y="11" width="5" height="3" rx=".5"/></g><path stroke="#4a90e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 16v4M10 19l2 2 2-2"/></svg>'},{type:"separator"},{label:"Insert Column Left",action:e.onInsertColumnLeft,icon:'<svg viewBox="0 0 24 24" fill="none"><g fill="#4a90e2"><rect x="9" y="6" width="3" height="4" rx=".5"/><rect x="9" y="11" width="3" height="4" rx=".5"/><rect x="9" y="16" width="3" height="4" rx=".5"/></g><g fill="#999"><rect x="14" y="6" width="3" height="4" rx=".5"/><rect x="14" y="11" width="3" height="4" rx=".5"/><rect x="14" y="16" width="3" height="4" rx=".5"/></g><path stroke="#4a90e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 12H3M4 10l-2 2 2 2"/></svg>'},{label:"Insert Column Right",action:e.onInsertColumnRight,icon:'<svg viewBox="0 0 24 24" fill="none"><g fill="#999"><rect x="7" y="6" width="3" height="4" rx=".5"/><rect x="7" y="11" width="3" height="4" rx=".5"/><rect x="7" y="16" width="3" height="4" rx=".5"/></g><g fill="#4a90e2"><rect x="12" y="6" width="3" height="4" rx=".5"/><rect x="12" y="11" width="3" height="4" rx=".5"/><rect x="12" y="16" width="3" height="4" rx=".5"/></g><path stroke="#4a90e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M17 12h4M20 10l2 2-2 2"/></svg>'},{type:"separator"},{label:"Delete Row",action:e.onDeleteRow,icon:"✕",danger:!0},{label:"Delete Column",action:e.onDeleteColumn,icon:"✕",danger:!0},{type:"separator"},{label:"Delete Table",action:e.onDeleteTable,icon:"\uD83D\uDDD1",danger:!0}];return t()(".table-context-menu",{style:{left:`${e.position.x}px`,top:`${e.position.y}px`}},[t()(".table-menu-backdrop",{onclick:e.onClose,oncontextmenu:t=>{t.preventDefault(),e.onClose()}},t()(".table-menu-content",n.map(n=>"separator"===n.type?t()(".table-menu-separator"):t()(".table-menu-item",{class:n.danger?"danger":"",onclick:t=>{console.log("Clicked .table-menu-item"),t.preventDefault(),t.stopPropagation(),n.action&&n.action(),e.onClose()},onkeydown:t=>{("Enter"===t.key||" "===t.key)&&(t.preventDefault(),n.action&&n.action(),e.onClose())},tabindex:0},[n.icon&&t()(".table-menu-icon",t().trust(n.icon)),t()(".table-menu-label",n.label)]))))])}},E={oninit:({state:e})=>{e.selectedIndex=-1},oncreate:({attrs:e,state:n,dom:r})=>{if(e.isVisible){let o=r=>{if(e.isVisible)switch(r.key){case"ArrowDown":r.preventDefault(),n.selectedIndex=Math.min(n.selectedIndex+1,e.options.length-1),t().redraw();break;case"ArrowUp":r.preventDefault(),n.selectedIndex=Math.max(n.selectedIndex-1,0),t().redraw();break;case"Enter":case" ":r.preventDefault(),n.selectedIndex>=0&&n.selectedIndex<e.options.length&&e.onSelect(e.options[n.selectedIndex]);break;case"Escape":r.preventDefault(),e.onClose()}};document.addEventListener("keydown",o),r._keydownHandler=o}},onremove:({dom:e})=>{let t=e._keydownHandler;t&&document.removeEventListener("keydown",t)},view:({attrs:e,state:n})=>{if(!e.isVisible||0===e.options.length)return t()("");let r=e.position;if(e.triggerElement){let t=e.triggerElement.getBoundingClientRect();r={x:t.left,y:t.bottom+4}}return t()(".dropdown-menu-container",{style:{position:"fixed",left:`${r.x}px`,top:`${r.y}px`,zIndex:1e3},onclick:e=>{e.stopPropagation()}},[t()(".dropdown-backdrop",{onclick:t=>{e.onClose()},oncontextmenu:t=>{t.preventDefault(),e.onClose()}}),t()(".dropdown-menu-content",e.options.map((r,o)=>{let i=o===n.selectedIndex;return t()(".dropdown-menu-item",{key:r.name,class:i?"selected":"",onclick:t=>{t.preventDefault(),t.stopPropagation(),e.onSelect(r)},onmouseenter:()=>{n.selectedIndex=o,t().redraw()},onkeydown:t=>{("Enter"===t.key||" "===t.key)&&(t.preventDefault(),e.onSelect(r))},tabindex:i?0:-1},[t()(".dropdown-menu-icon",{innerHTML:r.icon}),t()(".dropdown-menu-label",r.title),r.shortcut&&t()(".dropdown-menu-shortcut",r.shortcut)])}))])}},B=new class{htmlToMarkdown(e){let t;"string"==typeof e?(t=document.createElement("div")).innerHTML=e:t=e.cloneNode(!0),t.innerHTML=t.innerHTML.replace(/\u200B/g,"");let n="";return this._normalizeNodes(t),Array.from(t.childNodes).forEach(e=>{n+=this._nodeToMarkdownRecursive(e)}),(n=(n=n.replace(/\n\s*\n\s*\n+/g,"\n\n")).replace(/ +\n/g,"\n")).trim()}_normalizeNodes(e){let t=e.firstChild;for(;t;){let n=t.nextSibling;if(t.nodeType===Node.TEXT_NODE&&n&&n.nodeType===Node.TEXT_NODE)t.textContent=(t.textContent||"")+(n.textContent||""),e.removeChild(n),n=t.nextSibling;else if("BR"===t.nodeName){if(!n||"BR"===n.nodeName||this._isBlockElement(n)){let n=document.createTextNode("\n");e.insertBefore(n,t)}else if(n.nodeType!==Node.TEXT_NODE||n.textContent.startsWith("\n")){if(n.nodeType===Node.ELEMENT_NODE&&!this._isBlockElement(n)){let t=document.createTextNode("\n");e.insertBefore(t,n)}}else n.textContent="\n"+n.textContent;e.removeChild(t),t=n;continue}t&&t.childNodes&&t.childNodes.length>0&&t.nodeType===Node.ELEMENT_NODE&&this._normalizeNodes(t),t=n}}_isBlockElement(e){return!!e&&e.nodeType===Node.ELEMENT_NODE&&["P","H1","H2","H3","H4","H5","H6","UL","OL","LI","BLOCKQUOTE","PRE","HR","TABLE","THEAD","TBODY","TR","DIV","IMG"].includes(e.nodeName)}_findParentElement(e,t){let n=Array.isArray(t)?t:[t],r=e.parentNode;for(;r;){if(r.nodeType===Node.ELEMENT_NODE&&n.includes(r.nodeName))return r;r=r.parentNode}return null}_nodeToMarkdownRecursive(e,t={}){switch(e.nodeName){case"#text":let n=e.textContent||"";return t.inTableCell?(n=n.replace(/\|/g,"\\|"),this._findParentElement(e,"PRE")||this._findParentElement(e,"CODE")||(n=n.replace(/\n/g,"<br>"))):this._findParentElement(e,"PRE")||this._findParentElement(e,"CODE")||(n=n.replace(/  +/g," ")),n;case"BR":return t.inTableCell?"<br>":"\n";case"IMG":if(t.inTableCell)return e.outerHTML;let r=e.getAttribute("src")||"",o=e.getAttribute("alt")||"";return`![${o}](${r})

`;case"B":case"STRONG":return`**${this._processInlineContainerRecursive(e,t).trim()}**`;case"I":case"EM":return`*${this._processInlineContainerRecursive(e,t).trim()}*`;case"S":case"DEL":case"STRIKE":return`~~${this._processInlineContainerRecursive(e,t).trim()}~~`;case"A":let i=e.getAttribute("href")||"",l=this._processInlineContainerRecursive(e,t).trim();return`[${l}](${i})`;case"CODE":if(!this._findParentElement(e,"PRE")){let n=e.textContent||"";return t.inTableCell&&(n=n.replace(/\|/g,"\\|")),`\`${n.trim()}\``}return"";case"P":if(t.inTableCell)return this._nodeToHtmlForTableCell(e);let a=e.parentNode,s=a&&("LI"===a.nodeName||"BLOCKQUOTE"===a.nodeName),d=this._processInlineContainerRecursive(e,t).trim();if(s)return d.replace(/\n\s*\n/g,"\n").trim()+(d?"\n":"");return d?`${d}

`:"";case"UL":case"OL":if(t.inTableCell)return this._nodeToHtmlForTableCell(e);let c=this._listToMarkdownRecursive(e,"",e.nodeName,1,t);return c.trim().length>0&&!c.endsWith("\n\n")&&(c.endsWith("\n")||(c+="\n"),c+="\n"),c;case"BLOCKQUOTE":if(t.inTableCell)return this._nodeToHtmlForTableCell(e);let u=this._processInlineContainerRecursive(e,t).split("\n").map(e=>e.trim()).filter(e=>e.length>0);return u.map(e=>`> ${e}`).join("\n")+(u.length>0?"\n\n":"");case"PRE":if(t.inTableCell)return this._nodeToHtmlForTableCell(e);if(e.firstChild&&"CODE"===e.firstChild.nodeName){let t=e.firstChild,n=t.className.match(/language-(\S+)/),r=n?n[1]:"",o=t.textContent||"";return o.length>0&&!o.endsWith("\n")&&(o+="\n"),`\`\`\`${r}
${o}\`\`\`

`}let p=e.textContent||"";return p.length>0&&!p.endsWith("\n")&&(p+="\n"),`\`\`\`
${p}\`\`\`

`;case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":if(t.inTableCell)return this._nodeToHtmlForTableCell(e);let h=parseInt(e.nodeName[1]);return`${"#".repeat(h)} ${this._processInlineContainerRecursive(e,t).trim()}

`;case"HR":if(t.inTableCell)return this._nodeToHtmlForTableCell(e);return"\n---\n\n";case"DIV":if(t.inTableCell)return this._nodeToHtmlForTableCell(e);let g=this._processInlineContainerRecursive(e,t).trim();if(e.classList.contains("md-editable-area"))return g;return g?`${g}

`:"";case"TABLE":return this._tableToMarkdown(e,t);case"LI":return this._processInlineContainerRecursive(e,t).trim();default:if(e.childNodes&&e.childNodes.length>0)return this._processInlineContainerRecursive(e,t);let A=e.textContent||"";return t.inTableCell||this._findParentElement(e,"PRE")||this._findParentElement(e,"CODE")||(A=A.replace(/  +/g," ")),t.inTableCell&&(A=A.replace(/\|/g,"\\|"),this._findParentElement(e,"PRE")||this._findParentElement(e,"CODE")||(A=A.replace(/\n/g,"<br>"))),A}}_processInlineContainerRecursive(e,t={}){let n="";return Array.from(e.childNodes).forEach(e=>{n+=this._nodeToMarkdownRecursive(e,t)}),n}_listToMarkdownRecursive(e,t,n,r,o={}){let i="",l=1;return Array.from(e.children).forEach(e=>{if("LI"===e.nodeName){let a="OL"===n?`${l}. `:"- ",s=this._processInlineContainerRecursive(e,o).trim();s&&s.split("\n").forEach((e,n)=>{0===n?i+=`${t}${a}${e}
`:i+=`${t}  ${e}
`}),e.querySelectorAll("ul, ol").forEach(n=>{n.parentNode===e&&(i+=this._listToMarkdownRecursive(n,t+"  ",n.nodeName,r+1,o))}),"OL"===n&&l++}}),i}_tableToMarkdown(e,t={}){let n="",r=e.querySelector("thead"),o=e.querySelector("tbody")||e,i=0,l="",a="";r&&Array.from(r.querySelectorAll("tr")).forEach(e=>{let t=Array.from(e.querySelectorAll("th, td")).map(e=>this._cellContentToMarkdown(e));t.length>0&&(l+=`| ${t.join(" | ")} |
`,0===i&&(i=t.length))});let s=!1;if(0===i&&o){let e=o.querySelector("tr");if(e&&(Array.from(e.children).some(e=>"TH"===e.nodeName)||Array.from(e.children).every(e=>{var t;return 1===e.children.length&&["STRONG","B","EM","I"].includes(null==(t=e.firstElementChild)?void 0:t.nodeName)}))){let t=Array.from(e.querySelectorAll("th, td")).map(e=>this._cellContentToMarkdown(e));t.length>0&&(l+=`| ${t.join(" | ")} |
`,i=t.length,s=!0)}}if(0===i&&o){let e=o.querySelector("tr");e&&(i=e.querySelectorAll("td, th").length)}if(0===i&&""===l.trim()){let n="";return Array.from(e.querySelectorAll("tr")).forEach(e=>{Array.from(e.querySelectorAll("th, td")).forEach(e=>{n+=this._nodeToMarkdownRecursive(e,{...t,inTableCell:!1})})}),n.trim()?n.trim()+"\n\n":""}return n=l,(""!==l.trim()||i>0)&&(n+=`|${" --- |".repeat(i)}
`),Array.from(o.querySelectorAll("tr")).forEach((e,t)=>{if(s&&0===t)return;let n=Array.from(e.querySelectorAll("td, th")).map(e=>this._cellContentToMarkdown(e)),r=[];for(let e=0;e<i;e++)r.push(n[e]||"");a+=`| ${r.join(" | ")} |
`}),(n+=a).trim()?n.trim()+"\n\n":""}_cellContentToMarkdown(e){return this._processInlineContainerRecursive(e,{inTableCell:!0}).replace(/\n/g," ").trim()}_nodeToHtmlForTableCell(e){return e.outerHTML}},T={savedSelection:null,savedRange:null,savedRangeInfo:null},$=()=>{let e="",n="",i=!1,l=null,a=(e,t)=>e&&""!==e.trim()?t?t(e):e:"",s=!1,d=!1,c=!1,u=!1,p={x:0,y:0},h=!1,g=[],A={x:0,y:0},f=null,m=null;return{view:({attrs:b})=>{let{mode:y="wysiwyg",theme:$="light",toolbar:S=!0,showTabs:R=!0,placeholder:z="Start writing...",content:M="",isPreview:L=!1,markdownToHtml:I,htmlToMarkdown:N,onContentChange:H,onModeChange:O}=b;if(!i){if(M.includes("<"))e=M,n=N?N(M):B.htmlToMarkdown(M);else n=M,e=a(M,I);i=!0}let j=(t,r)=>{if("wysiwyg"===r)e=t,n=N?N(t):B.htmlToMarkdown(t),null==H||H(n);else n=t,e=a(t,I),null==H||H(n)};l||(l=new x(e=>{j(e,y)})),l.setMode(y);let _=t=>{if(t!==y){if("markdown"===t&&"wysiwyg"===y){let t;n=N?N(e):(t=e,B.htmlToMarkdown(t))}else"wysiwyg"===t&&"markdown"===y&&(e=a(n,I));null==l||l.setMode(t),null==O||O(t)}},q=async(e,t,n)=>{l&&(await Y(),l.image(e,t,n))},P=async(e,t,n)=>{l&&(await Y(),l.link(e,t))},D=async(e,t)=>{l&&(await Y(),l.table(e,t))},W=()=>{if("markdown"===y&&document.activeElement instanceof HTMLTextAreaElement){let e=document.activeElement;T.savedSelection={start:e.selectionStart,end:e.selectionEnd}}else if("wysiwyg"===y){let e=document.getSelection();if(e&&e.rangeCount>0){let t=e.getRangeAt(0);T.savedRange=t.cloneRange(),T.savedRangeInfo={startContainer:t.startContainer,startOffset:t.startOffset,endContainer:t.endContainer,endOffset:t.endOffset}}}},Y=()=>new Promise(e=>{if("markdown"===y&&T.savedSelection){let t=null==l?void 0:l.getTextarea();t?setTimeout(()=>{t.setSelectionRange(T.savedSelection.start,T.savedSelection.end),t.focus(),e()},0):e()}else"wysiwyg"===y&&T.savedRange&&setTimeout(()=>{var t,n;if(l){let e=l.contentEditable;if(e){e.focus();let r=document.getSelection();if(r&&T.savedRange)try{r.removeAllRanges();let o=document.createRange();T.savedRangeInfo&&T.savedRangeInfo.startContainer.parentNode&&e.contains(T.savedRangeInfo.startContainer)?(o.setStart(T.savedRangeInfo.startContainer,Math.min(T.savedRangeInfo.startOffset,(null==(t=T.savedRangeInfo.startContainer.textContent)?void 0:t.length)||0)),T.savedRangeInfo.endContainer.parentNode&&e.contains(T.savedRangeInfo.endContainer)?o.setEnd(T.savedRangeInfo.endContainer,Math.min(T.savedRangeInfo.endOffset,(null==(n=T.savedRangeInfo.endContainer.textContent)?void 0:n.length)||0)):o.collapse(!0)):(o.selectNodeContents(e),o.collapse(!1)),r.addRange(o)}catch(n){console.warn("❌ Failed to restore cursor position:",n);let t=document.createRange();t.selectNodeContents(e),t.collapse(!1),r.removeAllRanges(),r.addRange(t)}}}T.savedSelection=null,T.savedRange=null,T.savedRangeInfo=null,e()},10);"wysiwyg"===y&&T.savedRange||(T.savedSelection=null,T.savedRange=null,T.savedRangeInfo=null,e())}),Z=e=>{var t,n,r;if(!m||!l)return;let o=l.contentEditable;if(!o)return;let i=m,a=i.closest("table");if(!a)return;let s=o.scrollTop,d=o.scrollLeft;try{switch(e){case"insertRowAbove":{let e=i.closest("tr"),n=Array.from(a.rows).indexOf(e),r=e.cells.length,o=a.insertRow(n);for(let i=0;i<r;i++){let r=o.insertCell(i);if(r.innerHTML="&nbsp;",0===n&&e.querySelector("th")){let e=document.createElement("th");e.innerHTML="&nbsp;",null==(t=r.parentNode)||t.replaceChild(e,r)}}break}case"insertRowBelow":{let e=i.closest("tr"),t=Array.from(a.rows).indexOf(e),n=e.cells.length,r=a.insertRow(t+1);for(let e=0;e<n;e++)r.insertCell(e).innerHTML="&nbsp;";break}case"insertColumnLeft":{let e=i.closest("tr"),t=Array.from(e.cells).indexOf(i);for(let e=0;e<a.rows.length;e++){let r=a.rows[e],o=r.insertCell(t);if(o.innerHTML="&nbsp;",0===e&&r.querySelector("th")){let e=document.createElement("th");e.innerHTML="&nbsp;",null==(n=o.parentNode)||n.replaceChild(e,o)}}break}case"insertColumnRight":{let e=i.closest("tr"),t=Array.from(e.cells).indexOf(i);for(let e=0;e<a.rows.length;e++){let n=a.rows[e],o=n.insertCell(t+1);if(o.innerHTML="&nbsp;",0===e&&n.querySelector("th")){let e=document.createElement("th");e.innerHTML="&nbsp;",null==(r=o.parentNode)||r.replaceChild(e,o)}}break}case"deleteRow":{let e=i.closest("tr");a.rows.length>1&&e.remove();break}case"deleteColumn":{let e=i.closest("tr"),t=Array.from(e.cells).indexOf(i);if(a.rows.length>0&&a.rows[0].cells.length>1)for(let e=0;e<a.rows.length;e++)a.rows[e].cells[t]&&a.rows[e].deleteCell(t);break}case"deleteTable":a.remove()}null==H||H(o.innerHTML),setTimeout(()=>{o.scrollTop=s,o.scrollLeft=d},10)}catch(e){console.error("Table operation failed:",e)}},U=async e=>{h=!1,l&&(await Y(),l.executeAction(e.action)),t().redraw()};return t()(".md-wysiwyg-editor-wrapper",{"data-theme":$},[S&&t()(".md-toolbar",[o.map((e,n)=>[...e.map(e=>{let n=!1;return"undo"===e.action?n=!(null==l?void 0:l.canUndo()):"redo"===e.action&&(n=!(null==l?void 0:l.canRedo())),t()("button",{type:"button",class:["md-toolbar-button",e.dropdown?"has-dropdown":"",n?"disabled":""].join(" ").trim(),disabled:n,title:`${e.title}${e.shortcut?` (${e.shortcut})`:""}`,onclick:o=>{o.preventDefault(),n||((e,n,o)=>{if(n&&n.dropdown&&"toggleHeading"===e){W();let e=null==o?void 0:o.target;if(e){let n=e.getBoundingClientRect();g=r,A={x:n.left,y:n.bottom+4},f=e,h=!0,t().redraw();return}}switch(e){case"image":W(),s=!0,t().redraw();break;case"link":W(),d=!0,t().redraw();break;case"table":W(),c=!0,t().redraw();break;default:null==l||l.executeAction(e)}})(e.action,e,o)},innerHTML:e.icon})}),n<o.length-1&&t()(".md-toolbar-separator")]).flat().filter(Boolean)]),t()(".md-editor-content-area",["markdown"===y?t()(".md-markdown-editor-container",{key:"markdown-editor",style:{display:"flex"}},t()("textarea.md-markdown-area[name=markdown-area]",{placeholder:z,value:n,oninput:e=>{j(e.target.value,"markdown")},oncreate:e=>{null==l||l.setTextarea(e.dom)}})):t()("div.md-editable-area",{key:"wysiwyg-editor",contenteditable:!0,"data-placeholder":z,oninput:e=>{j(e.target.innerHTML,"wysiwyg")},oncontextmenu:e=>{let n=e.target;if(n.closest("table")&&"wysiwyg"===y){if(e.preventDefault(),e.stopPropagation(),m=n.closest("td, th")||n,l){let e=l.contentEditable;e&&(e.scrollTop,e.scrollLeft)}return W(),h=!1,u=!0,p={x:e.clientX,y:e.clientY},t().redraw(),!1}},onclick:e=>{e.stopPropagation();let n=!1;u&&(u=!1,n=!0),h&&(h=!1,n=!0),n&&t().redraw()},oncreate:t=>{let n=t.dom;n.innerHTML=e,null==l||l.setContentEditable(n)},onupdate:t=>{var n;let r=t.dom;r.innerHTML===e||(null==(n=document.getSelection())?void 0:n.rangeCount)||(r.innerHTML=e)}})]),R&&t()(".md-tabs",[t()("button.md-tab-button",{type:"button",class:"wysiwyg"===y?"active":"",onclick:()=>_("wysiwyg")},"Visual"),t()("button.md-tab-button",{type:"button",class:"markdown"===y?"active":"",onclick:()=>_("markdown")},"Markdown")]),L&&t()(".editor-preview",{innerHTML:"markdown"===y?a(n,I):e}),t()(w,{isOpen:s,onClose:()=>{s=!1,t().redraw()},onInsert:q}),t()(k,{isOpen:d,onClose:()=>{d=!1,t().redraw()},onInsert:P}),t()(C,{isOpen:c,onClose:()=>{c=!1,t().redraw()},onSelect:D}),t()(v,{isVisible:u,position:p,onClose:()=>{u=!1,m=null,t().redraw()},onInsertRowAbove:()=>{Z("insertRowAbove"),u=!1,m=null,t().redraw()},onInsertRowBelow:()=>{Z("insertRowBelow"),u=!1,m=null,t().redraw()},onInsertColumnLeft:()=>{Z("insertColumnLeft"),u=!1,m=null,t().redraw()},onInsertColumnRight:()=>{Z("insertColumnRight"),u=!1,m=null,t().redraw()},onDeleteRow:()=>{Z("deleteRow"),u=!1,m=null,t().redraw()},onDeleteColumn:()=>{Z("deleteColumn"),u=!1,m=null,t().redraw()},onDeleteTable:()=>{Z("deleteTable"),u=!1,m=null,t().redraw()}}),t()(E,{isVisible:h,position:A,options:g,triggerElement:f,onClose:()=>{h=!1,t().redraw()},onSelect:U})])}}};var S=n(450),R=n.n(S),z=n(683),M=n.n(z),L=n(265),I=n.n(L),N=n(962),H=n.n(N),O=n(238),j=n.n(O),_=n(971),q=n.n(_),P=n(445),D={};function W(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}D.styleTagTransform=q(),D.setAttributes=H(),D.insert=I().bind(null,"head"),D.domAPI=M(),D.insertStyleElement=j(),R()(P.A,D),P.A&&P.A.locals&&P.A.locals;var Y=W(),Z={exec:()=>null};function U(e,t=""){let n="string"==typeof e?e:e.source,r={replace:(e,t)=>{let o="string"==typeof t?t:t.source;return o=o.replace(V.caret,"$1"),n=n.replace(e,o),r},getRegex:()=>new RegExp(n,t)};return r}var V={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},F=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,X=/(?:[*+-]|\d{1,9}[.)])/,Q=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,K=U(Q).replace(/bull/g,X).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),G=U(Q).replace(/bull/g,X).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),J=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ee=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,et=U(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ee).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),en=U(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,X).getRegex(),er="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",eo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ei=U("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",eo).replace("tag",er).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),el=U(J).replace("hr",F).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",er).getRegex(),ea={blockquote:U(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",el).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:et,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:F,html:ei,lheading:K,list:en,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:el,table:Z,text:/^[^\n]+/},es=U("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",F).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",er).getRegex(),ed={...ea,lheading:G,table:es,paragraph:U(J).replace("hr",F).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",es).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",er).getRegex()},ec={...ea,html:U(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",eo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Z,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:U(J).replace("hr",F).replace("heading",` *#{1,6} *[^
]`).replace("lheading",K).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},eu=/^( {2,}|\\)\n(?!\s*$)/,ep=/[\p{P}\p{S}]/u,eh=/[\s\p{P}\p{S}]/u,eg=/[^\s\p{P}\p{S}]/u,eA=U(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,eh).getRegex(),ef=/(?!~)[\p{P}\p{S}]/u,em=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,eb=U(em,"u").replace(/punct/g,ep).getRegex(),ex=U(em,"u").replace(/punct/g,ef).getRegex(),ey="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ew=U(ey,"gu").replace(/notPunctSpace/g,eg).replace(/punctSpace/g,eh).replace(/punct/g,ep).getRegex(),ek=U(ey,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,ef).getRegex(),eC=U("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,eg).replace(/punctSpace/g,eh).replace(/punct/g,ep).getRegex(),ev=U(/\\(punct)/,"gu").replace(/punct/g,ep).getRegex(),eE=U(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),eB=U(eo).replace("(?:--\x3e|$)","--\x3e").getRegex(),eT=U("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",eB).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),e$=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`[^`]*`|[^\[\]\\`])*?/,eS=U(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",e$).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),eR=U(/^!?\[(label)\]\[(ref)\]/).replace("label",e$).replace("ref",ee).getRegex(),ez=U(/^!?\[(ref)\](?:\[\])?/).replace("ref",ee).getRegex(),eM=U("reflink|nolink(?!\\()","g").replace("reflink",eR).replace("nolink",ez).getRegex(),eL={_backpedal:Z,anyPunctuation:ev,autolink:eE,blockSkip:/\[[^\[\]]*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)|`[^`]*?`|<(?! )[^<>]*?>/g,br:eu,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:Z,emStrongLDelim:eb,emStrongRDelimAst:ew,emStrongRDelimUnd:eC,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:eS,nolink:ez,punctuation:eA,reflink:eR,reflinkSearch:eM,tag:eT,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:Z},eI={...eL,link:U(/^!?\[(label)\]\((.*?)\)/).replace("label",e$).getRegex(),reflink:U(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",e$).getRegex()},eN={...eL,emStrongRDelimAst:ek,emStrongLDelim:ex,url:U(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},eH={...eN,br:U(eu).replace("{2,}","*").getRegex(),text:U(eN.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},eO={normal:ea,gfm:ed,pedantic:ec},ej={normal:eL,gfm:eN,breaks:eH,pedantic:eI},e_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},eq=e=>e_[e];function eP(e,t){if(t){if(V.escapeTest.test(e))return e.replace(V.escapeReplace,eq)}else if(V.escapeTestNoEncode.test(e))return e.replace(V.escapeReplaceNoEncode,eq);return e}function eD(e){try{e=encodeURI(e).replace(V.percentDecode,"%")}catch{return null}return e}function eW(e,t){let n=e.replace(V.findPipe,(e,t,n)=>{let r=!1,o=t;for(;--o>=0&&"\\"===n[o];)r=!r;return r?"|":" |"}).split(V.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(V.slashPipe,"|");return n}function eY(e,t,n){let r=e.length;if(0===r)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i!==t||n)if(i!==t&&n)o++;else break;else o++}return e.slice(0,r-o)}function eZ(e,t,n,r,o){let i=t.href,l=t.title||null,a=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let s={type:"!"===e[0].charAt(0)?"image":"link",raw:n,href:i,title:l,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,s}var eU=class{options;rules;lexer;constructor(e){this.options=e||Y}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:eY(e,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=function(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(null===r)return t;let o=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(null===t)return e;let[r]=t;return r.length>=o.length?e.slice(o.length):e}).join(`
`)}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=eY(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:eY(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=eY(t[0],`
`).split(`
`),n="",r="",o=[];for(;e.length>0;){let t=!1,i=[],l;for(l=0;l<e.length;l++)if(this.rules.other.blockquoteStart.test(e[l]))i.push(e[l]),t=!0;else if(t)break;else i.push(e[l]);e=e.slice(l);let a=i.join(`
`),s=a.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${a}`:a,r=r?`${r}
${s}`:s;let d=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(s,o,!0),this.lexer.state.top=d,0===e.length)break;let c=o.at(-1);if(c?.type==="code")break;if(c?.type==="blockquote"){let t=c.raw+`
`+e.join(`
`),i=this.blockquote(t);o[o.length-1]=i,n=n.substring(0,n.length-c.raw.length)+i.raw,r=r.substring(0,r.length-c.text.length)+i.text;break}if(c?.type==="list"){let t=c.raw+`
`+e.join(`
`),i=this.list(t);o[o.length-1]=i,n=n.substring(0,n.length-c.raw.length)+i.raw,r=r.substring(0,r.length-c.raw.length)+i.raw,e=t.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),l=!1;for(;e;){let n=!1,r="",a="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let s=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,e=>" ".repeat(3*e.length)),d=e.split(`
`,1)[0],c=!s.trim(),u=0;if(this.options.pedantic?(u=2,a=s.trimStart()):c?u=t[1].length+1:(u=(u=t[2].search(this.rules.other.nonSpaceChar))>4?1:u,a=s.slice(u),u+=t[1].length),c&&this.rules.other.blankLine.test(d)&&(r+=d+`
`,e=e.substring(d.length+1),n=!0),!n){let t=this.rules.other.nextBulletRegex(u),n=this.rules.other.hrRegex(u),o=this.rules.other.fencesBeginRegex(u),i=this.rules.other.headingBeginRegex(u),l=this.rules.other.htmlBeginRegex(u);for(;e;){let p=e.split(`
`,1)[0],h;if(d=p,h=this.options.pedantic?d=d.replace(this.rules.other.listReplaceNesting,"  "):d.replace(this.rules.other.tabCharGlobal,"    "),o.test(d)||i.test(d)||l.test(d)||t.test(d)||n.test(d))break;if(h.search(this.rules.other.nonSpaceChar)>=u||!d.trim())a+=`
`+h.slice(u);else{if(c||s.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||o.test(s)||i.test(s)||n.test(s))break;a+=`
`+d}c||d.trim()||(c=!0),r+=p+`
`,e=e.substring(p.length+1),s=h.slice(u)}}o.loose||(l?o.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(l=!0));let p=null,h;this.options.gfm&&(p=this.rules.other.listIsTask.exec(a))&&(h="[ ] "!==p[0],a=a.replace(this.rules.other.listReplaceTask,"")),o.items.push({type:"list_item",raw:r,task:!!p,checked:h,loose:!1,text:a,tokens:[]}),o.raw+=r}let a=o.items.at(-1);if(!a)return;a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd(),o.raw=o.raw.trimEnd();for(let e=0;e<o.items.length;e++)if(this.lexer.state.top=!1,o.items[e].tokens=this.lexer.blockTokens(o.items[e].text,[]),!o.loose){let t=o.items[e].tokens.filter(e=>"space"===e.type);o.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}if(o.loose)for(let e=0;e<o.items.length;e++)o.items[e].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=eW(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?i.align.push("right"):this.rules.other.tableAlignCenter.test(e)?i.align.push("center"):this.rules.other.tableAlignLeft.test(e)?i.align.push("left"):i.align.push(null);for(let e=0;e<n.length;e++)i.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:i.align[e]});for(let e of o)i.rows.push(eW(e,i.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:i.align[t]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=eY(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{let e=function(e,t){if(-1===e.indexOf(")"))return -1;let n=0;for(let r=0;r<e.length;r++)if("\\"===e[r])r++;else if("("===e[r])n++;else if(e[r]===t[1]&&--n<0)return r;return n>0?-2:-1}(t[2],"()");if(-2===e)return;if(e>-1){let n=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=""}}let n=t[2],r="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(n);e&&(n=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(n=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?n.slice(1):n.slice(1,-1)),eZ(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=t[(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!e){let e=n[0].charAt(0);return{type:"text",raw:e,text:e}}return eZ(n,e,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,o,i,l=n,a=0,s="*"===r[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(s.lastIndex=0,t=t.slice(-1*e.length+n);null!=(r=s.exec(t));){if(!(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6]))continue;if(i=[...o].length,r[3]||r[4]){l+=i;continue}if((r[5]||r[6])&&n%3&&!((n+i)%3)){a+=i;continue}if((l-=i)>0)continue;i=Math.min(i,i+l+a);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+i);if(Math.min(n,i)%2){let e=s.slice(1,-1);return{type:"em",raw:s,text:e,tokens:this.lexer.inlineTokens(e)}}let d=s.slice(2,-2);return{type:"strong",raw:s,text:d,tokens:this.lexer.inlineTokens(d)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return n="@"===t[2]?"mailto:"+(e=t[1]):e=t[1],{type:"link",raw:t[0],text:e,href:n,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if("@"===t[2])n="mailto:"+(e=t[0]);else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(r!==t[0]);e=t[0],n="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:n,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},eV=class e{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Y,this.options.tokenizer=this.options.tokenizer||new eU,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:V,block:eO.normal,inline:ej.normal};this.options.pedantic?(t.block=eO.pedantic,t.inline=ej.pedantic):this.options.gfm&&(t.block=eO.gfm,this.options.breaks?t.inline=ej.breaks:t.inline=ej.gfm),this.tokenizer.rules=t}static get rules(){return{block:eO,inline:ej}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(V.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){for(this.options.pedantic&&(e=e.replace(V.tabCharGlobal,"    ").replace(V.spaceLine,""));e;){let r;if(this.options.extensions?.block?.some(n=>!!(r=n.call({lexer:this},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let n=t.at(-1);1===r.raw.length&&void 0!==n?n.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type==="paragraph"||n?.type==="text"?(n.raw+=(n.raw.endsWith(`
`)?"":`
`)+r.raw,n.text+=`
`+r.text,this.inlineQueue.at(-1).src=n.text):t.push(r);continue}if((r=this.tokenizer.fences(e))||(r=this.tokenizer.heading(e))||(r=this.tokenizer.hr(e))||(r=this.tokenizer.blockquote(e))||(r=this.tokenizer.list(e))||(r=this.tokenizer.html(e))){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type==="paragraph"||n?.type==="text"?(n.raw+=(n.raw.endsWith(`
`)?"":`
`)+r.raw,n.text+=`
`+r.raw,this.inlineQueue.at(-1).src=n.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if((r=this.tokenizer.table(e))||(r=this.tokenizer.lheading(e))){e=e.substring(r.raw.length),t.push(r);continue}let o=e;if(this.options.extensions?.startBlock){let t=1/0,n=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{"number"==typeof(r=e.call({lexer:this},n))&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(o=e.substring(0,t+1))}if(this.state.top&&(r=this.tokenizer.paragraph(o))){let i=t.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(r),n=o.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type==="text"?(n.raw+=(n.raw.endsWith(`
`)?"":`
`)+r.raw,n.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(r);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n=e,r=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(r=this.tokenizer.rules.inline.reflinkSearch.exec(n));)e.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(r=this.tokenizer.rules.inline.anyPunctuation.exec(n));)n=n.slice(0,r.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!=(r=this.tokenizer.rules.inline.blockSkip.exec(n));)n=n.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let o=!1,i="";for(;e;){let r;if(o||(i=""),o=!1,this.options.extensions?.inline?.some(n=>!!(r=n.call({lexer:this},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)))continue;if((r=this.tokenizer.escape(e))||(r=this.tokenizer.tag(e))||(r=this.tokenizer.link(e))){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(r.raw.length);let n=t.at(-1);"text"===r.type&&n?.type==="text"?(n.raw+=r.raw,n.text+=r.text):t.push(r);continue}if((r=this.tokenizer.emStrong(e,n,i))||(r=this.tokenizer.codespan(e))||(r=this.tokenizer.br(e))||(r=this.tokenizer.del(e))||(r=this.tokenizer.autolink(e))||!this.state.inLink&&(r=this.tokenizer.url(e))){e=e.substring(r.raw.length),t.push(r);continue}let l=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{"number"==typeof(r=e.call({lexer:this},n))&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(l=e.substring(0,t+1))}if(r=this.tokenizer.inlineText(l)){e=e.substring(r.raw.length),"_"!==r.raw.slice(-1)&&(i=r.raw.slice(-1)),o=!0;let n=t.at(-1);n?.type==="text"?(n.raw+=r.raw,n.text+=r.text):t.push(r);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw Error(t)}}return t}},eF=class{options;parser;constructor(e){this.options=e||Y}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(V.notSpaceStart)?.[0],o=e.replace(V.endingNewline,"")+`
`;return r?'<pre><code class="language-'+eP(r)+'">'+(n?o:eP(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:eP(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let t=0;t<e.items.length;t++){let n=e.items[t];r+=this.listitem(n)}let o=t?"ol":"ul";return"<"+o+(t&&1!==n?' start="'+n+'"':"")+`>
`+r+"</"+o+`>
`}listitem(e){let t="";if(e.task){let n=this.checkbox({checked:!!e.checked});e.loose?e.tokens[0]?.type==="paragraph"?(e.tokens[0].text=n+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&"text"===e.tokens[0].tokens[0].type&&(e.tokens[0].tokens[0].text=n+" "+eP(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:!0}):t+=n+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let t=0;t<e.header.length;t++)n+=this.tablecell(e.header[t]);t+=this.tablerow({text:n});let r="";for(let t=0;t<e.rows.length;t++){let o=e.rows[t];n="";for(let e=0;e<o.length;e++)n+=this.tablecell(o[e]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${eP(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=eD(e);if(null===o)return r;let i='<a href="'+(e=o)+'"';return t&&(i+=' title="'+eP(t)+'"'),i+=">"+r+"</a>"}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=eD(e);if(null===o)return eP(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${eP(t)}"`),i+=">"}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:eP(e.text)}},eX=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},eQ=class e{options;renderer;textRenderer;constructor(e){this.options=e||Y,this.options.renderer=this.options.renderer||new eF,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new eX}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e,t=!0){let n="";for(let r=0;r<e.length;r++){let o=e[r];if(this.options.extensions?.renderers?.[o.type]){let e=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==e||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){n+=e||"";continue}}switch(o.type){case"space":n+=this.renderer.space(o);continue;case"hr":n+=this.renderer.hr(o);continue;case"heading":n+=this.renderer.heading(o);continue;case"code":n+=this.renderer.code(o);continue;case"table":n+=this.renderer.table(o);continue;case"blockquote":n+=this.renderer.blockquote(o);continue;case"list":n+=this.renderer.list(o);continue;case"html":n+=this.renderer.html(o);continue;case"def":n+=this.renderer.def(o);continue;case"paragraph":n+=this.renderer.paragraph(o);continue;case"text":{let i=o,l=this.renderer.text(i);for(;r+1<e.length&&"text"===e[r+1].type;)i=e[++r],l+=`
`+this.renderer.text(i);t?n+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l,escaped:!0}]}):n+=l;continue}default:{let e='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw Error(e)}}}return n}parseInline(e,t=this.renderer){let n="";for(let r=0;r<e.length;r++){let o=e[r];if(this.options.extensions?.renderers?.[o.type]){let e=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=e||"";continue}}switch(o.type){case"escape":case"text":n+=t.text(o);break;case"html":n+=t.html(o);break;case"link":n+=t.link(o);break;case"image":n+=t.image(o);break;case"strong":n+=t.strong(o);break;case"em":n+=t.em(o);break;case"codespan":n+=t.codespan(o);break;case"br":n+=t.br(o);break;case"del":n+=t.del(o);break;default:{let e='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw Error(e)}}}return n}},eK=class{options;block;constructor(e){this.options=e||Y}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?eV.lex:eV.lexInline}provideParser(){return this.block?eQ.parse:eQ.parseInline}},eG=new class{defaults=W();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=eQ;Renderer=eF;TextRenderer=eX;Lexer=eV;Tokenizer=eU;Hooks=eK;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":for(let e of r.header)n=n.concat(this.walkTokens(e.tokens,t));for(let e of r.rows)for(let r of e)n=n.concat(this.walkTokens(r.tokens,t));break;case"list":n=n.concat(this.walkTokens(r.items,t));break;default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let o=e[r].flat(1/0);n=n.concat(this.walkTokens(o,t))}):e.tokens&&(n=n.concat(this.walkTokens(e.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error("extension name required");if("renderer"in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return!1===r&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw Error("extension level must be 'block' or 'inline'");let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new eF(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if(["options","parser"].includes(n))continue;let r=e.renderer[n],o=t[n];t[n]=(...e)=>{let n=r.apply(t,e);return!1===n&&(n=o.apply(t,e)),n||""}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new eU(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if(["options","rules","lexer"].includes(n))continue;let r=e.tokenizer[n],o=t[n];t[n]=(...e)=>{let n=r.apply(t,e);return!1===n&&(n=o.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new eK;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if(["options","block"].includes(n))continue;let r=e.hooks[n],o=t[n];eK.passThroughHooks.has(n)?t[n]=e=>{if(this.defaults.async&&eK.passThroughHooksRespectAsync.has(n))return Promise.resolve(r.call(t,e)).then(e=>o.call(t,e));let i=r.call(t,e);return o.call(t,i)}:t[n]=(...e)=>{let n=r.apply(t,e);return!1===n&&(n=o.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(r.call(this,e)),t&&(n=n.concat(t.call(this,e))),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return eV.lex(e,t??this.defaults)}parser(e,t){return eQ.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(!0===this.defaults.async&&!1===r.async)return i(Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return i(Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return i(Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=e);let l=o.hooks?o.hooks.provideLexer():e?eV.lex:eV.lexInline,a=o.hooks?o.hooks.provideParser():e?eQ.parse:eQ.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(t):t).then(e=>l(e,o)).then(e=>o.hooks?o.hooks.processAllTokens(e):e).then(e=>o.walkTokens?Promise.all(this.walkTokens(e,o.walkTokens)).then(()=>e):e).then(e=>a(e,o)).then(e=>o.hooks?o.hooks.postprocess(e):e).catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let e=l(t,o);o.hooks&&(e=o.hooks.processAllTokens(e)),o.walkTokens&&this.walkTokens(e,o.walkTokens);let n=a(e,o);return o.hooks&&(n=o.hooks.postprocess(n)),n}catch(e){return i(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e="<p>An error occurred:</p><pre>"+eP(n.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}};function eJ(e,t){return eG.parse(e,t)}eJ.options=eJ.setOptions=function(e){return eG.setOptions(e),eJ.defaults=eG.defaults,Y=eJ.defaults,eJ},eJ.getDefaults=W,eJ.defaults=Y,eJ.use=function(...e){return eG.use(...e),eJ.defaults=eG.defaults,Y=eJ.defaults,eJ},eJ.walkTokens=function(e,t){return eG.walkTokens(e,t)},eJ.parseInline=eG.parseInline,eJ.Parser=eQ,eJ.parser=eQ.parse,eJ.Renderer=eF,eJ.TextRenderer=eX,eJ.Lexer=eV,eJ.lexer=eV.lex,eJ.Tokenizer=eU,eJ.Hooks=eK,eJ.parse=eJ,eJ.options,eJ.setOptions,eJ.use,eJ.walkTokens,eJ.parseInline,eQ.parse,eV.lex;let e0=[],e1=[],e2=[],e3=[],e4=[],e5={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e6=RegExp(`[${Object.keys(e5).join("")}]`,"g"),e9=e=>e.replace(e6,e=>e5[e]),e7=(e,t)=>{let n=t.trim();return/^<\/?(ul|ol|li|h|p|bl|table|tbody|tr|td|th|caption)/i.test(n)||""===n?`
${t}
`:`
<p>
${n}
</p>
`},e8=e=>{if(0===e.length)return"";let t="",n=[];for(let r=0;r<e.length;r++){let o=e[r],i=r<e.length-1?e[r+1]:null;for(;n.length>0&&n[n.length-1].level>o.level;){let e=n.pop();e.hasOpenLi&&(t+="</li>"),t+=`</${e.type}>`}if(n.length>0&&n[n.length-1].level===o.level&&n[n.length-1].type!==o.type){let e=n.pop();e.hasOpenLi&&(t+="</li>"),t+=`</${e.type}>`}(0===n.length||n[n.length-1].level<o.level)&&(t+=`<${o.type}>`,n.push({type:o.type,level:o.level,hasOpenLi:!1})),n.length>0&&n[n.length-1].hasOpenLi&&n[n.length-1].level===o.level&&(t+="</li>",n[n.length-1].hasOpenLi=!1),t+=`<li>${o.content}`,n[n.length-1].hasOpenLi=!0,(!i||i.level<=o.level)&&(t+="</li>",n[n.length-1].hasOpenLi=!1)}for(;n.length>0;){let e=n.pop();e.hasOpenLi&&(t+="</li>"),t+=`</${e.type}>`}return t},te=(e,t,n,r="")=>{let o=n.split("|").filter((e,t,n)=>t>0&&t<n.length-1).map(e=>/:-+:/g.test(e)?"center":/-+:/g.test(e)?"right":/:-+/.test(e)?"left":""),i=e=>{let t=o[e];return t?` align="${t}"`:""},l=t.split("|").slice(1,-1),a=l.map(e=>e.trim()),s=[],d=0;for(let e=0;e<a.length;e++){if(d>0){d--;continue}let t=a[e];if(t&&t.length){let n=1,r=!1;for(let t=e+1;t<a.length&&0===a[t].length;t++)if(""===l[t]){r=!0;break}if(r)for(let t=e+1;t<a.length&&0===a[t].length;t++)n++;n>1?(d=n-1,s.push(`<th${i(e)} colspan="${n}">${t}</th>`)):s.push(`<th${i(e)}>${t}</th>`)}else s.push(`<th${i(e)}></th>`)}return`
<table><tbody><tr>
  ${s.join("\n  ")}
</tr>
${r.split("\n").map(e=>e.trim()).filter(e=>e&&e.length).map(e=>{let t=e.split("|").slice(1,-1),n=t.map(e=>e.trim()),r=[],o=0;for(let e=0;e<n.length;e++){if(o>0){o--;continue}let l=n[e];if(l&&l.length){let a=1,s=!1;for(let r=e+1;r<n.length&&0===n[r].length;r++)if(""===t[r]){s=!0;break}if(s)for(let t=e+1;t<n.length&&0===n[t].length;t++)a++;a>1?(o=a-1,r.push(`<td${i(e)} colspan="${a}">${l}</td>`)):r.push(`<td${i(e)}>${l}</td>`)}else r.push(`<td${i(e)}></td>`)}return`<tr>
  ${r.join("\n  ")}
</tr>
`}).join("")}</tbody></table>
`},tt=[[/\r\n/g,"\n"],[/\n(#+)(.*)/g,(e,t,n="")=>{let r=t.length;return`<h${r}>${n.trim()}</h${r}>`}],[/!\[([^\[]+)\]\((?:javascript:)?([^\)]+)\)/g,'<img src="$2" alt="$1">'],[/\[([^\[]+)\]\((?:javascript:)?([^\)]+)\)/g,'<a href="$2">$1</a>'],[/([^\\])(\*\*|__)(.*?(_|\*)?)\2/g,"$1<strong>$3</strong>"],[/([^\\])(\*|_)(.*?)\2/g,"$1<em>$3</em>"],[/\\_/g,"&#95;"],[/\~\~(.*?)\~\~/g,"<del>$1</del>"],[/\:\"(.*?)\"\:/g,"<q>$1</q>"],[/\n-{3,}/g,"\n<hr />"],[/\n( *)[-*+] \[([xX ])\](.*)/g,(e,t,n,r)=>`
{{LISTITEM:ul:${Math.floor(t.length/2)}:<input type="checkbox"${"x"===n.toLowerCase()?" checked":""} disabled> ${r.trim()}}}
`],[/\n( *)(\*|-|\+)(.*)/g,(e,t,n,r)=>`
{{LISTITEM:ul:${Math.floor(t.length/2)}:${r.trim()}}}
`],[/\n( *)([0-9]+\.) (.*)/g,(e,t,n,r)=>`
{{LISTITEM:ol:${Math.floor(t.length/2)}:${r.trim()}}}
`],[/\n(&gt;|\>)(.*)/g,(e,t,n="")=>`
<blockquote>${n.trim()}</blockquote>`],[/(\^)(.*?)\1/g,"<sup>$2</sup>"],[/(\~)(.*?)\1/g,"<sub>$2</sub>"],[/\n\[(.+?)\]\n( *\|[^\n]+\|\r?\n)((?: *\|:?[ -]+:?)+ *\|)(\n(?: *\|[^\n]+\|\r?\n?)*)?/g,(e,t,n,r,o="")=>te(0,n,r,o).replace("<table>",`<table><caption>${t.trim()}</caption>`)],[/( *\|[^\n]+\|\r?\n)((?: *\|:?[ -]+:?)+ *\|)(\n(?: *\|[^\n]+\|\r?\n?)*)?/g,te],[/\[\^([^\]]+)\](?!:)/g,(e,t)=>`<sup id="fnref:${t}"><a href="#fn:${t}">[${t}]</a></sup>`],[/\[\^([^\]]+)\]:\s*((?:[^\n]*\n?)*)/g,(e,t,n)=>(e4.push([t,n.trim()]),"")],[/\n([A-Z][A-Za-z\s]*?)\s:\s*([A-Z][^\n]*)/g,(e,t,n)=>`
<dl><dt>${t.trim()}</dt><dd>${n.trim()}</dd></dl>
`]],tn=[[/\s?<\/[ou]l>\s?<[ou]l>/g,"",3],[/<\/blockquote>\n<blockquote>/g,"<br>\n"],[/https?:\/\/[^"']*/g,e=>e.replace(/<\/?em>/g,"_")],[/&#95;/g,"_"]];eJ.setOptions({gfm:!0,breaks:!0,pedantic:!1});var tr={markdownToHtml:function(e){return e&&""!==e.trim()?eJ.parse(e):""}},to={markdownToHtml:function(e){return e&&""!==e.trim()?((e,t=!1,n=!1)=>(e0.length=0,e1.length=0,e2.length=0,e3.length=0,e4.length=0,e=(e=(e=(e=`
${e}
`.replace(/\n\s*```\w*\n([^]*?)\n\s*```\s*\n/g,(e,t)=>(e0.push(t),`
<pre>{{CODEBLOCKPH${e0.length-1}}}</pre>
`))).replace(/\n\s*\$\$([^]*?)\$\$\s*\n/g,(e,t)=>(e2.push(t.trim()),`
{{MATHBLOCKPH${e2.length-1}}}
`))).replace(/`([^`]+)`/g,(e,t)=>(e1.push(t),`{{INLINECODEPH${e1.length-1}}}`))).replace(/\$([^$\n]+)\$/g,(e,t)=>(e3.push(t),`{{INLINEMATHPH${e3.length-1}}}`)),tt.forEach(([t,n,r=1])=>{for(let o=0;o<r;o++)e=e.replace(t,n)}),e=(e=(e=>{if(!e.includes("{{LISTITEM:"))return e;let t=e.split("\n"),n=[],r=[],o=!1;for(let e of t){let t=e.match(/\{\{LISTITEM:([^:]+):([^:]+):(.+)\}\}/);if(t){let i=t[1],l=parseInt(t[2]);if(o&&r.length>0){let e=r[r.length-1];e.type!==i&&e.level===l&&(n.push([...r]),r=[])}r.push({type:i,level:l,content:t[3],originalLine:e}),o=!1}else""!==e.trim()?(r.length>0&&(n.push([...r]),r=[]),o=!1):""===e.trim()&&(o=!0)}if(r.length>0&&n.push(r),0===n.length)return e;for(let t of n){let n=e8(t);e=e.replace(t[0].originalLine,n);for(let n=1;n<t.length;n++)e=e.replace(t[n].originalLine,"")}return e})(e)).replace(/\n([^\n]+)\n/g,e7),tn.forEach(([t,n,r=1])=>{for(let o=0;o<r;o++)e=e.replace(t,n)}),e=(e=(e=(e=(e=e.replace(/<pre>{{CODEBLOCKPH(\d+)}}<\/pre>/g,(e,t)=>{let n=e0[parseInt(t)];return`<pre>${e9(n)}</pre>`})).replace(/{{MATHBLOCKPH(\d+)}}/g,(e,t)=>{let n=e2[parseInt(t)];return`<div class="math-block">${e9(n)}</div>`})).replace(/{{INLINECODEPH(\d+)}}/g,(e,t)=>{let n=e1[parseInt(t)];return`<code>${e9(n)}</code>`})).replace(/{{INLINEMATHPH(\d+)}}/g,(e,t)=>{let n=e3[parseInt(t)];return`<span class="math-inline">${e9(n)}</span>`})).trim()+(0===e4.length?"":`
<div class="footnotes">
  <hr>
  <ol>
    ${e4.map(([e,t])=>`
    <li id="fn:${e}">
      ${t}
      <sup><a href="#fnref:${e}">↩</a></sup>
    </li>`).join("\n")}
  </ol>
</div>`),t&&(e=e.replace(/^<p>([\s\S]*)<\/p>$/,"$1")),n&&(e=e.replace(/<a href="/g,'<a target="_blank" href="')),e))(e):""}};function ti(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){var r;r=n[t],t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r})}return e}function tl(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n})(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}t().mount(document.body,function(){var e={editor1:{mode:"wysiwyg",content:"# Welcome to the Mithril Markdown Editor\n\nThis is a **powerful** WYSIWYG markdown editor built with *Mithril.js*.\n\n## Features\n\n- **Dual Mode**: Switch between WYSIWYG and Markdown modes\n- **Theme Support**: Light and dark themes\n- **Rich Toolbar**: Full formatting options\n- **Real-time Preview**: See your markdown rendered instantly\n- **Pluggable Renderers**: Use marked.js or slimdown-js\n\n### Formatting Examples\n\nYou can format text in many ways:\n\n- **Bold text**\n- *Italic text*\n- ~~Strikethrough text~~\n- `Inline code`\n- [Links](https://mithril.js.org)\n\n### Code Blocks\n\n```javascript\nconst editor = {\n  theme: 'light',\n  mode: 'wysiwyg',\n  content: 'Hello world!'\n};\n```\n\n### Lists\n\n1. First item\n2. Second item\n3. Third item\n\n- Unordered item\n- Another item\n- Last item\n\n### Tables\n\n| Feature | Supported |\n|---------|-----------|\n| Bold | ✅ |\n| Italic | ✅ |\n| Links | ✅ |\n| Tables | ✅ |\n\n> This is a blockquote. It can contain multiple lines and **formatted text**.\n\n---\n\nTry switching between **Visual** and **Markdown** modes to see the editor in action!",theme:"light",isPreview:!1,renderer:"marked"},editor2:{mode:"markdown",content:"# Simple Editor with slimdown-js\n\nThis editor uses **slimdown-js** for rendering.",theme:"light",isPreview:!1,renderer:"slimdown"}},n=function(n){e.editor1=ti({},e.editor1,n),t().redraw()},r=function(n){e.editor2=ti({},e.editor2,n),t().redraw()},o=function(){var t="light"===e.editor1.theme?"dark":"light";n({theme:t}),r({theme:t}),document.body.className="dark"===t?"dark-theme":""},i=function(){n({isPreview:!e.editor1.isPreview})},l=function(){n({renderer:"marked"===e.editor1.renderer?"slimdown":"marked"})},a=function(e){return"marked"===e?tr:to};return{view:function(){return[t()("div.container",[t()("div.header",[t()("h1","Mithril Markdown WYSIWYG Editor"),t()("p","A powerful WYSIWYG markdown editor built with Mithril.js")]),t()("div.demo-section",[t()("h2","Editor with ".concat(e.editor1.renderer," renderer")),t()("div.controls",[t()("button.theme-toggle",{onclick:o},"Toggle Theme"),t()("button.theme-toggle",{onclick:i},"Toggle Preview"),t()("button.theme-toggle",{onclick:l},"Switch to ".concat("marked"===e.editor1.renderer?"slimdown":"marked"))]),t()($,tl(ti({mode:e.editor1.mode,content:e.editor1.content,theme:e.editor1.theme,isPreview:e.editor1.isPreview,toolbar:!0,placeholder:"Start writing..."},a(e.editor1.renderer)),{onContentChange:function(e){n({content:e}),console.log("Editor 1 content changed:",e.length,"characters")},onModeChange:function(e){n({mode:e})}}))]),t()("div.demo-section",[t()("h2","Minimal Editor with ".concat(e.editor2.renderer," renderer (No Toolbar)")),t()($,tl(ti({mode:e.editor2.mode,content:e.editor2.content,theme:e.editor2.theme,isPreview:e.editor2.isPreview,toolbar:!1,placeholder:"Type your markdown here..."},a(e.editor2.renderer)),{onContentChange:function(e){r({content:e})},onModeChange:function(e){r({mode:e})}}))]),t()("div.demo-section",[t()("h2","Usage Examples"),t()("div",[t()("h3","Basic Setup"),t()("pre",t()("code",'import m from "mithril";\nimport { MarkdownEditor } from "mithril-markdown-wysiwyg";\nimport "mithril-markdown-wysiwyg/dist/index.css";\n\nconst App = () => {\n  let content = "# Hello World";\n\n  return {\n    view: () =>\n      m(MarkdownEditor, {\n        content,\n        onContentChange: (newContent) => {\n          content = newContent;\n        },\n        placeholder: "Start writing...",\n        theme: "light",\n        toolbar: true,\n        showTabs: true\n      })\n  };\n};')),t()("h3","With Custom Renderer"),t()("pre",t()("code",'import { marked } from "marked";\n\nconst App = () => {\n  let content = "";\n\n  return {\n    view: () =>\n      m(MarkdownEditor, {\n        content,\n        onContentChange: (newContent) => content = newContent,\n        markdownToHtml: (markdown) => marked.parse(markdown),\n        theme: "dark"\n      })\n  };\n};')),t()("h3","Configuration Options"),t()("pre",t()("code",'interface MarkdownEditorAttrs {\n  content: string;                           // Required\n  mode?: "wysiwyg" | "markdown";            // Default: "wysiwyg"\n  theme?: "light" | "dark";                 // Default: "light"\n  toolbar?: boolean;                        // Default: true\n  showTabs?: boolean;                       // Default: true\n  isPreview?: boolean;                      // Default: false\n  placeholder?: string;\n  markdownToHtml?: (md: string) => string;  // Optional renderer\n  htmlToMarkdown?: (html: string) => string; // Optional converter\n  onContentChange?: (content: string) => void;\n  onModeChange?: (mode: string) => void;\n}'))])]),t()("div.demo-section",[t()("h2","About the Implementation"),t()("div",[t()("h3","Key Features:"),t()("ul",[t()("li","\uD83D\uDD27 Dependency injection: markdown renderers are injected, not bundled"),t()("li","\uD83D\uDD04 No conversion corruption: content is preserved when switching modes"),t()("li","\uD83D\uDD0C Pluggable renderers: Use marked.js, slimdown-js, or any custom renderer"),t()("li","\uD83D\uDCE6 Clean architecture: lib has zero dependencies"),t()("li","\uD83D\uDEE0️ Full toolbar with proper grouping and separators"),t()("li","\uD83C\uDF13 Dark theme support with proper contrast"),t()("li","\uD83D\uDCF1 Responsive design for mobile and desktop"),t()("li","♿ Keyboard navigation and accessibility support"),t()("li","\uD83C\uDF9B️ Configurable UI: hide tabs, toolbar, or customize themes"),t()("li","\uD83D\uDD0D Built-in empty content handling")]),t()("h3","Renderers:"),t()("ul",[t()("li",[t()("strong","marked.js"),": Full-featured GitHub-flavored markdown with table support"]),t()("li",[t()("strong","slimdown-js"),": Lightweight, fast markdown renderer"]),t()("li",[t()("strong","Custom"),": Bring your own renderer - any function that converts markdown to HTML"])])])])])]}}})})()})();
//# sourceMappingURL=bundle.fcca05b3298d68c8.js.map