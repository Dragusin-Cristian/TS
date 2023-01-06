import { Autobind1 } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { Component } from "./base-component.js";
import { DragTarget } from "../models/drag-drop-interfaces.js";
import { ProjectItem } from "./project-item.js";
import { ProjectStatus, Project } from "../models/project-model.js";

//* PROJECT LIST CLASS:
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: any[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    //! ...
    //* An idea would be to call these 2 methods in the Component class and get rid of a hassle.
    //* But these 2 methods may depend on some stuff that we could do up (where I put the //! ...),
    //* which means we may want to execute these 2 methods before we completely initialized everything in this class
    //* (because super is executed first, duh).
    this.configure();
    this.renderContent();
  }

  private renderProjects() {
    //* get the list element from the DOM:
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    //* empty the list from the DOM first:
    listEl.innerHTML = "";
    //* append the projects to the list:
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  //* we cannot have priivate abstract methods:
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  @Autobind1
  dragOverHandler(event: DragEvent): void {
    //* check if the type corresponds to what we've set at the dragStart listener:
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      //* the default in js for the drag event is to not allow dropping
      //* but we want a dropEvent, so:
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @Autobind1
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @Autobind1
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    //* whenever this listener functions gets called,
    //* this.assignedProjects will be set to projects (the argument called):
    projectState.addListener((projects: Project[]) => {
      //* get the relevant projects for the type of list (only the active ones or only th finished ones):
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }
}
