//?---------------------------------------------------------
//? 109, 110, 111
//?---------------------------------------------------------

//* PROPERTY DECORATOR:
function Log(target: Product, propertyName: string | Symbol){
  console.log("Property decorator");
  console.log(target, propertyName); 
}

//* ACCESSOR (GET/SET) DECORATOR:
function Log2(target: any, name: string, descriptor: PropertyDescriptor){
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//* METHOD DECORATOR (SAME AS ACCESSOR DECORATOR, COULD USE THAT TOO):
function Log3(target: any, name: string, descriptor: PropertyDescriptor){
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//* PARAMETERS DECORATOR
function Log4(target: Product, name: string, position: number){
  console.log("Parameter decorator");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}