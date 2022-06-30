import type { IAssignment } from "./interfaces/IAssignment"
import type { NullableNumber } from "./types"

function getPossibleGrade(assignment: IAssignment): NullableNumber {
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

function getGrade(assignment: IAssignment): NullableNumber {
	if (assignment.current != null) {
		/* if a grade has been given */
		return assignment.current
	} else {
		/* don't include this assignment in the final grade */
		return null
	}
}

function calculate(assignments: Array<IAssignment>, getter: (a: IAssignment) => NullableNumber): NullableNumber {
	const usableAssignments = assignments.filter(assignment => { getter(assignment) != null })
	const summatives = usableAssignments.filter(assignment => {  assignment.isSummative })
	const formatives = usableAssignments.filter(assignment => { !assignment.isSummative })

	function total(a: number, b: number): number {
		return a + b
	}

	function points(assignments: Array<IAssignment>): number {
		return assignments.map(assignment => {
			return getter(assignment)
		}).reduce(total, 0)
	}

	function pointsMax(assignments: Array<IAssignment>): number {
		return assignments.map(assignment => {
			return assignment.max
		}).reduce(total, 0)
	}

	const summativeGrade = 100 * (points(summatives) / pointsMax(summatives))
	const formativeGrade = 100 * (points(formatives) / pointsMax(formatives))

	if (Number.isNaN(summativeGrade) && Number.isNaN(formativeGrade)) return null
	if (Number.isNaN(summativeGrade)) return formativeGrade
	if (Number.isNaN(formativeGrade)) return summativeGrade
	return 0.8 * summativeGrade + 0.2 * formativeGrade
}

export const calculatePossibleGrade = (assignments: Array<IAssignment>) => {return calculate(assignments, getPossibleGrade)}
export const calculateGrade = (assignments: Array<IAssignment>) => {return calculate(assignments, getGrade)}
