"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { exec } = require('child_process');

const promisifiedExec = (command, options) => {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout.toString().trim());
    });
  });
};


module.exports = {
  promisifiedExec,
};