'use strict';

var fs     = require('fs-extra');
var path   = require('path');
var expect = require('chai').expect;
var exists = require('../');

describe('exists-sync', function() {
  
  it('verifies files exist', function() {
    expect(exists('./tests/fixtures/taco.js')).to.be.true;
    expect(exists('./taco.js')).to.be.false;
  });
  
  it('works with symlinks', function() {
    expect(exists('./tests/fixtures/symlinks/link-to-taco.js'), 'symlink').to.be.true;
  });
  
  it('verifies symlink targets', function() {
    expect(exists('./tests/fixtures/symlinks/link-to-taco.js'), 'symlink').to.be.true;
    expect(exists('./tests/fixtures/symlinks/link-to-burrito.js'), 'dead symlink').to.be.false;
  });
  
  it('verifies symlinked symlinks', function() {
    expect(exists('./tests/fixtures/symlinks/link-to-taco-link.js'), 'symlinked symlink').to.be.true;
    expect(exists('./tests/fixtures/symlinks/dir1/link-to-dir2/link-to-dir1/link-to-dir2/link-to-dir1/link-to-taco.js'), 'I heard you like relative symlinks').to.be.true;
    // symlink made from dir other than root
    expect(exists('./tests/fixtures/symlinks/dir1/link-to-dir2/link-to-dir1/link-to-dir2/link-to-dir1/link-to-taco-bad.js'), 'I heard you like bad symlinks').to.be.false;
  });
  
  it('guards against cyclic symlinks', function() {
    expect(exists.bind(this,'./tests/fixtures/symlinks/dir1/file2'), 'cyclic hell').to.throw(Error);//(/Circular symlink detected/);
  });
});