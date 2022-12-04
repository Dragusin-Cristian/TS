//?---------------------------------------------------------
//? 87: Index Properties
//?---------------------------------------------------------
//* not commonly used

interface ErrorContainer {
  [props: string]: string
}

const errorBat: ErrorContainer = {
  email: "Not a valid email",
  username: "Must start with a capital character!"
}