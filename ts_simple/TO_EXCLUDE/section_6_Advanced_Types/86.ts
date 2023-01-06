//?---------------------------------------------------------
//? 86: Typecasting
//?---------------------------------------------------------
//* 2 ways:

// const userInput7 = document.getElementById("userInput")! as HTMLInputElement
const userInput7 = <HTMLInputElement>document.getElementById("userInput")!

userInput7.value = "Hi there"