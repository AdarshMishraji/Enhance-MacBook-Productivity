"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { commit } = require("./controllers/git/commit");
const { pull } = require("./controllers/git/pull");
const { push } = require("./controllers/git/push");
const { stashAll } = require("./controllers/git/stashAll");
const { stashLatestApply } = require("./controllers/git/stashLatestApply");
const { registerCommand, showInfo } = require("./helpers/vscode");
const { localIPStatusBarItem } = require("./controllers/ip");
const { operationWithMetadata } = require("./controllers");
const { toggleFocusMode } = require("./controllers/misc");

function activate(context) {
    showInfo('Welcome to VS Code. Enjoy your stay!');

    registerCommand(context, "lxander.vscode.touchBar.gitcommit", operationWithMetadata(commit, { isGitOperation: true }));
    registerCommand(context, "lxander.vscode.touchBar.gitpull", operationWithMetadata(pull, { isGitOperation: true }));
    registerCommand(context, "lxander.vscode.touchBar.gitpush", operationWithMetadata(push, { isGitOperation: true }));
    registerCommand(context, "lxander.vscode.touchBar.stashAll", operationWithMetadata(stashAll, { isGitOperation: true }));
    registerCommand(context, "lxander.vscode.touchBar.stashLatestApply", operationWithMetadata(stashLatestApply, { isGitOperation: true }));
    registerCommand(context, 'lxander.vscode.touchBar.enableFocusMode', toggleFocusMode);

    localIPStatusBarItem(context).show();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

