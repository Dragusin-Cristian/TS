//?---------------------------------------------------------
//? 70: Singletons & Private Constructors
//?---------------------------------------------------------

class Accouting5 {
  //* make a static instance of the class type:
  private static instance: Accouting5
  private static id: number = 0
  //* make the constructor private:
  private constructor(public name: string, protected readonly id: number = 0) {
    this.id = ++Accouting5.id
  }

  //* make a static method to create only one instance:
  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new Accouting5("Accounting")
    return this.instance
  }
}

//* can't create a new instance from the constructor:
// const accounting5 = new Accouting5("Accounting")

const accounting51 = Accouting5.getInstance()
const accounting52 = Accouting5.getInstance()

console.log(accounting51);
console.log(accounting52);
