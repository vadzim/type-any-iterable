import { AnyIterable } from '.'

async function test(seq: AnyIterable<number>) {
	for await (const x of await seq) {
		console.log(x - 1)
	}
}

test([42, Promise.resolve(42)])
test(function*() { yield 42; yield Promise.resolve(42) }())
test(async function*() { yield 42; yield Promise.resolve(42) }())

test(Promise.resolve([42, Promise.resolve(42)]))
test(Promise.resolve(function*() { yield 42; yield Promise.resolve(42) }()))
test(Promise.resolve(async function*() { yield 42; yield Promise.resolve(42) }()))
