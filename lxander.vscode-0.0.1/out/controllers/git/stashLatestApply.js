"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { gitStashLatest, getStashList } = require("../../helpers/git");
const { getConfirmationInBoolean, showInfo } = require("../../helpers/vscode");

const shouldApplyLatestStash = (currentRepoName) => getConfirmationInBoolean(`Are you sure you want to apply latest stash for ${currentRepoName}?`);

const stashLatestApply = async ({ cwd, currentRepoName }) => {
  const isStashExists = (await getStashList(cwd)).length > 0;
  if (isStashExists) {
    const confirmation = await shouldApplyLatestStash(currentRepoName);
    if (confirmation) {
      gitStashLatest(cwd);
    }
  } else {
    showInfo("There are no stashes to apply");
  }
}

module.exports = {
  stashLatestApply,
};