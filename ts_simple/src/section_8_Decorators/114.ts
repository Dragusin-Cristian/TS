//?---------------------------------------------------------
//? 114
//?---------------------------------------------------------

//* Decorators which can return values are the CONSTRUCTOR, METHODS & ACCESSORS
//* The METHOD AND ACCESSOR decorator can return the PropertyDescriptor modified:

function Autobind(_: Printer, _2: string, propertyDescriptor: PropertyDescriptor){
  const originalMethod = propertyDescriptor.value;
  
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get(){
      const boundFun = originalMethod.bind(this);
      return boundFun;
    }
  }
  return adjDescriptor;
}

class Printer {
  message = "This works";

  @Autobind
  showMessage(){
    console.log(this.message);
  }
}

const p = new Printer();

const btn = document.getElementById("clickMeFor114");
btn!.addEventListener("click", p.showMessage);