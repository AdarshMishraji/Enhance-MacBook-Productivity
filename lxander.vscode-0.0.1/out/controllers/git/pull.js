"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { getUncommitedChanges, gitPull, gitStashAll, gitStashLatest } = require("../../helpers/git");
const { getConfirmationInBoolean } = require("../../helpers/vscode");

const shouldPull = (cwdName, currentBranch) => getConfirmationInBoolean(`Are you sure you want to pull changes from ${cwdName} on branch ${currentBranch}?`);

const shouldStashThemBeforePull = (cwdName, currentBranch) => getConfirmationInBoolean(`There are uncommited changes in ${cwdName} on branch ${currentBranch}. Would you like to stash them before pull?`);

const pull = async ({ cwd, cwdName, currentBranch }) => {
  const isUncommitedChangesExists = (await getUncommitedChanges(cwd)).length > 0;

  if (isUncommitedChangesExists) {
    const confirmation = await shouldStashThemBeforePull(cwdName, currentBranch);
    if (confirmation) {
      await gitStashAll(cwd, `Stash before pull ${cwdName} on branch ${currentBranch}`)
      await gitPull(cwd, currentBranch);
      await gitStashLatest(cwd, true)
    } else {
      await gitPull(cwd, currentBranch);
    }
  } else {
    const confirmation = await shouldPull(cwdName, currentBranch)
    if (confirmation) {
      await gitPull(cwd, currentBranch);
    }
  }
};

module.exports = {
  pull,
};