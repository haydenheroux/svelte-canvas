import type { IAssignment } from "./interfaces/IAssignment"
import type { NullableNumber } from "./types"

function getPossibleGrade(assignment: IAssignment): number {
	if (assignment.current != null) {
		/* if a grade has been given */
		return assignment.current
	} else if (assignment.possible != null) {
		/* if no grade has been given and the user has entered a minimum grade */
		return assignment.possible
	} else {
		/* assume the grade to be the minimum possible */
		// FIXME: Move state insurance to object creation 
		if (assignment.isSummative) {
			assignment.possible = 90
		} else {
			assignment.possible = 50
		}
		return assignment.possible
	}
}

function getCurrentGrade(assignment: IAssignment): number {
	if (assignment.current != null) {
		/* if a grade has been given */
		return assignment.current
	} else {
		/* don't include this assignment in the final grade */
		return null
	}
}

function weight(assignment: IAssignment, getter: (a: IAssignment) => number): [boolean, NullableNumber] {
	let grade = getter(assignment)
	if (grade == null) return [assignment.isSummative, null]
	let weighted = assignment.isSummative ? grade * 0.8 : grade * 0.2
	return [assignment.isSummative, weighted]
}

function calculate(assignments: Array<IAssignment>, getter: (a: IAssignment) => number): number {
	let grades = assignments.map(assignment => { return weight(assignment, getter) })

	let summativeTotal = grades.reduce((total, current) => {
		if (!current[0] /* !isSummative */) return total
		if (current[1] == null) return total
		return total + current[1]
	} , 0)
	let formativeTotal = grades.reduce((total, current) => {
		if (current[0] /* isSummative */) return total
		if (current[1] == null) return total
		return total + current[1]
	} , 0)

	let summativeCount = assignments.filter(assignment => {
		return assignment.isSummative && getter(assignment) != null
	}).length
	let formativeCount = assignments.filter(assignment => {
		return !assignment.isSummative && getter(assignment) != null
	}).length

	let summativeAverage = summativeTotal / summativeCount
	let formativeAverage = formativeTotal / formativeCount

	if (summativeCount == 0 && formativeCount == 0) return NaN;
	if (summativeCount == 0) return 100 * (formativeAverage / 20)
	if (formativeCount == 0) return 100 * (summativeAverage / 80)
	return summativeAverage + formativeAverage
}

export const calculatePossibleGrade = (assignments) => {return calculate(assignments, getPossibleGrade)};
export const calculateCurrentGrade = (assignments) => {return calculate(assignments, getCurrentGrade)};
