
Array.prototype.myForEach = function (callback,thisArg) {
	if (typeof thisArg === 'undefined') // if some context is given manually
		callback = callback.bind(thisArg); // bind it
	for (var i = 0, len = this.length; i < len; i++) // loop through an array
		callback(this[i], i, this); // and apply values for the callback
}

Array.prototype.myMap = function (callback, thisArg) {
	var retArr = new Array(this.length); // create array that will store all the values of the work of callback

	if (typeof thisArg === 'undefined') // if some context is given manually
		callback = callback.bind(thisArg); // bind it

	for (var i = 0, len = this.length; i < len; i++) // loop through an array
		retArr[i] = callback(this[i]); // and make the corresponding cell have the value that callback returned
	return retArr; // return that array
}

console.timeEnd('myMap');

Array.prototype.mySort = function (compareFunction) {
	var args = [].slice.call([],arguments); // making an array out of pseudo-array
	if (args.length === 0) { // if compare function is not given
		compareFunction = function (a, b) { // assign it to default sort
			return String(a).charCodeAt(0) > String(b).charCodeAt(0);
		};
	}

	var temp;
	var changes;
	do {
		changes = 0;
		for (var i = 0, len = this.length-1; i < len; i++) { // loop through an array
			if (!!compareFunction(this[i],this[i + 1]) !== false) { // if condition does not work
				// change values in place
				temp = this[i]; // 5 | 5 4
				this[i] = this[i + 1]; // 5 | 4 4
				this[i + 1] = temp; // 5 | 4 5
				changes++; 
			}
		}
	}
	while (!!changes); // and when array is sorted already
	return this; // return it
}

// TESTS

var sample = [2,6,3,4,1,3,4,1,5,7]; // sample array which will used for testing

// Test myForEach

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

// Test myMap

console.log('Test myMap against native map:');

console.time('map');
var mapped = sample.map(function (element) {
	return element * 2;
});
console.log(mapped);

console.timeEnd('map');



console.time('myMap');
var myMapped = sample.myMap(function (element) {
	return element * 2;
});
console.log(myMapped);

console.timeEnd('myMap');


// Test mySort

console.log('Test mySort against native sort:');

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
