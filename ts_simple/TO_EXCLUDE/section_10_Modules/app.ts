//* Switch the target field from tsconfig to "es6" when working with modules.
//* As long we work only with the browser (not with webpack), we need to add the extensions:
import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

//* Now that we are working with modules, we can have the code in diferent files and folders, 
//* so we keep the structure by disabling the "outFile"
//* "sourceMap": true,
//* "target": "es6",
//* "module": "es2015",

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
