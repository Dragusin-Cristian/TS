//?---------------------------------------------------------
//? 61: Constructor Functions & The "this" Keyword
//? 66: "readonly" Properties
//?---------------------------------------------------------

class Department2 {
  //* long way:
  //  name: string
  //  private readonly id: number
  //
  //  constructor(name: string, id: number) {
  //    this.name = name
  //    this.id = id
  //  }

  //* short way:
  private static id: number = 0
  constructor(public name: string, private readonly id: number = 0) {
    //* readonly type is assignable only in the constructor
    this.id = ++Department2.id
    //* cannot access static properties from constructor using "this":
    // console.log(this.fiscalYear) 
   }

  //?--------------------------------------------------------------------

  //* defining the "this" type prevents from calling
  //* the method from an object of the wrong instance:
  describe(this: Department2) {
    console.log(`This department ${this.id} is called ${this.name}`)
  }
}


const accounting2 = new Department2("Accouting")
const IT2 = new Department2("IT")
accounting2.describe()
IT2.describe()

//* like here:
//const ceva2 = { describe: accounting2.describe }
//ceva2.describe() //* would log undefined if "this" type wouldn't be specified 

