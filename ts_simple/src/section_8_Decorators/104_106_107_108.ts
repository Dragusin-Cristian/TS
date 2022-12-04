//?---------------------------------------------------------
//? 104, 106, 107, 108
//?---------------------------------------------------------
//* CLASS DECORATORS:

//* A very simple decorator:
// function Logger(constructor: Function) {
//     console.log("Logging...");
//     console.log(constructor);
// }

//* this decorator can take a arguments (also called "Decorator Factory"):
function Logger(logString: string) {
  console.log("LOGGER FUNCTION");
  return function(constructor: Function){
    console.log("Logging..." + logString);
    console.log(constructor);
  }
}

//* a more usefull decorator:
function WithTemplate(template: string, hookId: string){
  console.log("WITHTEMPLATE FUNCTION");
  return function(constructor: any){ //* constructor is not used here
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if(hookEl){
      hookEl.innerHTML = `<${template}>${p.name}</${template}>`;
    }
  }
}

// @Logger //* the simple decorator
@Logger("LOGGING - PERSON") //* the more elaborated decorator
@WithTemplate("h1", "app")
class Person {
  name = 'Max';

  constructor(){
    console.log('Creating a person ...');
  }
}

// const pers = new Person;