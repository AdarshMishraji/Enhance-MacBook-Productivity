"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const userConfig = vscode.workspace.getConfiguration();
const getSettings = () => {
    let extensionConfig = vscode.workspace.getConfiguration('touchBar');
    return {
        night: extensionConfig.nightTheme,
        day: extensionConfig.dayTheme
    };
};

const showInfo = (infoMsg) =>
    vscode.window.showInformationMessage(infoMsg);

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let disposable = vscode.workspace.onDidChangeConfiguration(getSettings, this);
    let themeKey = 'workbench.colorTheme';
    let settings = getSettings();
    vscode.commands.registerCommand('lxander.vscode.touchBar.night', () => {
        userConfig.update(themeKey, settings.night, true);
    });
    vscode.commands.registerCommand('lxander.vscode.touchBar.day', () => {
        userConfig.update(themeKey, settings.day, true);
    });

    const syncBranch = vscode.commands.registerCommand("lxander.vscode.touchBar.syncBranch", () => {
        vscode.commands.executeCommand("git.sync");
        showInfo("Branch synced");
    });

    const commit = vscode.commands.registerCommand("lxander.vscode.touchBar.gitcommit", () => {
        vscode.commands.executeCommand("git.commit");
        showInfo("Changes commited successfully");
    });

    const push = vscode.commands.registerCommand("lxander.vscode.touchBar.gitpush", () => {
        vscode.commands.executeCommand("git.push");
        showInfo("Changes pushed successfully");
    });

    const pull = vscode.commands.registerCommand("lxander.vscode.touchBar.gitpull", () => {
        vscode.commands.executeCommand("git.pull");
        showInfo("Changes pulled successfully");
    });

    const checkout = vscode.commands.registerCommand("lxander.vscode.touchBar.checkoutTo", () => {
        vscode.commands.executeCommand("git.checkout");
    });

    const stageAll = vscode.commands.registerCommand("lxander.vscode.touchBar.stageAll", () => {
        vscode.commands.executeCommand("git.stageAll");
        showInfo("Changes Staged");
    });

    const toggleFocusMode = vscode.commands.registerCommand('lxander.vscode.touchBar.enableFocusMode', () => {
        vscode.commands.executeCommand('workbench.action.closePanel');
        vscode.commands.executeCommand('workbench.action.closeSidebar');
        vscode.commands.executeCommand('workbench.action.closeAuxiliaryBar');
    });
    context.subscriptions.push(disposable, toggleFocusMode, syncBranch, commit, push, pull, closeGit, checkout, stageAll);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=lxander.vscode.touchBar.js.map
