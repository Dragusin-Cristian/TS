//?---------------------------------------------------------
//? 85: Discriminated Unions
//?---------------------------------------------------------
//* check the type property of each interface!

interface Bird {
  type: 'bird',
  flyingSpeed: number
}

interface Horse {
  type: 'horse'
  runningSpeed: number
}

type Animal = Horse | Bird

function moveAnimal(animal: Animal) {
  console.log(animal.type)
  if (animal.type === "bird") {
    console.log(animal.flyingSpeed)
  } else if (animal.type === "horse") {
    console.log(animal.runningSpeed)
  }
}

moveAnimal({ type: "bird", flyingSpeed: 12 })