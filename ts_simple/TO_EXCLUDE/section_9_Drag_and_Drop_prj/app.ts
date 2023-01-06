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

//* VALIDATION DECORATORS:
interface ValidatorConfig1 {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators1: ValidatorConfig1 = {};

function Required1(target: any, propName: string) {
  registeredValidators1[target.constructor.name] = {
    ...registeredValidators1[target.constructor.name],
    [propName]: [
      ...(registeredValidators1[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber1(target: any, propName: string) {
  registeredValidators1[target.constructor.name] = {
    ...registeredValidators1[target.constructor.name],
    [propName]: [
      ...(registeredValidators1[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

function isNumber1(target: any, propName: string) {
  registeredValidators1[target.constructor.name] = {
    ...registeredValidators1[target.constructor.name],
    [propName]: [
      ...(registeredValidators1[target.constructor.name]?.[propName] ?? []),
      "isNumber",
    ],
  };
}

function validate1(obj: any) {
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
            isValid = isValid && +obj[prop] !== NaN;
            break;
        }
      }
    }
    return isValid;
  }
}

//* DRAG AND DROP INTERFACES:
interface Dragable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

//* BASE CLASS FOR PROJECT CLASSES:
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    //* store a copy of the content contained by the template:
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    //* insert content inside an element:
    this.hostElement.insertAdjacentElement(
      insertAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }

  //* we force any inheriting class to implement these methods:
  abstract configure(): void;
  abstract renderContent(): void;
}

//* PROJECT CLASS (just for structure):
enum ProjectStatus {
  Active,
  Finished,
}

//* ABSTRACT CLASS FOR STATE:
abstract class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listener: Listener<T>) {
    this.listeners.push(listener);
  }
}

class Project {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

//* PROJECT STATE MANAGEMENT CLASS:
type Listener<T> = (items: T[]) => void;

class ProjectState extends State<Project> {
  private constructor() {
    super();
  }

  private projects: any[] = [];
  private static idCount: number = 0;
  private static instance: ProjectState;

  //* implement the singletone design pattern:
  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      ProjectState.idCount++,
      (title = title),
      (description = description),
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

  //* used to swith the project status:
  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

class ProjectItem
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

//* PROJECT LIST CLASS:
class ProjectList
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

//* PROJECT INPUT CLASS:

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

const prjInput = new ProjectInput();

const activePrjList = new ProjectList("active");
const finsihedPrjList = new ProjectList("finished");

//* So the flow looks like this:
//* get data from fields (and validate it)
//* add that project to projectState.projects
//* call all the listener functions with those projects for each time we add a new one
//* in the projectList we add a listener to prjectState.listener that updates the assignedProjects
//* (so projectState is a "bridge" by having the listeners and projects)
//* and we just append the new list of projects
