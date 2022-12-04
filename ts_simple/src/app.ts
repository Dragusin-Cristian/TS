//* AUTOBIND DECORATOR:
function Autobind1(_: any, _2: string, propertyDescriptor: PropertyDescriptor) {
  return {
    configurable: true,
    enumerable: false,
    get() {
      return propertyDescriptor.value.bind(this);
    },
  };
}

//* VALIDATION:


//* PROJECT INPUT CLASS: 

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    //* store a copy of the content contained by the template:
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private getUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    if (
        enteredTitle.trim().length === 0 ||
        enteredDescription.trim().length === 0 ||
        enteredPeople.trim().length === 0
    ) {
        alert("Invalid input");
        return;
    }else{
        return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs(){
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind1
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();
    if(Array.isArray(userInput)){
        const [tilte, description, people] = userInput;
        console.log(userInput);
        this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    //* insert content inside an element:
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
