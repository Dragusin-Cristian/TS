import { Project, ProjectStatus } from "../models/project-model.js";

//* ABSTRACT CLASS FOR STATE:
abstract class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listener: Listener<T>) {
    this.listeners.push(listener);
  }
}

//* PROJECT STATE MANAGEMENT CLASS:
type Listener<T> = (items: T[]) => void;

export class ProjectState extends State<Project> {
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

export const projectState = ProjectState.getInstance();
