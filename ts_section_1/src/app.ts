interface Named {
  //* cannot implement private/public/protected (access modifiers):
  // private name:string // ERROR
  //* but it works with readonly: (also works on custom (alias) type)
  readonly name: string
}

//* interface extending from other interface (can inherit from multiple interfaces)
interface Greetable6 extends Named {
  greet(phrase: string): void
}


//* interface on an object:
let greetable6: Greetable6

greetable6 = {
  name: "somebody",
  greet(phrase) {
    console.log(this.name + "sais " + phrase)
  }
}

//* readonly affects objects of type of that interface:
// greetable6.name = "Andrei" // ERROR

//* interface on a class:
class Person6 implements Greetable6 {
  constructor(public name: string) { }

  greet(phrase: string) {
    console.log(phrase)
  }
}

const Cristi6 = new Person6("Cristi")
//* readonly doesn't affect class instances:
Cristi6.name = "Andrei"

