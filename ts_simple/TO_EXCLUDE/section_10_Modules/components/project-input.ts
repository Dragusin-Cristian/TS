import { Component } from "./base-component.js";
import {
  PositiveNumber1,
  Required1,
  isNumber1,
  validate1,
} from "../decorators/validation.js";
import { Autobind1 } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

//* PROJECT INPUT CLASS:
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  @Required1
  enteredTitle: string = "";
  @Required1
  enteredDescription: string = "";
  @PositiveNumber1
  @isNumber1
  @Required1
  enteredPeople: number = 0;

  isValid: boolean = false;

  constructor() {
    super("project-input", "app", true, "user-input");

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
  }

  private getUserInput(): [string, string, number] | void {
    this.enteredTitle = this.titleInputElement.value;
    this.enteredDescription = this.descriptionInputElement.value;
    this.enteredPeople = +this.peopleInputElement.value;

    if (!validate1(this)) {
      alert("Invalid input");
      this.isValid = false;
      return;
    } else {
      this.isValid = true;
    }
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind1
  private submitHandler(event: Event) {
    event.preventDefault();
    this.getUserInput();
    if (this.isValid) {
      console.log(
        this.enteredTitle,
        this.enteredDescription,
        this.enteredPeople
      );
      projectState.addProject(
        this.enteredTitle,
        this.enteredDescription,
        this.enteredPeople
      );
      this.clearInputs();
    }
  }
}
