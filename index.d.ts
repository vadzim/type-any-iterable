import { AsyncValue } from 'type-async-value'

export type AnyIterable<T> = AsyncValue<
	| Iterable<AsyncValue<T>>
	| AsyncIterable<T>
>
