"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { gitStashAll, getUncommitedChanges } = require("../../helpers/git");
const { showInputBox, showError } = require("../../helpers/vscode");

const askForStashMessage = (cwdName) => showInputBox("Stash Message", `Enter stash message for ${cwdName}\n`, { errorMessage: "Stash message must be at least 3 characters long", minLength: 3 });

const stashAll = async ({ cwd, cwdName }) => {
  const isUncommitedChangesExists = (await getUncommitedChanges(cwd)).length > 0;
  if (isUncommitedChangesExists) {
    const stashMessage = await askForStashMessage(cwdName)
    gitStashAll(cwd, stashMessage);
  } else {
    showError("There are no uncommited changes to stash");
  }
};

module.exports = {
  stashAll,
};