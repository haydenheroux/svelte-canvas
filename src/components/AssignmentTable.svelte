<script lang="ts">
	import { assignments } from "../store"
	import { calculatePossibleGrade, calculateGrade } from "../Assignment"

	let editing = null;
</script>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Possible</th>
			<th>Current</th>
		</tr>
	</thead>
	<tbody>
		{#each $assignments as assignment, index}
			<tr>
				<td>{assignment.name}</td> 
				{#if assignment.current != null}
					<td></td>
					<td><b>{assignment.current}</b> / {assignment.max}</td>
				{:else}
					{#if editing == index}
						<td><input min=0 type="number" on:blur={() => {editing = null}} bind:value={assignment.possible}/> / {assignment.max}</td>
					{:else}
						<td on:click={() => {editing = index}}>{assignment.possible} / {assignment.max}</td>
					{/if}
					<td></td>
				{/if}
			</tr>
		{/each}
		<tr>
			<td><b>Total</b></td>
			<td>{calculatePossibleGrade($assignments).toFixed(2)}</td>
			<td><b>{calculateGrade($assignments).toFixed(2)}</b></td>
		</tr>
	</tbody>
</table>
