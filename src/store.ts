import { writable } from "svelte/store";

export const assignments = writable([
	{
		name: "Chemistry of Toys",
		isSummative: false,
		possible: null,
		current: 80,
	},
	{
		name: "Final Exam",
		isSummative: true,
		possible: 90,
		current: null,
	}
]);
