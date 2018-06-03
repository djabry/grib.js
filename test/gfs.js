const assert = require('assert');
const grib = require('../index');
const jBinary = require('jbinary');
const files = require('./lib/fixtures').files;

describe('sample file gfs.grb', function() {
    let msgs = null;

    beforeEach(function(done) {
    msgs = null;
    jBinary.loadData(files['gfs.grb'].url, function(err, data) {
      if(err) return done(err);
      grib.readData(data, function(err, msgs_) {
        if(err) return done(err);
        msgs = msgs_;
        done();
      });
    });
  });

  it('should have 308 records', function() { assert.strictEqual(msgs.length, 308); });

  it('should have one or two fields per record', function() {
      let msg;
      for(const idx in msgs) {
      msg = msgs[idx];
      assert.ok((msg.fields.length === 1) || (msg.fields.length === 2));
    }
  });
});
