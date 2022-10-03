//?---------------------------------------------------------
//? Generics: Awesome for type management
//?---------------------------------------------------------

//* For functions:

//* Define which kind of data will be 
//* stored in as parameters:
// const addUID = <T extends Object>(obj: T) => {
const addUID = <T extends {name: string}>(obj: T) => {
  //* instead of:
  // const addUID = (obj: Object) => {
  let uid = Math.floor(Math.random() * 100)
  return { ...obj, uid }
}

let docOne = addUID({ name: "Cristi", age: 20 })
// let docTwo = addUID("blablabla")

console.log("docOne.bath")


//* For interfaces:

//* Define the type of properties 
//* that can be passed: 
interface Resource<T> {
  uid: number;
  name: string;
  //* can contain any type (Object, String etc.):
  data: T; 
}

//* instead of:
// interface Resource {
//   uid: number;
//   name: string;
//* can contain only type Object:
//   data: Object;
// }

const docThree: Resource<string[]> = {
  uid: 1,
  name: "Cristi",
  data: ["ceva", "inca ceva"]
}