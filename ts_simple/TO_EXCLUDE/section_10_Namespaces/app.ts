//* This is a special syntax for Typescript:
//* (imports the namespace)
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

//* In order to have all the code compiled in only one js file
//* we need to enable  "outFile" and specify the path of the file.
//* Only TS accepts working with modules, bu JS doesn't.

namespace App {
  const prjInput = new ProjectInput();
  const activePrjList = new ProjectList("active");
  const finsihedPrjList = new ProjectList("finished");
}

//* So the flow looks like this:
//* get data from fields (and validate it)
//* add that project to projectState.projects
//* call all the listener functions with those projects for each time we add a new one
//* in the projectList we add a listener to prjectState.listener that updates the assignedProjects
//* (so projectState is a "bridge" by having the listeners and projects)
//* and we just append the new list of projects
