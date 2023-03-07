"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { window, workspace, commands, env, ProgressLocation, } = require("vscode");

const processWithProgress = async (title, process) => {
  await window.withProgress({
    cancellable: false,
    location: ProgressLocation.Notification,
    title,
  }, async (progress, token) => {
    await process(progress, token);
  });
}

const showInfo = (message) =>
  window.showInformationMessage(message);

const showError = (message) =>
  window.showErrorMessage(message);

const showConfirmationDialog = (message, ...options) =>
  window.showInformationMessage(message, { modal: true }, ...options);

const getConfirmationInBoolean = async (message) => {
  const confirmation = await showConfirmationDialog(message, 'Yes', 'No');
  return confirmation === 'Yes';
}

const registerCommand = (context, command, callback) => {
  const disposable = commands.registerCommand(command, callback);
  context.subscriptions.push(disposable);
}

const executeCommand = (command) =>
  commands.executeCommand(command);

const showInputBox = async (title, prompt, { errorMessage, minLength }) =>
  window.showInputBox({ title, prompt, validateInput: (value) => value.length > minLength ? null : errorMessage });

const copyToClipboard = (text) =>
  env.clipboard.writeText(text);

const getActiveCwd = () => {
  const workspaceFolders = workspace.workspaceFolders;

  if (workspaceFolders === undefined || workspaceFolders.length == 0) {
    return null;
  }

  if (workspaceFolders.length == 1 || window.activeTextEditor === undefined) {
    return workspaceFolders[0].uri.fsPath;
  }

  const currentDocument = window.activeTextEditor.document.uri.fsPath;
  const folder = workspaceFolders.find(w => currentDocument.startsWith(w.uri.fsPath));

  if (!folder) {
    throw new Error('No file is open');
  }
  return folder.uri.fsPath;
};

const getCwdName = (cwd) => cwd.split('/').pop();

module.exports = {
  processWithProgress,
  showInfo,
  showError,
  showConfirmationDialog,
  registerCommand,
  executeCommand,
  showInputBox,
  copyToClipboard,
  getActiveCwd,
  getCwdName,
  getConfirmationInBoolean
};