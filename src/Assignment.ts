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

function weight(assignment: IAssignment, getter: (a: IAssignment) => number): NullableNumber {
	let grade = getter(assignment)
	if (grade == null) return null
	let weighted = assignment.isSummative ? grade * 0.8 : grade * 0.2
	return weighted
}

function calculate(assignments: Array<IAssignment>, getter: (a: IAssignment) => number): number {
	const usableAssignments = assignments.filter(assignment => {
		return getter(assignment) != null
	})

	const summatives = usableAssignments.filter(assignment => {
		return assignment.isSummative
	})
	const formatives = usableAssignments.filter(assignment => {
		return !assignment.isSummative
	})

	const summativeTotal = summatives.map(assignment => {
		return weight(assignment, getter)
	}).reduce((total, score) => {
		return total + score
	}, 0)

	const formativeTotal = formatives.map(assignment => {
		return weight(assignment, getter)
	}).reduce((total, score) => {
		return total + score
	}, 0)

	const summativeCount = summatives.length;
	const formativeCount = formatives.length;

	const summativeAverage = summativeTotal / summativeCount
	const formativeAverage = formativeTotal / formativeCount

	if (summativeCount == 0 && formativeCount == 0) return NaN
	if (summativeCount == 0) return 100 * (formativeAverage / 20)
	if (formativeCount == 0) return 100 * (summativeAverage / 80)
	return summativeAverage + formativeAverage
}

export const calculatePossibleGrade = (assignments) => {return calculate(assignments, getPossibleGrade)}
export const calculateCurrentGrade = (assignments) => {return calculate(assignments, getCurrentGrade)}
