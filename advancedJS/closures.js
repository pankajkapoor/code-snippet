/**
 * In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are 
 * created every time a function is created, at function creation time.
 */
function makeFunc() {
    var name = 'Mozilla';
    function displayName() {
      console.log(name);
    }
    return displayName;
  }
  
  var myFunc = makeFunc();
  myFunc();




  function makeAdder(x) {        // this argument x of makeAdder is stored in the lexical environment, so that, it can be used
    return function(y) {        //  by the function enclosed within it
      return x + y;
    };
  }
  
  var add5 = makeAdder(5);
  var add10 = makeAdder(10);
  
  console.log(add5(2));  // 7
  console.log(add10(2)); // 12