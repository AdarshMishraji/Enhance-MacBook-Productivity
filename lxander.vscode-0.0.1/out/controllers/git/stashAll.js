"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { gitStashAll, getUncommitedChanges } = require("../../helpers/git");
const { showInputBox, showInfo } = require("../../helpers/vscode");

const askForStashMessage = (currentRepoName) => showInputBox("Stash Message", `Enter stash message for ${currentRepoName}\n`, { errorMessage: "Stash message must be at least 3 characters long", minLength: 3 });

const stashAll = async ({ cwd, currentRepoName }) => {
  const isUncommitedChangesExists = (await getUncommitedChanges(cwd)).length > 0;
  if (isUncommitedChangesExists) {
    const stashMessage = await askForStashMessage(currentRepoName)
    gitStashAll(cwd, stashMessage);
  } else {
    showInfo("There are no uncommited changes to stash");
  }
}

module.exports = {
  stashAll,
};