//?---------------------------------------------------------
//? 95: Creating a Generic Function
//? 96: Working with Constraints
//?---------------------------------------------------------

//* without generics:

//// function merge(objA: object, objB: object){
////   return Object.assign(objA, objB)
//// }

function merge1<T, U>(objA: T, objB: U) {
  return { ...objA, ...objB }
}

const merged1 = merge1({ name: "Cristi" }, { age: 23 })
//* this is redundant:
const merged2 = merge1<{ name: string, hobbies: string[] }, { age: number }>({ name: "Cristi", hobbies: ["gym", "running"] }, { age: 23 })

// console.log(merged1.age);


// ...
//* Working with Constraints:

//* the MOST SPECIFIC GENERICS:
function merge2<T extends object, U extends object>(objA: T, objB: U) {
  return { ...objA, objB }
}

//  const merged3 = merge({name: "Cristi"}, 30) //* ERROR
//* parameters must be objects now:
const merged3 = merge2({ name: "Cristi" }, { age: 30 })
