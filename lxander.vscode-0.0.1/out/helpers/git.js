"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { promisifiedExec } = require('./promise');
const { processWithProgress, showInfo } = require('./vscode');

const getCurrentGitBranch = (cwd) => promisifiedExec('git rev-parse --abbrev-ref HEAD', { cwd });

const gitCommit = (cwd, message, stageAll = false) => {
  if (message === undefined) {
    return;
  }
  return processWithProgress('Committing changes...', async () => {
    await promisifiedExec(`git commit ${stageAll ? '-a' : ''} -m "${message}" `, { cwd });
    showInfo("Changes committed successfully");
  });
}

const gitPush = (cwd, currentBranch) => processWithProgress('Pushing changes...', async () => {
  await promisifiedExec(`git push origin ${currentBranch}`, { cwd });
  showInfo("Changes pushed successfully");
});

const gitPull = (cwd, currentBranch) => processWithProgress('Pulling changes...', async () => {
  await promisifiedExec(`git pull origin ${currentBranch}`, { cwd });
  showInfo("Changes pulled successfully");
});

const gitStashAll = async (cwd, stashMessage) => {
  if (stashMessage === undefined) {
    return;
  }
  await promisifiedExec(`git stash save "${stashMessage}" -u`, { cwd });
  showInfo("Stashed");
}

const gitStashLatest = async (cwd, shouldPop) => {
  if (shouldPop) {
    await promisifiedExec('git stash pop', { cwd });
  } else {
    await promisifiedExec('git stash apply stash@{0}', { cwd });
  }
  showInfo("Latest Stash applied");
}

const getUnstagedChanges = (cwd) => promisifiedExec('git --no-pager diff', { cwd });

const getUncommitedChanges = async (cwd) => promisifiedExec('git status --porcelain', { cwd });

const getUnpushedCommits = (cwd, currentBranch) => promisifiedExec(`git --no-pager log origin/${currentBranch}..${currentBranch} `, { cwd });

const getStashList = async (cwd) => promisifiedExec('git --no-pager stash list', { cwd });

const isGitInitialized = async (cwd) => {
  try {
    const res = await promisifiedExec('git rev-parse --is-inside-work-tree', { cwd });
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getCurrentGitBranch,
  gitCommit,
  gitPush,
  gitPull,
  gitStashAll,
  gitStashLatest,
  getUnstagedChanges,
  getUncommitedChanges,
  getUnpushedCommits,
  getStashList,
  isGitInitialized,
};