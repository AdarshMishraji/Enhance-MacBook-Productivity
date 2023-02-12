"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { getCurrentRepoName, getCurrentGitBranch } = require('../helpers/git');
const { getCurrentActiveRootDirectory } = require('../helpers/vscode');

const getMetadata = async () => {
  const cwd = getCurrentActiveRootDirectory();
  const currentRepoName = getCurrentRepoName(cwd);
  const currentBranch = await getCurrentGitBranch(cwd);

  return {
    cwd,
    currentRepoName,
    currentBranch
  }
}

const operationWithMetadata = (operation) =>
  async () => {
    const metadata = await getMetadata()
    operation?.(metadata);
  }

module.exports = {
  operationWithMetadata,
}
