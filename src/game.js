var game = {};
var map = {
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	'10': 10,
	'J': 11,
	'Q': 12,
	'K': 13
}
// game.sort = function(arr){
// 	return convert(arr).sort(function(a,b){return a < b ? 1 : -1;})
// }

function convert(arr) {
	return arr.map(function(card) {
	  return map[card];
	});
}

function group(arr) {
	var grouped = {};
  for(var i = 0;i<arr.length;i++){
  	var v = arr[i];
  	var m = grouped[v];
  	if (!m) {
  		grouped[v] = 1;
  	} else {
  		grouped[v]++;
  	}
  }
  return grouped;
}

var Category = function(value, num) {
	this.value = parseInt(value);
	this.num = num;
}

var Card = function(arr) {
  var grouped = group(convert(arr))

  this.categories = [];
  for(var key in grouped) {
  	this.categories.push(new Category(key, grouped[key]));
  }
  this.categories = sortCategory(this.categories);

  this.compare = function(card) {
  	console.log("this.card:"+JSON.stringify(this.categories));
  	console.log("other.card:"+JSON.stringify(card.categories));
  	for(var i = 0;i<this.categories.length;i++){
  		var thisCategory = this.categories[i];
  		var otherCategory = card.categories[i];
  		if(thisCategory.num>otherCategory.num){
  			return 1;
  		}else if(thisCategory.num < otherCategory.num){
  			return -1;
  		} else {
  			if(thisCategory.value > otherCategory.value) {
  				return 1
  			} else if (thisCategory.value < otherCategory.value) {
  				return -1
  			};
  		}
  	}
  	return 0;
  }

  function sortCategory(categories) {
  	return categories.sort(function(lCategory, rCategory){return lCategory.num < rCategory.num ? 1 : -1;})
  }

};


game.Card = Card

module.exports = game;

