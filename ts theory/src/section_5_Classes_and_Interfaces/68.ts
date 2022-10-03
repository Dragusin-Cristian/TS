//?---------------------------------------------------------
//? 68: Static Methods & Properties
//?---------------------------------------------------------

class Department1 {
  static fiscalYear: number
  constructor (public name:string, private readonly id:number){
    //* cannot access static properties from the constructor (or any method) using "this":
    //this.fiscalYear = fiscalYear
  }
  getFiscalYear(){
    //return this.fiscalYear //* ERROR
  }

  static createEmployee(name:string){
    //* except from static methods (because here, "this" referes to the class, not the object)
    return {name, fiscalYear: this.fiscalYear}
  }
}

const Cristi1 = Department1.createEmployee("Cristi")
const fiscalYear1 = Department1.fiscalYear

const department1 = new Department1("accounting", 11)