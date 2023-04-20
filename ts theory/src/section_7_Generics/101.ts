//?---------------------------------------------------------
//? 101: Generic Utility Types (Private, Readonly, for more check the docs)
//?---------------------------------------------------------

//* Private:
interface CourseGoal {
  title: string,
  description: string,
  completeUntil: Date
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  //* the Partial keyword sets the data types to optional (but it changes the type to the Partial one):
  let courseGoal: Partial<CourseGoal> = {}
  courseGoal.title = title
  courseGoal.description = description
  courseGoal.completeUntil = date
  //* so we typecast it:
  return courseGoal as CourseGoal
}

//* Readonly:

const names: Readonly<string[]> = ["Cristi", 'Dorian']
//* now we can't change the array:
// names.pop() //* ERROR
// names.push("Randa") //* ERROR
