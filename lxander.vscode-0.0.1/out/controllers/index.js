"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { getCurrentGitBranch, isGitInitialized } = require('../helpers/git');
const { getActiveCwd, getCwdName, showError } = require('../helpers/vscode');

const getMetadata = async ({ isGitOperation }) => {
  const cwd = getActiveCwd();
  if (!cwd) {
    showError('No workspace opened');
    return null;
  }
  const cwdName = getCwdName(cwd);

  if (isGitOperation) {
    const isGit = await isGitInitialized(cwd);
    if (!isGit) {
      showError('Git is not initialized');
      return null;
    }
  }

  const currentBranch = isGitOperation ?
    await getCurrentGitBranch(cwd) : null;

  return {
    cwd,
    cwdName,
    currentBranch
  }
}

const operationWithMetadata = (operation, { isGitOperation = false }) =>
  async () => {
    const metadata = await getMetadata({ isGitOperation })
    if (metadata)
      operation?.(metadata);
  }

module.exports = {
  operationWithMetadata,
}
