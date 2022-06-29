import type { NullableNumber } from "../types"

export interface IAssignment {
	name: string,
	isSummative: boolean,
	possible: NullableNumber,
	current: NullableNumber
}
