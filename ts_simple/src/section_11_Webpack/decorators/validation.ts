//* VALIDATION DECORATORS:
interface ValidatorConfig1 {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators1: ValidatorConfig1 = {};

export function Required1(target: any, propName: string) {
  registeredValidators1[target.constructor.name] = {
    ...registeredValidators1[target.constructor.name],
    [propName]: [
      ...(registeredValidators1[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

export function PositiveNumber1(target: any, propName: string) {
  registeredValidators1[target.constructor.name] = {
    ...registeredValidators1[target.constructor.name],
    [propName]: [
      ...(registeredValidators1[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

export function isNumber1(target: any, propName: string) {
  registeredValidators1[target.constructor.name] = {
    ...registeredValidators1[target.constructor.name],
    [propName]: [
      ...(registeredValidators1[target.constructor.name]?.[propName] ?? []),
      "isNumber",
    ],
  };
}

export function validate1(obj: any) {
  const objectValidatorConfig = registeredValidators1[obj.constructor.name];
  if (!objectValidatorConfig) {
    return true;
  } else {
    let isValid = true;
    for (const prop in objectValidatorConfig) {
      for (const validator of objectValidatorConfig[prop]) {
        switch (validator) {
          case "required":
            isValid = isValid && !!obj[prop];
            break;
          case "positive":
            isValid = isValid && obj[prop] > 0;
            break;
          case "isNumber":
            isValid = (isValid && (+obj[prop] !== undefined)); //* here it should be NaN insteadof undefined but it doesn't compile
            break;
        }
      }
    }
    return isValid;
  }
}
