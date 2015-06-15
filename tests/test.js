'use strict';

var fs     = require('fs-extra');
var path   = require('path');
var expect = require('chai').expect;
var exists = require('../');

var tmp;

describe('exists-sync', function() {
  beforeEach(function() {
    fs.mkdirsSync('./tmp');
    fs.mkdirsSync('./tmp/fixtures');
  });
  
  afterEach(function() {
    fs.deleteSync('./tmp');
  });
  
  it('verifies files exist', function() {
    expect(exists('./README.md')).to.be.true;
    expect(exists('./taco.js')).to.be.false;
  });
  
  it('works with symlinks', function() {
    fs.symlinkSync('./tests/fixtures/taco.js', './tmp/taco.js');
    expect(exists('./tmp/taco.js')).to.be.true;
    fs.unlinkSync('./tmp/taco.js');
    expect(exists('./tmp/taco.js')).to.be.false;
  });
  
  it('verifies symlink targets', function() {
    var buff = fs.readFileSync('./tests/fixtures/taco.js');
    fs.writeFileSync('./tmp/fixtures/burrito.js', buff);
    expect(exists('./tmp/fixtures/burrito.js'), 'copied').to.be.true;
    fs.symlinkSync('./tmp/fixtures/burrito.js', './tmp/burrito.js');
    expect(exists('./tmp/burrito.js'), 'symlink added').to.be.true;
    fs.deleteSync('./tmp/fixtures/burrito.js');
    expect(exists('./tmp/burrito.js'), 'symlink gone').to.be.false;
    fs.unlinkSync('./tmp/burrito.js');
  });
  
  it('verifies symlinked symlinks', function() {
    var buff = fs.readFileSync('./tests/fixtures/taco.js');
    fs.writeFileSync('./tmp/fixtures/burrito.js', buff);
    expect(exists('./tmp/fixtures/burrito.js'), 'copied').to.be.true;
    fs.symlinkSync('./tmp/fixtures/burrito.js', './tmp/burrito.js');
    expect(exists('./tmp/burrito.js'), 'symlink added').to.be.true;
    fs.symlinkSync('./tmp/burrito.js', './tmp/chalupa.js');
    expect(exists('./tmp/chalupa.js'), 'i heard you like symlinks').to.be.true;
    fs.deleteSync('./tmp/fixtures/burrito.js');
    expect(exists('./tmp/burrito.js'), 'symlink gone').to.be.false;
    fs.unlinkSync('./tmp/chalupa.js');
    fs.unlinkSync('./tmp/burrito.js');
  });
});