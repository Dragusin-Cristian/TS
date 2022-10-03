//?---------------------------------------------------------
//? 83: Intersection Types
//? 84: More on Type Guards (just a workaround)
//?---------------------------------------------------------

type Admin = {
  name: string,
  privileges: string[]
}

type Employee = {
  name: string,
  startDate: Date
}

//* concatenation:
type ElevatedEmployee = Admin & Employee

const e1: ElevatedEmployee = {
  name: "Cristi",
  privileges: ["haha", "ceva"],
  startDate: new Date()
}

//* interpolation: 
type UnknownEmployee = Employee | Admin


//* typegueard for type:
function printEmployeeInfo(emp: UnknownEmployee) {
  console.log(emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: ", emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: ", emp.startDate);
  }
}

printEmployeeInfo({ name: "Cristopher", startDate: new Date() })


//* and typeguard for classes:
class Car {
  drive() {
    console.log("Driving a car...");

  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  cargo() {
    console.log("Loading cargo...");
  }
}

type Vehicle = Truck | Car

function useVehicle(vehicle: Vehicle) {
  vehicle.drive()
  //*  instead of: 
  // if ("cargo" in vehicle)
  //* use (only for classes):
  if (vehicle instanceof Truck) {
    vehicle.cargo()
  }
}

useVehicle(new Truck())
