//?---------------------------------------------------------
//? 98: The "keyof" Constraint
//?---------------------------------------------------------

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return "Value " + obj[key]
}

const result6 = extractAndConvert({ name: "Cristi", age: 30 }, "name")

console.log(result6);
