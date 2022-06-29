<script lang="ts">
	import { assignments } from "./store.ts"
	import { calculatePossibleGrade, calculateCurrentGrade } from "./Assignment.ts"

	let editing = undefined;

</script>

<style>
	th {
		width: 33%;
	}
</style>

<table class="table table-striped">
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
				{#if assignment.current != undefined}
					<td></td>
				{:else}
					{#if editing == index}
						<td><input min=0 type="number" on:blur={() => {editing = undefined}} bind:value={assignment.possible}/></td>
					{:else}
						<td on:click={() => {editing = index}}>{assignment.possible}</td>
					{/if}
				{/if}
				<td><b>{assignment.current != undefined ? assignment.current : "" }</b></td>
			</tr>
		{/each}
		<tr>
			<td><b>Total</b></td>
			<td>{calculatePossibleGrade($assignments)}</td>
			<td><b>{calculateCurrentGrade($assignments)}</b></td>
		</tr>
	</tbody>
</table>
