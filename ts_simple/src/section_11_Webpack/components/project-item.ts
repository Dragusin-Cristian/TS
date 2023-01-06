import { Component } from "./base-component";
import { Autobind1 } from "../decorators/autobind";
import {Project} from "../models/project-model";
import { Dragable } from "../models/drag-drop-interfaces";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Dragable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id.toString());
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobind1
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id.toString());
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_: DragEvent): void {
    console.log("Drag ended");
  }

  //* Don't forget to add the draggable="true" to li
  @Autobind1
  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
