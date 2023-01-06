//? *optional
//?---------------------------------------------------------
//? Mixin Classes - JavaScript Multiple Class Inheritance
//?---------------------------------------------------------
//* for more docs: https://www.youtube.com/watch?v=JNmqxEcJjr4

//* Let's say we got these 2 classes:

// class Disposable{
//     isDisposed: boolean = false;
//       dispose() {
//           this.isDisposed = true;
//        }
//   }
  
//   class Activatable{
//     isActive: boolean = false;
//     activate() {
//       this.isActive = true;
//     }
//     deactivate() {
//       this.isActive = false;
//     }
//   }
  
  //*  and we need to mix them into a third one, named Example:
  // class Example extends Disposable, Activatable{} //* ERROR
  
  
  //* ...but, we can extend from only one class :(
  //* Because of that, we need to use Mixin Classes!
  
  //* First, create a type imitating a constructor function, (you can also name it Class)
  export type Constructor = new (...args: any[]) => any;
  
  //* Then, create for each class a function that returns the same class structure: 
  export function DisposableMixin<T extends Constructor>(base: T) {
    return class extends base {
      isDisposed: boolean = false;
      dispose() {
          this.isDisposed = true;
       }
    };
  }
  
  export function ActivatableMixin<T extends Constructor>(base: T) {
    return class extends base {
      isActive: boolean = false;
      activate() {
        this.isActive = true;
      }
      deactivate() {
        this.isActive = false;
      }
    //* If you want to have a constructor defined inside your mixin class,
    //* make sure to pass the args parameter and call super:  
    //   constructor(...args: any[]){
    //     super()
    // }
    };
    
  }
  
  //* In the end, you can create an Instance, or a Class of that Mixin "chain":
  // const Example = DisposableMixin(ActivatableMixin(class {
  //   ceva: string = "ceva"
  //   constructor(){
  //     console.log(this.ceva);
  //     //  this.activate(); //* ERROR (cannot access super props)
  //     //  console.log(this.isActive); //* ERROR
  //   }
  // }))
  // type Example = InstanceType<typeof Example>
  
  class Example extends DisposableMixin(ActivatableMixin(class {})) {
    ceva: string = "ceva";
    constructor() {
      super();
      this.activate();
      console.log(this.isActive);
    }
  }
  
  function show(e: Example) {
    console.log(e.ceva);
    e.deactivate();
  }
  
  show(new Example());