//?---------------------------------------------------------
//? 69: Abstract Classes 
//?---------------------------------------------------------

abstract class Department4 {
  private static id: number = 0
  constructor(public name: string, protected readonly id: number = 0) {
    this.id = ++Department4.id
  }

  abstract describe(this: Department4): void
}

class Accounting4 extends Department4 {
  constructor(name: string) {
    super(`Accounting_${name}`)
  }

  //?---------------------------------------------------------

  //* abstract methods must be implemented!
  describe(this: Accounting4): void {
    console.log(`Department's ${this.id} name is ${this.name}`)
  }
}

//?---------------------------------------------------------

//* Cannot create an instance of an abstract class:
// const accounting4 = new Department4()

const accounting4 = new Accounting4("Micro-Focus")
accounting4.describe()