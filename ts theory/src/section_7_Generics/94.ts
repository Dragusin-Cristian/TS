//?---------------------------------------------------------
//? 94: Built-in Generics & What are Generics?
//?---------------------------------------------------------
//* use of already existing generic functions

const names1: Array<string> = [] //* same as string[]
names1[0].split(' ') //* helps to get the specific applicable methods

//* "we can tell ts that this promise will eventually yeld a string"
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("response")
  }, 2000)
})

promise.then(data => {
  data.split(' ')
})
