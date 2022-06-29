import { writable } from "svelte/store";

export const assignments = writable([
	{
		name: "Chemistry of Toys",
		isSummative: false,
		possible: null,
		current: 80,
		max: 100
	},
	{
		name: "Titrations",
		isSummative: false,
		possible: null,
		current: 20,
		max: 40
	},
	{
		name: "Final Exam",
		isSummative: true,
		possible: 90,
		current: null,
		max: 100
	}
]);
