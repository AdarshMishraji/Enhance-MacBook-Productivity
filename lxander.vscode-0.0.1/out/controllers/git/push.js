"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { getUncommitedChanges, gitPush, getUnpushedCommits } = require('../../helpers/git');
const { getConfirmationInBoolean, showError } = require('../../helpers/vscode');
const { commit } = require('./commit');

const shouldPush = (cwdName, currentBranch) => getConfirmationInBoolean(`Are you sure you want to push changes to ${cwdName} on branch ${currentBranch}?`);

const shouldCommitBeforePush = (cwdName, currentBranch) => getConfirmationInBoolean(`There are uncommited changes in ${cwdName} on branch ${currentBranch}. Would you like to commit them before push?`);

const pushOp = async (cwd, currentBranch, bypassConfirmation) => {
  const isUnpushedCommitsExists = (await getUnpushedCommits(cwd, currentBranch)).length > 0;
  if (isUnpushedCommitsExists) {
    const confirmation = bypassConfirmation || await shouldPush(cwdName, currentBranch);
    if (confirmation) {
      gitPush(cwd, currentBranch);
    }
  } else {
    showError("There are no unpushed commits to push");
  }
}

const push = async ({ cwd, cwdName, currentBranch }) => {
  const isUncommitedChangesExists = (await getUncommitedChanges(cwd)).length > 0;

  if (isUncommitedChangesExists) {
    const confirmation = await shouldCommitBeforePush(cwdName, currentBranch);
    if (confirmation) {
      await commit({ cwd, cwdName, currentBranch, isUncommitedChangesExists })
      pushOp(cwd, currentBranch, true)
    }
  } else {
    pushOp(cwd, currentBranch)
  }
};

module.exports = {
  push,
};