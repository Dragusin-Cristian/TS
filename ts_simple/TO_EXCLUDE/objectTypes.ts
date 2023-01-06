enum Role { ADMIN_ROLE = "ADMIN", USER_ROLE = 1, AUTHOR_ROLE } // for numbers it autoincrements the next enums
type Personality = "optimistic" | "persimitic" | 1 | 32 | boolean // type alias 
type Squash = {
  style: "aggressive" | "tactiacal";
  tempo: "high" | "low" | "medium";
  wins: number;
  losses: number;
  roar(phrase: string):void
} // also type alias 

const person: {
  name: string;
  age: number;
  money: 1000000; //* fixed type
  cars: string[]; //* array type
  hobbies: [string, number]; //* tuple
  role: Role; //* enum type
  virgin: boolean | number; //* union type
  gender: "male" | "female"; //* literal type
  personality: Personality; //* alias type (custom type)
  squash: Squash; //* alias type too
} = {
  //// const person = {
  name: "Cristi",
  age: 20,
  money: 1000000,
  cars: ["Mercedes", "Ferrari", "Porsche"],
  hobbies: ["Squash", 10],
  role: Role.ADMIN_ROLE,
  virgin: false, // or use 0 for false
  gender: "male",
  personality: "optimistic",
  squash: {
    style: "tactiacal",
    tempo: "medium",
    wins: 32,
    losses: 3,
    roar(phrase) {
      console.log(phrase)
    },
  }
}

person.hobbies.push("inca ceva") // tuples can be pushed, but not overwritten
person.squash.roar("Yala!!")


//?--------------------------------------------------------------------------------------
//* FUNCTION TYPES

function addNumbers(num1: number, num2: number) { // : number // returns type number
  return num1 + num2
}

function printResult(num: number, cb: (result: number) => void) { // : void // returns type undefined if nothing is returned
  const ceva = cb(num)
  console.log(ceva);
}

//// printResult(addNumbers(2, 3), (result) => {
////   console.log("The result is: " + result)
//// })


let addValues: (a: number, b: number) => number //* the defined function type
//// let printSum: Function // a function type
let printSum: (num: number, cb: (result: number) => void) => void

//// justPrint = 5 // ERROR
//// addValues = print // ERROR


addValues = addNumbers
printSum = printResult

printSum(addValues(2, 3), (result) => {
  console.log("The result is " + result)
  return true //! you can still return something when function return type is void, and still store it in a variable
})



//?--------------------------------------------------------------------------------------
//* The unknown type

let userInput: unknown
// let userInput: any
let ceva: string

// ceva = userInput //* "Type 'unknown' is not assignable to type 'string'."


//?--------------------------------------------------------------------------------------
//* The never type 
// Used for functions that never return something, not even undefined

function generateError(message: string, code: number): never { // by default it returns undefined and its type is void
  throw {message: message, code: code}
}

// this won't log anything:
//// const ceva1 = generateError("Internal server error", 500)
//// console.log(ceva1);

generateError("Internal server error", 500)




