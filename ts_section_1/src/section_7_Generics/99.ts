//?---------------------------------------------------------
//? 99: Generic Classes
//?---------------------------------------------------------

//* to except object type because they are passed by reference (non primitive type), we can specify constraints:
// class DataStorage<T extends string | number | boolean>{
class DataStorage<T>{
  private data: T[] = []

  addItem(element: T) {
    this.data.push(element)
  }

  removeItem(element: T) {
    this.data.splice(this.data.indexOf(element), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem("ceva")
textStorage.addItem("inca ceva")
textStorage.addItem("si inca ceva")
// console.log(textStorage.getItems());


const DorianObject = {
  name: "Dorian"
}

const objectStorage = new DataStorage<object>()
objectStorage.addItem({ name: "Cristi" })
objectStorage.addItem(DorianObject)
objectStorage.addItem({ name: "Randa" })
//* will reomve the last object because they are passed by reference (and not bu value, duh):
// objectStorage.removeItem({name: "Dorian"})

//* will reomve the desired object because we pass the right reference
objectStorage.removeItem(DorianObject)

console.log(objectStorage.getItems());
