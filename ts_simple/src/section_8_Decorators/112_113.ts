//?---------------------------------------------------------
//? 112, 113
//?---------------------------------------------------------


//* RETURNING & CHANGING DECORATORS:
//* (the functionality executes when we instanciate the class, not when we define it):

// //* Only for type of class Person but we are not strict to the fields (just follow what Person has):
// function WithTemplate(template: string, hookId: string){
//   return function(originalConstructor: typeof Person){
//     return class extends originalConstructor {
//       constructor(){
//         super(); //* inherit from parent class
//         const hookEl = document.getElementById(hookId);
//         if(hookEl){
//           hookEl.innerHTML = `<${template}>${this.name}</${template}>`;
//         }
//       }
//     }
//   }
// }

//* But here we are strict to what fields we define here (we don't follow any class structure):
function WithTemplate1(template: string, hookId: string){
  return function<T extends { new(...args: any[]): {name: string} }>(originalConstructor: T){
    return class extends originalConstructor {
      constructor(..._: any[]){ //* we don't use the args parameter
        super(); //* inherit from parent class
        const hookEl = document.getElementById(hookId);
        if(hookEl){
          hookEl.innerHTML = `<${template}>${this.name}</${template}>`;
        }
      }
    }
  }
}


@WithTemplate1("h1", "app")
class Person1 {
  name = 'Max';

  constructor(){
    console.log('Creating a person ...');
  }
}

//* Example of a different class then Person
// @WithTemplate("h2", "app")
// class Dog {
//   action = 'bark';

//   constructor(){
//     console.log("Barking....");
//   }
// }

// const p = new Person();