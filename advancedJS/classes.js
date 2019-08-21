// class Rectangle {
//     constructor(height, width) {     // A constructor can use super keyword to execute the constructor of spuer class.
//       this.height = height;
//       this.width = width;
//     }
// }

// -----------------------------------------> A CLASS IS EXECUTED IN STRICT MODE  ---------------------------

//An important difference between function declarations and class declarations is that function declarations are hoisted and class declarations are not. 
//You first need to declare your class and then access it.

// const p = new Rectangle(); // ReferenceError
// class Rectangle {}

//   --------- CLASS declaration can done by two type --------------------

// // Method:  unnamed
// let Rectangle = class {
//     constructor(height, width) {
//       this.height = height;
//       this.width = width;
//     }
//   };
//   console.log(Rectangle.name);
//   // output: "Rectangle"
  
// // Method:  named
//   let Rectangle1 = class Rectangle2 {
//     constructor(height, width) {
//       this.height = height;
//       this.width = width;
//     }
//   };
//   console.log(Rectangle1.name);
  // output: "Rectangle2"

//--------------------------------------------------------------------------------------------------->

// class Rectangle {
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }
//   // Getter
//   get area() {
//     return this.calcArea();
//   }
//   // Method
//   calcArea() {                          // ES6 syntax for declaring function
//     return this.height * this.width;
//   }
// }

// const square = new Rectangle(10, 10);
// console.log(square.area);               // CALLING A GETTER ( that is, without parantheses )
// console.log(square.calcArea());


// ------------------------- STATIC METHOD -----------------------------

// Static methods are called without instantiating their class and cannot be called through a class instance.

// class Point {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }

//   static distance(a, b) {
//     const dx = a.x - b.x;
//     const dy = a.y - b.y;

//     return Math.hypot(dx, dy);
//   }
// }

// // const p1 = new Point(5, 5);
// // const p2 = new Point(10, 10);

// console.log(Point.distance({x:5, y: 5}, {x: 10, y: 10})); // 7.0710678118654755

// ----------------------------------------------------------------------------------------->

// class Animal { 
//   speak() {
//     return this;
//   }
//   static eat() {
//     return this;
//   }
// }

// let obj = new Animal();
// console.log(obj.speak()); // Animal {}
// let speak = obj.speak;
// console.log(speak()); // undefined

// console.log(Animal.eat()) // class Animal
// let eat = Animal.eat;
// console.log(eat()); // undefined

// ------------------------------------ PUBLIC AND PRIVATE PROPERTIES---------------( not supported in node)-------------------------------->

// ------> PUBLIC FIELDS

// class Rectangle {
//   height = 0;
//   constructor(height, width) {    
//     this.height = height;
//     this.width = width;
//   }
// }

// const obj = new Rectangle(10, 20);
// console.log(obj)

// --------> PRIVATE FIELDS

// class Rectangle {
//   #height = 0;
//   #width;
//   constructor(height, width) {    
//     this.#height = height;
//     this.#width = width;
//   }
// }

