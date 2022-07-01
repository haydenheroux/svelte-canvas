<script lang="ts">
	import { assignments } from "../store"
	import { calculatePossibleGrade, calculateGrade } from "../Assignment"

	let editing = null;
</script>

<table class="w-full table-fixed">
	<thead>
		<tr class="h-14 border-b border-gray-400 bg-gray-50">
			<th class="p-3 text-sm font-semibold tracking-wide text-left text-gray-700">Name</th>
			<th class="w-30 p-3 text-sm font-semibold tracking-wide text-left text-gray-700">Possible</th>
			<th class="w-30 p-3 text-sm font-semibold tracking-wide text-left text-gray-700">Current</th>
		</tr>
	</thead>
	<tbody>
		{#each $assignments as assignment, index}
			<tr class="h-14 border-b border-gray-100 {index == $assignments.length - 1 ? "border-none" : ""} {index % 2 == 0 ? "bg-white" : "bg-gray-50"}">
				<td class="p-3 text-sm text-gray-700">{assignment.name}</td> 
				{#if assignment.current != null}
					<td class="p-3 text-sm text-gray-700"></td>
					<td class="p-3 text-sm text-gray-700"><b>{assignment.current}</b> / {assignment.max}</td>
				{:else}
					{#if editing == index}
						<td class="p-3 text-sm text-gray-700"><input class="w-16 md:w-24 p-1 border border-solid border-gray-400 rounded-md" min=0 type="number" on:blur={() => {editing = null}} bind:value={assignment.possible}/> / {assignment.max}</td>
					{:else}
						<td class="p-3 text-sm text-gray-700" on:click={() => {editing = index}}>{assignment.possible} / {assignment.max}</td>
					{/if}
					<td class="p-3 text-sm text-gray-700"></td>
				{/if}
			</tr>
		{/each}
		<tr class="h-14 border-t border-gray-400 {$assignments.length % 2 == 0 ? "bg-white" : "bg-gray-50"}">
			<td class="p-3 text-sm text-gray-700"><b>Total</b></td>
			<td class="p-3 text-sm text-gray-700">{calculatePossibleGrade($assignments).toFixed(2)}</td>
			<td class="p-3 text-sm text-gray-700"><b>{calculateGrade($assignments).toFixed(2)}</b></td>
		</tr>
	</tbody>
</table>
