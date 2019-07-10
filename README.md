# Canvas LMS Rich Content Editor Enhancements Plug-in

Plugin for the [Canvas LMS theme app](https://github.com/ahsdile/canvas-lms-app) that adds some enhancements to the
rich content editor.

## Installation

Using NPM:

    npm install @auc-ghent/canvas-lms-rich-content-editor-enhancements-plugin

Using Yarn:

    yarn add @auc-ghent/canvas-lms-rich-content-editor-enhancements-plugin

## Usage

Just import the plug-in and add it to the Canvas app:

```javascript
import canvas from '@ahsdile/canvas-lms-app';
import richContentEditorEnhancementsPlugin from '@auc-ghent/canvas-lms-rich-content-editor-enhancements-plugin';

canvas.addPlugin(richContentEditorEnhancementsPlugin);

canvas.run();
```
