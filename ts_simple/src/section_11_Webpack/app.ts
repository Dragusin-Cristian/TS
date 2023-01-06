import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";


//* WHY USE Webpack:
//* - Creates bundles, less imports required
//* - optimized code, less code to download
//* - Mode build steps can be added easily
//* $ npm i --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
//* Now that we use webpack, we can disable the rootDir field in tsconfig
//* place the webpack.config.js file in the root folder of the project
//* we can remove the .js extensions, such that they are managed by webpack now

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


//? ----------------------------------------
//* SECTION 12: 

//* Using  declare global variables (they were declared before in other code files (here is inside the index.html file))):
declare var GLOBAL: any;

console.log(GLOBAL);



