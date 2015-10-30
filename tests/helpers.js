var should = require('should');
var helpers = require('../views/helpers');

describe('View Helpers', function () {
	describe('#isMax', function () {
		it('should return false when the provided number is not maximum', function () {
			helpers.isMax(1).should.be.false();
		});

		it('should return true when the provided number is a maximum', function () {
			helpers.isMax(Number.MAX_VALUE).should.be.true();
		});
	});

	describe('#inc', function () {
		it('should return a + b', function () {
			helpers.inc(2, 3).should.equal(5);
		});
	});

	describe('#dec', function () {
		it('should return a - b', function () {
			helpers.dec(2, 3).should.equal(-1);
		});
	});

	describe('#eq', function () {
		it('should return true when a === b', function () {
			helpers.eq('a', 'a').should.be.true();
		});

		it('should return false when a !== b', function () {
			helpers.eq('a', 'b').should.not.be.true();
		});
	});
});