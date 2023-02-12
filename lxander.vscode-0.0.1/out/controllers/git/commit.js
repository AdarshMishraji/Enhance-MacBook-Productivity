"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { gitCommit, getUnstagedChanges, getUncommitedChanges } = require('../../helpers/git');
const { getConfirmationInBoolean, showInputBox, showInfo } = require('../../helpers/vscode');

const askForCommitMessage = (currentRepoName, currentBranch) => showInputBox("Commit Message", `Enter commit message for ${currentRepoName} on branch ${currentBranch}\n`, { errorMessage: "Commit message must be at least 3 characters long", minLength: 3 });

const shouldStageBeforeCommit = (currentRepoName, currentBranch) => getConfirmationInBoolean(`There are unstaged changes in ${currentRepoName} on branch ${currentBranch}. Would you like to stage them before commit?`);

const commitOp = async (cwd, currentRepoName, currentBranch, stageAll, bypassCheckForUncommitedChanges) => {
  const isUncommitedChangesExists = bypassCheckForUncommitedChanges || (await getUncommitedChanges(cwd)).length > 0;
  if (isUncommitedChangesExists) {
    const commitMessage = await askForCommitMessage(currentRepoName, currentBranch)
    gitCommit(cwd, commitMessage, stageAll);
  } else {
    showInfo("There are no uncommited changes to commit");
  }
}

const commit = async ({ cwd, currentRepoName, currentBranch, isUncommitedChangesExists }) => {
  const isUnstagedChangesExists = (await getUnstagedChanges(cwd)).length > 0;

  if (isUnstagedChangesExists) {
    const confirmation = await shouldStageBeforeCommit(currentRepoName, currentBranch);
    if (confirmation) {
      commitOp(cwd, currentRepoName, currentBranch, true, isUncommitedChangesExists)
    }
  } else {
    commitOp(cwd, currentRepoName, currentBranch, false, isUncommitedChangesExists)
  }
}

module.exports = {
  commit,
};