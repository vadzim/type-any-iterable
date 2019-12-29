// @flow

import { type AsyncValue } from "type-async-value"
import { type AnyIterable } from ".."

it("should not fail", async () => {
	// flow@0.114.0 has bugs:
	// * `for await` can iterate over sync iterables, but flow dowsn't know about that.
	// * `for await` resolves any promised value before assigning it to the iteratee, but flow dowsn't know about that.

	function asAsyncIterable<T, R = *, N = *>(x: $Iterable<AsyncValue<T>, R, N> | $AsyncIterable<AsyncValue<T>, R, N>) {
		return (x: any)
	}

	async function test(seq: AnyIterable<number>) {
		for await (const x of asAsyncIterable(await seq)) {
			expect(typeof x).toBe("number")
			expect(x - 1).toBe(41)
		}
	}

	await test([42, Promise.resolve(42)])
	await test(function*() { yield 42; yield Promise.resolve(42) }())
	await test(async function*() { yield 42; yield Promise.resolve(42) }())

	await test(Promise.resolve([42, Promise.resolve(42)]))
	await test(Promise.resolve(function*() { yield 42; yield Promise.resolve(42) }()))
	await test(Promise.resolve(async function*() { yield 42; yield Promise.resolve(42) }()))
})
