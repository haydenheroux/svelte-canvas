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

function getCurrentGrade(assignment: IAssignment): NullableNumber {
	if (assignment.current != null) {
		/* if a grade has been given */
		return assignment.current
	} else {
		/* don't include this assignment in the final grade */
		return null
	}
}

function calculate(assignments: Array<IAssignment>, getter: (a: IAssignment) => NullableNumber): NullableNumber {
	const usableAssignments = assignments.filter(assignment => {
		/* note that this removes all future possibilities for NullableNumbers */
		return getter(assignment) != null
	})

	const summatives: Array<IAssignment> = usableAssignments.filter(assignment => {
		return assignment.isSummative
	})
	const formatives: Array<IAssignment> = usableAssignments.filter(assignment => {
		return !assignment.isSummative
	})

	function total(a: number, b: number): number {
		return a + b
	}

	function pointsScored(assignments: Array<IAssignment>): number {
		return assignments.map(assignment => {
			return getter(assignment)
		}).reduce(total, 0)
	}

	function pointsMaximum(assignments: Array<IAssignment>): number {
		return assignments.map(assignment => {
			return assignment.max
		}).reduce(total, 0)
	}

	const summativePointsScored: number = pointsScored(summatives)
	const summativePointsMaximum: number = pointsMaximum(summatives)
	const summativeGrade: number = 100 * (summativePointsScored / summativePointsMaximum)

	const formativePointsScored: number = pointsScored(formatives)
	const formativePointsMaximum: number = pointsMaximum(formatives)
	const formativeGrade: number = 100 * (formativePointsScored / formativePointsMaximum)

	if (summativePointsMaximum == 0 && formativePointsMaximum == 0) return null
	if (summativePointsMaximum == 0) return formativeGrade
	if (formativePointsMaximum == 0) return summativeGrade
	return 0.8 * summativeGrade + 0.2 * formativeGrade
}

export const calculatePossibleGrade = (assignments: Array<IAssignment>) => {return calculate(assignments, getPossibleGrade)}
export const calculateCurrentGrade = (assignments: Array<IAssignment>) => {return calculate(assignments, getCurrentGrade)}
