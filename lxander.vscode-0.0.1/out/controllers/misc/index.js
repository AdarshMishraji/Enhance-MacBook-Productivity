"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { executeCommand } = require("../../helpers/vscode");

let focusMode = false;

const enableFocusMode = () => {
  executeCommand('workbench.action.closePanel');
  executeCommand('workbench.action.closeSidebar');
  executeCommand('workbench.action.closeAuxiliaryBar');
  focusMode = true;
}

const disableFocusMode = () => {
  executeCommand('workbench.action.focusPanel');
  executeCommand('workbench.action.focusSideBar');
  executeCommand('workbench.action.focusAuxiliaryBar');
  focusMode = false;
}

const toggleFocusMode = focusMode ? disableFocusMode : enableFocusMode;

module.exports = {
  toggleFocusMode
}