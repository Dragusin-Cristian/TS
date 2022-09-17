//?---------------------------------------------------------
//? 88: Function Overloads
//?---------------------------------------------------------

type Combinable = string | number

function add(a: string, b: string): string
function add(a: number, b: string): string
function add(a: string, b: number): string
function add(a: number, b: number): number
function add(a: Combinable, b: Combinable) { //* normally it returns type Combinable
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString()
  }
  return a + b
}


//* the downside of not applying overloads on this function
//* is that we can't call the appropiate functions for the returned types:
const result = add(4, " Cristy")
result.split(' ') 