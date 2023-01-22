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
    vscode.commands.registerCommand('lxander.touchbar.night', () => {
        userConfig.update(themeKey, settings.night, true);
    });
    vscode.commands.registerCommand('lxander.touchbar.day', () => {
        userConfig.update(themeKey, settings.day, true);
    });

    const syncBranch = vscode.commands.registerCommand("lxander.touchbar.syncBranch", () => {
        vscode.commands.executeCommand("git.sync");
        showInfo("Branch synced");
    });

    const commit = vscode.commands.registerCommand("lxander.touchbar.gitcommit", () => {
        vscode.commands.executeCommand("git.commit");
        showInfo("Changes commited successfully");
    });

    const push = vscode.commands.registerCommand("lxander.touchbar.gitpush", () => {
        vscode.commands.executeCommand("git.push");
        showInfo("Changes pushed successfully");
    });

    const pull = vscode.commands.registerCommand("lxander.touchbar.gitpull", () => {
        vscode.commands.executeCommand("git.pull");
        showInfo("Changes pulled successfully");
    });

    const checkout = vscode.commands.registerCommand("lxander.touchbar.checkoutTo", () => {
        vscode.commands.executeCommand("git.checkout");
    });

    const stageAll = vscode.commands.registerCommand("lxander.touchbar.stageAll", () => {
        vscode.commands.executeCommand("git.stageAll");
        showInfo("Changes Staged");
    });

    const toggleFocusMode = vscode.commands.registerCommand('lxander.touchbar.enableFocusMode', () => {
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
//# sourceMappingURL=lxander.touchbar.js.map
