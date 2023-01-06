//?---------------------------------------------------------
//? 62: "private" and "public" Access Modifiers"
//? 65: Inheritance
//? 66: Overriding Properties & The "protected" Modifier
//? 67: Getters & Setters
//?---------------------------------------------------------

class Department3 {
  //* a private property
  //* can be accessed only from inside this class:
  private toys: string[] = []
  //* a protected property
  //* can be accessed only from this and children classes:
  protected employees: string[] = []

  constructor(public name: string, firstToy: string) {
    this.toys[0] = firstToy
  }

  set addToy(newToy: string) { //* a setter
    this.toys.push(newToy)
  }

  get getToys() { //* a getter
    return this.toys
  }

  getFirstToyFromParent(): string {
    return this.toys[0]
  }
}

//* a child class
//* you can inherit from only one class:
class Accounting3 extends Department3 { 
  constructor(company: string) {
    //* super calls the Department constructor
    //* also must be  called first:
    super("Accounting", company)
  }

  //* try to access a private property:
  getFirstToyFromChild() {
    // return this.toys[0] //* can't access it
  }

  //?---------------------------------------------------------
  //*  try to access protected properties: (can be simple methods too)
  set addEmployee(name: string) {
    this.employees.push(name)
  }

  get getFirstEmployee() {
    return this.employees[0]
  }
}

//?---------------------------------------------------------

//* access private values:
const accounting3 = new Accounting3("Car")
// accounting3.toys.push("new  toy") // ERROR

accounting3.addToy = "Doll" //* call a setter
console.log(accounting3.getToys) //* call a getter

//?---------------------------------------------------------

//* access protected values:
// console.log(accounting3.employees[0]) // ERROR

accounting3.addEmployee = "Cristi"
console.log(accounting3.getFirstEmployee) //* again a getter
