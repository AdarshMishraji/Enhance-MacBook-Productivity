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
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let disposable = vscode.workspace.onDidChangeConfiguration(getSettings, this);
    let themeKey = 'workbench.colorTheme';
    let settings = getSettings();
    vscode.commands.registerCommand('extensionTouchBar.night', () => {
        userConfig.update(themeKey, settings.night, true);
    });
    vscode.commands.registerCommand('extensionTouchBar.day', () => {
        userConfig.update(themeKey, settings.day, true);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map