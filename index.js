
Array.prototype.myForEach = function (callback,thisArg) {
	if (thisArg)
		callback = callback.bind(thisArg);
	for (var i = 0, len = this.length; i < len; i++)
		callback(this[i], i, this);
}

Array.prototype.myMap = function (callback, thisArg) {
	var retArr = new Array(this.length);

	if (thisArg)
		callback = callback.bind(thisArg);

	for (var i = 0; i < this.length; i++)
		retArr[i] = callback(this[i],i);
	return retArr;
}


Array.prototype.mySort = function (compareFunction) {
	if (!compareFunction) {
		compareFunction = function (a, b) {
			return String(a).charCodeAt(0) > String(b).charCodeAt(0);
		};
	}

	var insertionSort = function(array, from, to) {
		for (var i = from + 1; i < to; i++) {
			var element = array[i];
			for (var j = i - 1; j >= from; j--) {
				var tmp = array[j];
				var order = compareFunction(tmp, element);
				if (order > 0) {
					array[j + 1] = tmp;
				} else break;
      		}
    	  array[j + 1] = element;
		}
	}

	insertionSort(this,0,this.length);


		// var temp;
		// var curVal = +compareFunction(this[i],this[i + 1]);
		// var lastVal = curVal;

		// if (curVal !== this[0] + this[1]) { // a + b
		// 	for (var i = 0; i < this.length-1; i++) {
		// 		if ((curVal <= 1 || curVal > lastVal) && i >= 0) {
		// 			temp = this[i];
		// 			this[i] = this[i + 1];
		// 			this[i + 1] = temp;
		// 			i -= 2;
		// 		}
		// 	return this.reverse();
		// 	}
		// } else { // a - b

	return this;
}


var sample = [2,6,3,4,1,3,4,1,5,7];

/*
	console.log('Test myForEach against native forEach:');

	console.time('forEach');
	sample.forEach(function (element, index, array) {
		console.log(element, index, array);
	});
	console.timeEnd('forEach');

	console.time('myForEach');
	sample.myForEach(function (element, index, array) {
		console.log(element, index, array);
	});
	console.timeEnd('myForEach');


	console.log('Test myMap against native map:');

	console.time('map');
	var mapped = sample.map(function (element, index) {
		return element + index;
	});
	console.log(mapped);

	console.timeEnd('map');

	console.time('myMap');
	var myMapped = sample.myMap(function (element, index) {
		return element + index;
	});
	console.log(myMapped);

	console.timeEnd('myMap');



	console.log('Test mySort against native sort:');
*/
console.time('sort');
var sorted = sample.sort(function (a,b) {
	return a - b;
});
console.log(sorted);

console.timeEnd('sort');

sample = [2,6,3,4,1,3,4,1,5,7];

console.time('mySort');
var mySorted = sample.mySort(function (a, b) {
	return a - b;
});
console.log(mySorted);

console.timeEnd('mySort');
