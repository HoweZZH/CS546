Promise.resolve("Success").then(function(value) {
  console.log(value); // "Success"
}, function(value) {
  // not called
});

var p = Promise.resolve([1,2,3]);
p.then(function(v) {
  console.log(v[0]); // 1
});
Promise.resolve([1,2,3]).then(function(list){
    console.log(list);
});

var original = Promise.resolve(true);
var cast = Promise.resolve(original);
cast.then(function(v) {
  console.log(v); // true
});

Promise.resolve(Promise.resolve(true)).then(function(res){
    console.log(res);
}
);

//Resolving thenables and throwing Errors

// Resolving a thenable object
var p1 = Promise.resolve({ 
  then: function(onFulfill, onReject) { onFulfill("fulfilled!"); } //Promise.prototype.then(undefined, onRejected).
});

console.log(p1 instanceof Promise) // true, object casted to a Promise
p1.then(function(v) {
    console.log(v); // "fulfilled!"
  }, function(e) {
    // not called
});
// Thenable throws before callback
// Promise rejects
/** 
var thenable = { then: function(resolve) {
  throw new TypeError("Throwing");
  resolve("Resolving");
}};
var p2 = Promise.resolve(thenable);
p2.then(function(v) {
  // not called
}, function(e) {
  console.log(e); // TypeError: Throwing
});
*/

// Thenable throws after callback
// Promise resolves
var thenable = { then: function(resolve) {
  resolve("Resolving");
  throw new TypeError("Throwing");
}};
var p3 = Promise.resolve(thenable);
p3.then(function(v) {
  console.log(v); // "Resolving"
}, function(e) {
  // not called
});

//Using the then method
var p1 = new Promise(function(resolve, reject) {
  resolve("Success !");
  // or
  // reject ("Error!");
});

p1.then(function(value) {
  console.log(value); // Success!
}, function(reason) {
  console.log(reason); // Error!
});

var p2 = new Promise(function(resolve, reject) {
  resolve(1);
});

p2.then(function(value) {
  console.log(value); // 1
  return value + 1;
}).then(function(value) {
  console.log(value); // 2
  return value+1;
}).then(function(value){
    console.log(value); //3
});

p2.then(function(value) {
  console.log(value); // 1
});

// Promise.prototype.catch()
var p1 = new Promise(function(whatever, reject) {
  whatever('whatever!');
});

p1.then(function(value) {
  console.log(value); // "Success!"
  throw 'oh, no!';
}).catch(function(e) {
  console.log(e); // "oh, no!"
}).then(function(){
  console.log('after a catch the chain is restored');
}, function () {
  console.log('Not fired due to the catch');
});

// The following behaves the same as above
p1.then(function(value) {
  console.log(value); // "Success!"
  return Promise.reject('oh, no! 222');
}).catch(function(e) {
  console.log(e); // "oh, no!"
}).then(function(){
  console.log('after a catch the chain is restored 222');
}, function () {
  console.log('Not fired due to the catch');
});
