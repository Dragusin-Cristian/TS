// //? 105: A First Class Decorator
// //* Link to set VS code: https://stackoverflow.com/questions/38271273/experimental-decorators-warning-in-typescript-compilation

// //* Decorators for classes take usually one argument
// function Logger(constructor: Function){
//   console.log("Logging...");
//   console.log(constructor);
// }

// @Logger
// class Person{
//   name = "Cristi"

//   constructor(){
//     console.log("Creating a person object ...");
//   } 
// }

// const pers = new Person()

//? 106: Working with Decorator Factories

function Logger(logString: string){
  return function(constructor: Function){
    console.log(logString);
    console.log(constructor);
  }
}

@Logger("LOGGING - PERSON")
class Person {
  name = "Cristi"

  constructor(){
    console.log("Creating a person...");
  }
}