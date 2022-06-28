<script lang="ts">
	interface IAssigment {
		name: string,
		isSummative: bool,
		possible: number,
		current: number
	};

	let toys1: IAssignment = {
		name: "Chemistry of Toys",
		isSummative: false,
		current: 80
	};
	let toys2: IAssignment = {
		name: "Final Exam",
		isSummative: true,
		current: undefined
	};

	let assignments = [];
	assignments.push(toys1);
	assignments.push(toys2);

	// TODO: Weight this based on isSummative
	function getPossibleGrade(assignment) {
		if (assignment.current != undefined) {
			/* if a grade has been given */
			return assignment.current;
		} else if (assignment.possible != undefined) {
			/* if no grade has been given and the user has entered a minimum grade */
			return assignment.possible;
		} else {
			/* assume the grade to be the minimum possible */
			if (assignment.isSummative) {
				assignment.possible = 90;
			} else {
				assignment.possible = 50;
			}
			return assignment.possible;
		}
	}

	// TODO: Weight this based on isSummative
	function getActualGrade(assignment) {
		if (assignment.current != undefined) {
			/* if a grade has been given */
			return assignment.current;
		} else {
			/* don't include this assignment in the final grade */
			return undefined;
		}
	}

	function calculate(fn) {
		let grades = assignments.map(fn);
		let gradesTotal = grades.reduce((total, current) => {
			if (current == undefined) {
				return total
			} else {
				return total + current
			}
		} , 0);
		let gradesCount = grades.reduce((total, current) => {
			if (current == undefined) {
				return total
			} else {
				return total + 1;
			}
		} , 0);
		return gradesTotal / gradesCount;
	}

// FIXME: Having to bootstrap this to fill in missing possibles
calculate(getPossibleGrade);
calculate(getActualGrade);
</script>

<table class="table table-striped">
	<thead>
		<tr>
			<th>Name</th>
			<th>Possible</th>
			<th>Current</th>
		</tr>
	</thead>
	<tbody>
		{#each assignments as assignment}
			<tr>
				<td>{assignment.name}</td> 
				<td>{assignment.current == undefined && assignment.possible != undefined ? assignment.possible : "" }</td>
				<td><b>{assignment.current != undefined ? assignment.current : "" }</b></td>
			</tr>
		{/each}
		<tr>
			<td><b>Total</b></td>
			<td>{calculate(getPossibleGrade)}</td>
			<td><b>{calculate(getActualGrade)}</b></td>
		</tr>
	</tbody>
</table>
