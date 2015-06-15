'use strict';

var lstatSync    = require('fs').lstatSync;
var readlinkSync = require('fs').readlinkSync;

function existsSync(path){
  var stats, link;
  try {
    stats = lstatSync(path);
    // if symlink, check if target
    if (stats && stats.isSymbolicLink()) {
      link = readlinkSync(path);
      return existsSync(link);
    }
    return true;
  } catch(e) {
    return checkError(e);
  }
}

function checkError(e) {
    return e && e.code === "ENOENT" ? false : true;
}

module.exports = existsSync;