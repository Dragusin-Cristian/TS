namespace App {
  //* AUTOBIND DECORATOR:
  export function Autobind1(
    _: any,
    _2: string,
    propertyDescriptor: PropertyDescriptor
  ) {
    return {
      configurable: true,
      enumerable: false,
      get() {
        return propertyDescriptor.value.bind(this);
      },
    };
  }
}
