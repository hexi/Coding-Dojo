var expect = require('chai').expect;
var game = require('../src/game');
describe('Array', function() {
 //  describe('#sort()', function () {
 //    it('给出(1, 8, 3, 4)，排序的结果是(8, 4, 3, 1)', function () {
 //      var sorted = game.sort([1, 8, 3, 4]);

 //      expect(sorted).to.eql([8, 4, 3, 1]);
 //    });

 //    it('给出(1, 8, 8, 4)，排序的结果是(8, 8, 4, 1)', function () {
 //      var sorted = game.sort([1, 8, 8, 4]);

 //      expect(sorted).to.eql([8, 8, 4, 1]);
 //    });

	// it('给出("10", "J")，排序的结果是(11, 10)', function () {
 //      var sorted = game.sort(["10", "J"]);

 //      expect(sorted).to.eql([11, 10]);
 //    });    
 //    it('给出("1", "1", "J")，排序的结果是(11, 1, 1)', function () {
 //      var sorted = game.sort(["1", "1", "J"]);

 //      expect(sorted).to.eql([11, 1, 1]);
 //    });

 //  });

  describe('#compare', function() {
	it('给出A[9], B[8],比较的结果是A大于B', function () {
      var cardsA = new game.Card([9]);
      var cardsB = new game.Card([8]);
      var result = cardsA.compare(cardsB);
      expect(result).equal(1);
    });

    it('给出A[9], B[9],比较的结果是A等于B', function () {
      var cardsA = new game.Card([9]);
      var cardsB = new game.Card([9]);
      var result = cardsA.compare(cardsB);
      expect(result).equal(0);
    });

	it('给出A[9, 1], B[9, 2],比较的结果是A小于B', function () {
      var cardsA = new game.Card([9, 1]);
      var cardsB = new game.Card([9, 2]);
      var result = cardsA.compare(cardsB);
      expect(result).equal(-1);
    });

    it('给出A[9, 8], B[9, 8],比较的结果是A等于B', function () {
      var cardsA = new game.Card([9, 8]);
      var cardsB = new game.Card([9, 8]);
      var result = cardsA.compare(cardsB);
      expect(result).equal(0);
    });

    it('给出A[9, 8, 1], B[9, 8, 4],比较的结果是A小于B', function () {
      var cardsA = new game.Card([9, 8, 1]);
      var cardsB = new game.Card([9, 8, 4]);
      var result = cardsA.compare(cardsB);
      expect(result).equal(-1);
    });

    it('给出A[9, 9, 9], B[9, 9, 9],比较的结果是A等于B', function () {
      var cardsA = new game.Card([9, 9, 9]);
      var cardsB = new game.Card([9, 9, 9]);
      var result = cardsA.compare(cardsB);
      expect(result).equal(0);
    });

	it('给出A["1", "2", "4"], B["1", "1", "J"],比较的结果是A小于B', function () {
      var cardsA = new game.Card(["1", "2", "4"]);
      var cardsB = new game.Card(['1', '1', 'J']);
      var result = cardsA.compare(cardsB);
      expect(result).equal(-1);
    });    
    it('给出A["1", "2", "4"], B["1", "2", "J"],比较的结果是A小于B', function () {
      var cardsA = new game.Card(["1", "2", "4"]);
      var cardsB = new game.Card(["1", "2", "J"]);
      var result = cardsA.compare(cardsB);
      expect(result).equal(-1);
    });    
  })

describe('#story2()', function () {
    it('给出A["1", "1"], B["8", "9"]，比较的结果是A大于B', function () {
      var cardsA = new game.Card(["1", "1"]);
      var cardsB = new game.Card(["8", "9"]);
      var result = cardsA.compare(cardsB);
      expect(result).equal(1);
    });

    it('给出A["1", "2", "J"], B["8", "9", "J"]，比较的结果是A小于B', function () {
      var cardsA = new game.Card(["1", "2", "J"]);
      var cardsB = new game.Card(["8", "9", "J"]);
      var result = cardsA.compare(cardsB);
      expect(result).equal(-1);
    });

    it('给出A["1", "1", "J"], B["8", "9", "J"]，比较的结果是A大于B', function () {
      var cardsA = new game.Card(["1", "1", "J"]);
      var cardsB = new game.Card(["8", "9", "J"]);
      var result = cardsA.compare(cardsB);
      expect(result).equal(1);
    });

    it('给出A["1", "1", "J"], B["2", "2", "1"]，比较的结果是A小于B', function () {
      var cardsA = new game.Card(["1", "1", "J"]);
      var cardsB = new game.Card(["2", "2", "1"]);
      var result = cardsA.compare(cardsB);
      expect(result).equal(-1);
    });
    

  });
	
});
