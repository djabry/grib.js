const assert = require('assert');
const grib = require('../index');
const files = require('./lib/fixtures').files;

describe('grid template', function() {
    let msgs = null;

    describe('of gfs.grb', function() {
    before(function(done) {
      msgs = null;
      grib.readUrl(files['gfs.grb'].url, function(err, msgs_) {
        if(err) return done(err);
        msgs = msgs_;
        done();
      });
    });

    it('should be lat/lng', function() {
        let msg, field;
        for(const m_idx in msgs) {
        msg = msgs[m_idx];
        for(const f_idx in msg.fields) {
          field = msg.fields[f_idx];
          assert.strictEqual(field.grid.templateNumber, 0);
          assert.ok(field.grid.definition.earthShape);
        }
      }
    });

    it('should start at lat/lng = 0/90', function() {
        let msg, field;
        for(const m_idx in msgs) {
        msg = msgs[m_idx];
        for(const f_idx in msg.fields) {
          field = msg.fields[f_idx];
          assert.strictEqual(field.grid.definition.la1, 90);
          assert.strictEqual(field.grid.definition.lo1, 0);
        }
      }
    });
  });

  describe('of dspr.temp.bin', function() {
    before(function(done) {
      msgs = null;
      grib.readUrl(files['dspr.temp.bin'].url, function(err, msgs_) {
        if(err) return done(err);
        msgs = msgs_;
        done();
      });
    });

    it('should be mercator', function() {
        let msg, field;
        for(const m_idx in msgs) {
        msg = msgs[m_idx];
        for(const f_idx in msg.fields) {
          field = msg.fields[f_idx];
          assert.strictEqual(field.grid.templateNumber, 10);
        }
      }
    });

    it('should have 75936 points', function() {
        let msg, field;
        for(const m_idx in msgs) {
        msg = msgs[m_idx];
        for(const f_idx in msg.fields) {
          field = msg.fields[f_idx];
          assert.strictEqual(field.grid.definition.ni * field.grid.definition.nj, 75936);
        }
      }
    });
  });

  describe('of ngm.grb', function() {
    before(function(done) {
      msgs = null;
      grib.readUrl(files['ngm.grb'].url, function(err, msgs_) {
        if(err) return done(err);
        msgs = msgs_;
        done();
      });
    });

    it('should be polar stereographic', function() {
        let msg, field;
        for(const m_idx in msgs) {
        msg = msgs[m_idx];
        for(const f_idx in msg.fields) {
          field = msg.fields[f_idx];
          assert.strictEqual(field.grid.templateNumber, 20);
        }
      }
    });

    it('should have 2385 points', function() {
        let msg, field;
        for(const m_idx in msgs) {
        msg = msgs[m_idx];
        for(const f_idx in msg.fields) {
          field = msg.fields[f_idx];
          assert.strictEqual(field.grid.definition.nx * field.grid.definition.ny, 2385);
        }
      }
    });
  });

  describe('of ds.maxt.bin', function() {
    before(function(done) {
      msgs = null;
      grib.readUrl(files['ds.maxt.bin'].url, function(err, msgs_) {
        if(err) return done(err);
        msgs = msgs_;
        done();
      });
    });

    it('should be Lambert conformal', function() {
        let msg, field;
        for(const m_idx in msgs) {
        msg = msgs[m_idx];
        for(const f_idx in msg.fields) {
          field = msg.fields[f_idx];
          assert.strictEqual(field.grid.templateNumber, 30);
        }
      }
    });

    it('should have 739297 points', function() {
        let msg, field;
        for(const m_idx in msgs) {
        msg = msgs[m_idx];
        for(const f_idx in msg.fields) {
          field = msg.fields[f_idx];
          assert.strictEqual(field.grid.definition.nx * field.grid.definition.ny, 739297);
        }
      }
    });
  });

  describe('of ecmwf_tigge.grb', function() {
    before(function(done) {
      msgs = null;
      grib.readUrl(files['ecmwf_tigge.grb'].url, function(err, msgs_) {
        if(err) return done(err);
        msgs = msgs_;
        done();
      });
    });

    it('should be Gaussian latitude/longitude', function() {
        let msg, field;
        for(const m_idx in msgs) {
        msg = msgs[m_idx];
        for(const f_idx in msg.fields) {
          field = msg.fields[f_idx];
          assert.strictEqual(field.grid.templateNumber, 40);
        }
      }
    });

    // FIXME: grid parsing broken for the moment
    /*
    it('should have 213988 points', function() {
      var msg, field;
      for(var m_idx in msgs) {
        msg = msgs[m_idx];
        for(var f_idx in msg.fields) {
          field = msg.fields[f_idx];
          console.log(field.grid);
          assert.strictEqual(field.grid.definition.ni * field.grid.definition.nj, 213988);
        }
      }
    });
    */
  });

  describe('of eumetsat_precip.grb', function() {
    before(function(done) {
      msgs = null;
      grib.readUrl(files['eumetsat_precip.grb'].url, function(err, msgs_) {
        if(err) return done(err);
        msgs = msgs_;
        done();
      });
    });

    it('should be Space view perspective or orthographic', function() {
        let msg, field;
        for(const m_idx in msgs) {
        msg = msgs[m_idx];
        for(const f_idx in msg.fields) {
          field = msg.fields[f_idx];
          assert.strictEqual(field.grid.templateNumber, 90);
        }
      }
    });

    it('should have 13778944 points in record 1', function() {
        const field = msgs[0].fields[0];
        assert.strictEqual(field.grid.definition.nx * field.grid.definition.ny, 13778944);
    });

    it('should have 5290000 points in record 2', function() {
        const field = msgs[1].fields[0];
        assert.strictEqual(field.grid.definition.nx * field.grid.definition.ny, 5290000);
    });
  });
});
