# Microtask vs Macrotask Timing Comparison

This script demonstrates the timing differences between synchronous tasks, microtasks, and macrotasks in JavaScript.

## Parameters

- **fib:** 2
- **iterations:** 1,000,000

## Results (without `addWorkHalfWay`)

- **synchronous timer:** 25.273ms
- **microtask timer:** 62.708ms
- **macrotask timer:** 124.649ms

### Timer Breakdown:

- **synchronous:** 25.273ms
- **microtask:** 37.435ms (62.708ms - 25.273ms)
- **macrotask:** 61.941ms (124.649ms - 62.708ms)

## Conclusions

1. **Synchronous tasks** will always be the fastest because they run first.
2. **Microtasks** will always be next fastest as they run after synchronous tasks in the same tick.
3. **Macrotasks** will always be the slowest because they run one by one, each in its own tick (i.e., for 1,000,000 iterations, it will take 1,000,000 ticks).

### Microtasks vs. Macrotasks

- Microtasks run in a single tick, while macrotasks run across multiple ticks.
- For example, executing 1 million microtasks in one tick and 1 million macrotasks across 1 million ticks results in just a 24ms difference—demonstrating the efficiency of microtasks.

## Why Do Microtasks Run in Different Ticks?

Macrotasks are designed for less time-sensitive operations like I/O, network requests, etc. This allows synchronous tasks to be added to the call stack and prioritized over macrotasks, while microtasks are prioritized as they are more time-sensitive.

### Testing with `addWorkHalfWay` Enabled

Enabling the `addWorkHalfWay` flag and running the script again reveals that the second microtask timer runs after the macrotask timer, even though it was added later. This happens because microtasks are prioritized over macrotasks.

## Results (with `addWorkHalfWay`):

- **synchronous timer:** 23.389ms
- **microtask timer:** 61.545ms
- **999,999 macrotasks done. Adding 3,000,000 more microtasks...**
- **microtask timer 2:** 724.645ms
- **macrotask timer:** 724.814ms

### Analysis:

When all but one of the macrotasks were executed, an additional 3 million microtasks were added. In the next tick, the event loop prioritized these microtasks, executing all 3 million before the final macrotask, which explains why the microtask timer 2 ended before the macrotask timer.
