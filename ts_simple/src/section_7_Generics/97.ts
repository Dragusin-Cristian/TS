//?---------------------------------------------------------
//? 97: Another Generic Function
//?---------------------------------------------------------

interface Lengthy {
  length: number
}

function countAndDisplay<T extends Lengthy>(element: T): [T, string] {
  let describeMessage = "Got no elements"
  if (element.length === 1) describeMessage = "Got one element"
  else if (element.length >= 1) describeMessage = "Got " + element.length + " elements"

  return [element, describeMessage]
}

const result2 = countAndDisplay("Hello world")
const result3 = countAndDisplay(["sports", "programming"])
//* because we defined the type that the generic extends:
// const result4 = countAndDisplay({one: "sports", two: "programming"}) //* ERROR
// const result5 =countAndDisplay(10) //* ERROR

// console.log(result3);
