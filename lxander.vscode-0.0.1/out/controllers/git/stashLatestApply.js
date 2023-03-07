"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { gitStashLatest, getStashList } = require("../../helpers/git");
const { getConfirmationInBoolean, showError } = require("../../helpers/vscode");

const shouldApplyLatestStash = (cwdName) => getConfirmationInBoolean(`Are you sure you want to apply latest stash for ${cwdName}?`);

const stashLatestApply = async ({ cwd, cwdName }) => {
  const isStashExists = (await getStashList(cwd)).length > 0;
  if (isStashExists) {
    const confirmation = await shouldApplyLatestStash(cwdName);
    if (confirmation) {
      gitStashLatest(cwd);
    }
  } else {
    showError("There are no stashes to apply");
  }
};

module.exports = {
  stashLatestApply,
};