import { AnyIterable } from '..'

it("should not fail", async () => {
	// typescript@3.7.4 has a bug:
	// * sometimes it allows to use Promise<Iterable<>> in for-of though this leads to RTE.

	async function test(seq: AnyIterable<number>) {
		for await (const x of await seq) {
			console.log(x - 1)
		}
	}

	await test([42, Promise.resolve(42)])
	await test(function*() { yield 42; yield Promise.resolve(42) }())
	await test(async function*() { yield 42; yield Promise.resolve(42) }())

	await test(Promise.resolve([42, Promise.resolve(42)]))
	await test(Promise.resolve(function*() { yield 42; yield Promise.resolve(42) }()))
	await test(Promise.resolve(async function*() { yield 42; yield Promise.resolve(42) }()))
})
