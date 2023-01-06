//?---------------------------------------------------------
//? 115, 116
//?---------------------------------------------------------
//* VALIDATOR DECORATOR (can be used as a library):

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};


function Required(target: any, propName: string){
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), "required"]
  }
}

function PositiveNumber(target: any, propName: string){
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), "positive"]
  }
}

function isNumber(target: any, propName: string){
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), "isNumber"]
  }
}

function validate(obj: any){
  const objectValidatorConfig = registeredValidators[obj.constructor.name];
  if(!objectValidatorConfig){
    return true;
  }else{
    let isValid = true;
    for(const prop in objectValidatorConfig){
      for(const validator of objectValidatorConfig[prop]){
        switch (validator) {
          case "required":
            isValid = isValid && !!obj[prop];
            break;
          case "positive":
            isValid = isValid && obj[prop] > 0;
            break;
          case "isNumber":
            isValid = isValid && (+obj[prop] !== NaN)
            break;
        }
      }
    }
    return isValid;
  }
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  @isNumber
  price: number;

  constructor(t: string, p: number){
    this.title = t;
    this.price = p;
  }
}

const form = document.getElementById("courseForm");
form?.addEventListener("submit", event => {
  event.preventDefault();

  const tilte = <HTMLInputElement>document.getElementById("title")!;
  const price = <HTMLInputElement>document.getElementById("price")!;

  const course = new Course(tilte.value, +price.value);

  if(!validate(course)){
    alert("invalid input");
    return;
  }

  console.log(course);
  
})