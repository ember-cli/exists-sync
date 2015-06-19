'use strict';

var lstatSync    = require('fs').lstatSync;
var readlinkSync = require('fs').readlinkSync;

function existsSync(path,parent){
  var stats, link;
  try {
    stats = lstatSync(path);
    // if symlink, check if target
    if (stats && stats.isSymbolicLink()) {
      link = readlinkSync(path);
      if (parent && parent === link) {
        var err = new Error('Circular symlink detected: ' + link);
        throw err;
      }
      return existsSync(link,path);
    }
    return true;
  } catch(e) {
    if (e.message.match(/Circular symlink detected/)) {
      throw e;
    }
    return checkError(e);
  }
}

function checkError(e) {
    return e && e.code === "ENOENT" ? false : true;
}

module.exports = existsSync;