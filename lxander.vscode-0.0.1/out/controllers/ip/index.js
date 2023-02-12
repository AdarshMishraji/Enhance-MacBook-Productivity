"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { window, StatusBarAlignment } = require("vscode");
const { fetchLocalIP } = require("../../helpers/ip");
const { copyToClipboard, showInfo, registerCommand } = require("../../helpers/vscode");

const localIPStatusBarItem = (context) => {
  const statusBarItem = window.createStatusBarItem('lxander.vscode.localIP', StatusBarAlignment.Left, Number.MAX_SAFE_INTEGER);

  registerCommand(context, 'lxander.vscode.touchBar.copyLocalIP', async () => {
    const ip = await fetchLocalIP();
    copyToClipboard(ip);
    statusBarItem.text = `Local IP ${ip}`;
    showInfo("Local IP copied to clipboard");
  });

  statusBarItem.tooltip = 'Local IP Address\nTap to refresh and copy'
  statusBarItem.command = 'lxander.vscode.touchBar.copyLocalIP';

  fetchLocalIP().then((localIP) => {
    statusBarItem.text = `Local IP ${localIP}`;
  });

  return statusBarItem
}

module.exports = {
  localIPStatusBarItem
};