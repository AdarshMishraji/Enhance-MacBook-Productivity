"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { getUncommitedChanges, gitPush, getUnpushedCommits } = require('../../helpers/git');
const { getConfirmationInBoolean, showInfo } = require('../../helpers/vscode');
const { commit } = require('./commit');

const shouldPush = (currentRepoName, currentBranch) => getConfirmationInBoolean(`Are you sure you want to push changes to ${currentRepoName} on branch ${currentBranch}?`);

const shouldCommitBeforePush = (currentRepoName, currentBranch) => getConfirmationInBoolean(`There are uncommited changes in ${currentRepoName} on branch ${currentBranch}. Would you like to commit them before push?`);

const pushOp = async (cwd, currentBranch, bypassConfirmation) => {
  const isUnpushedCommitsExists = (await getUnpushedCommits(cwd, currentBranch)).length > 0;
  if (isUnpushedCommitsExists) {
    const confirmation = bypassConfirmation || await shouldPush(currentRepoName, currentBranch);
    if (confirmation) {
      gitPush(cwd, currentBranch);
    }
  } else {
    showInfo("There are no unpushed commits to push");
  }
}

const push = async ({ cwd, currentRepoName, currentBranch }) => {
  const isUncommitedChangesExists = (await getUncommitedChanges(cwd)).length > 0;

  if (isUncommitedChangesExists) {
    const confirmation = await shouldCommitBeforePush(currentRepoName, currentBranch);
    if (confirmation) {
      await commit({ cwd, currentRepoName, currentBranch, isUncommitedChangesExists })
      pushOp(cwd, currentBranch, true)
    }
  } else {
    pushOp(cwd, currentBranch)
  }
}

module.exports = {
  push,
};