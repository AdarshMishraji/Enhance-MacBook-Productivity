"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { gitCommit, getUnstagedChanges, getUncommitedChanges } = require('../../helpers/git');
const { getConfirmationInBoolean, showInputBox, showError } = require('../../helpers/vscode');

const askForCommitMessage = (cwdName, currentBranch) => showInputBox("Commit Message", `Enter commit message for ${cwdName} on branch ${currentBranch}\n`, { errorMessage: "Commit message must be at least 3 characters long", minLength: 3 });

const shouldStageBeforeCommit = (cwdName, currentBranch) => getConfirmationInBoolean(`There are unstaged changes in ${cwdName} on branch ${currentBranch}. Would you like to stage them before commit?`);

const commitOp = async (cwd, cwdName, currentBranch, stageAll, bypassCheckForUncommitedChanges) => {
  const isUncommitedChangesExists = bypassCheckForUncommitedChanges || (await getUncommitedChanges(cwd)).length > 0;
  if (isUncommitedChangesExists) {
    const commitMessage = await askForCommitMessage(cwdName, currentBranch)
    gitCommit(cwd, commitMessage, stageAll);
  } else {
    showError("There are no uncommited changes to commit");
  }
}

const commit = async ({ cwd, cwdName, currentBranch, isUncommitedChangesExists }) => {
  const isUnstagedChangesExists = (await getUnstagedChanges(cwd)).length > 0;

  if (isUnstagedChangesExists) {
    const confirmation = await shouldStageBeforeCommit(cwdName, currentBranch);

    if (confirmation) {
      commitOp(cwd, cwdName, currentBranch, true, isUncommitedChangesExists)
    }
  } else {
    commitOp(cwd, cwdName, currentBranch, false, isUncommitedChangesExists)
  }
};

module.exports = {
  commit,
};