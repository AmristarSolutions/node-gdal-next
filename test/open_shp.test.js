const gdal = require('../lib/gdal.js')
const path = require('path')
const assert = require('chai').assert

describe('Open', () => {
  afterEach(gc)

  describe('ESRI Shapefile', () => {
    let filename, ds

    it('should not throw', () => {
      filename = path.join(__dirname, 'data/shp/sample.shp')
      ds = gdal.open(filename)
    })
    it('should be able to read layer count', () => {
      assert.equal(ds.layers.count(), 1)
    })

    describe('layer', () => {
      let layer
      before(() => {
        layer = ds.layers.get(0)
      })
      it('should have all fields defined', () => {
        assert.equal(layer.fields.count(), 8)
        assert.deepEqual(layer.fields.getNames(), [
          'path',
          'name',
          'type',
          'long_name',
          'fips_num',
          'fips',
          'state_fips',
          'state_abbr'
        ])
      })
      describe('field properties', () => {
        let integerDs, integerLayer

        before(() => {
          integerDs = gdal.open(
            path.join(__dirname, 'data/shp/sample_int64.shp')
          )
          integerLayer = integerDs.layers.get(0)
        })
        it('should evaluate datatypes', () => {
          const version_major = Number(gdal.version.split('.')[0])
          assert.equal(integerLayer.fields.get(0).type, 'string')
          assert.equal(
            integerLayer.fields.get(3).type,
            version_major >= 2 ? 'integer64' : 'integer'
          )
          assert.equal(integerLayer.fields.get(5).type, 'real')
          assert.equal(integerLayer.fields.get(10).type, 'date')
        })
      })
      describe('features', () => {
        it('should be readable', () => {
          assert.equal(layer.features.count(), 23)
          const feature = layer.features.get(0)
          const fields = feature.fields.toObject()

          assert.deepEqual(fields, {
            fips: 'US56029',
            fips_num: '56029',
            long_name: 'Park County',
            name: 'Park',
            path: 'US.WY.PARK',
            state_abbr: 'WY',
            state_fips: '56',
            type: 'County'
          })
        })
      })

      describe('integer64 fields', () => {
        it('should be readable', () => {
          const integerDs = gdal.open(
            path.join(__dirname, 'data/shp/sample_int64.shp')
          )
          const integerLayer = integerDs.layers.get(0)

          assert.equal(integerLayer.features.get(0).fields.get(3), 1)
        })
      })
    })
  })
})
