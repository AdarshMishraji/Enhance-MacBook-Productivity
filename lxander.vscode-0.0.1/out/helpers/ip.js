"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { promisifiedExec } = require('./promise');

const fetchLocalIP = () => {
  return promisifiedExec('ipconfig getifaddr en0',);
};

module.exports = {
  fetchLocalIP
};