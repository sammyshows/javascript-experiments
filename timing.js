console.log('Preparing environment...'); // This will act as an initial trigger

let fib = 2
let iterations = 1000000
let addWorkHalfWay = true



// Microtasks
for (let i = 0; i < iterations; i++) {
  Promise.resolve().then(() => doWork(i));
}
Promise.resolve().then(() => {
  console.timeEnd('microtask timer');
});




// Macrotasks
for (let i = 0; i < iterations; i++) {
  setTimeout(() => {
    doWork(i)

    if (addWorkHalfWay && i === iterations - 1) {
      console.log(`${(iterations - 1).toLocaleString('en-AU')} macrotasks done. Adding ${(3 * iterations).toLocaleString('en-AU')} more microtasks...`);
      for (let i = 0; i < 3 * iterations; i++) {
        Promise.resolve().then(() => doWork(i));
      }
      Promise.resolve().then(() => {
        console.timeEnd('microtask timer 2');
      });
    }
  }, 0);
}
setTimeout(() => {
    console.timeEnd('macrotask timer');
}, 0);



// Now that all microtasks and macrotasks are created, we can start the timers
console.log('Start: 0ms')
console.time('synchronous timer');
console.time('microtask timer');
console.time('macrotask timer');
if (addWorkHalfWay) {
  console.time('microtask timer 2');
}




// First, run some synchronous tasks. The time spent here will be included in the asynchronous timers
for (let i = 0; i < iterations; i++) {
  doWork(i);
}
console.timeEnd('synchronous timer');




// High Computational Intensity Task
function doWork() {
  function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  return fibonacci(fib);  // 20 is chosen for demonstration; can be adjusted
}


// Each loop ran with these parameters:
// fib: 2
// iterations: 1,000,000

// RESULTS:
// synchronous timer: 25.273ms
// microtask timer: 62.708ms
// macrotask timer: 124.649ms

// Since each timer is dependent on the prior tasks, their individual time is as such
// synchronous: 25.273ms
// microtask: 37.435ms (62.708ms - 25.273ms)
// macrotask: 61.941ms (124.649ms - 62.708ms)


// CONCLUSIONS:
// 1. The synchronous tasks will always be the fastest (they run first)
// 2. The microtasks will always be next fastest (they all run after synchronous tasks in the same tick)
// 3. The macrotasks will always be the slowest (they run one by one each in their own tick i.e. for 1,000,000 iterations, it will take 1,000,000 ticks)

// Note the difference between the microtask (1 million tasks in one tick) and macrotask (1 million tasks in 1 million ticks) timers.
// Considering the loop ran 1 million times more, having just a 24ms difference is quite impressive.

// Sooo, why do micro tasks run in different ticks?
// Well macrotasks are intended for tasks that are not as time-sensitive, like I/O operations, network requests, etc.
// This means synhcronous tasks can be added to the call stack during this period and will still be prioritised over macrotasks. Microtasks will also take precedence as they are more time-sensitive.

// To test this, enable the `addWorkHalfWay` flag and run the script again. You will see that the microtask timer 2 will run after the macrotask timer, even though it was added after the macrotasks.
// This is because the microtasks are more time-sensitive and will be prioritised over the macrotasks.

// RESULTS (with `addWorkHalfWay`):
// synchronous timer: 23.389ms
// microtask timer: 61.545ms
// 999,999 macrotasks done. Adding 3,000,000 more microtasks...
// microtask timer 2: 724.645ms
// macrotask timer: 724.814ms

// This time when all but one of the macrotasks had been executed, we added an additional 3 million microtasks.
// Because macrotasks run in different ticks, in the next tick the event loop priotised microtasks as it does and dequeued all 3 million, and the call stack executed them all.
// Only after all 3 million microtasks were executed did the final macrotask get executed. This is why the microtask timer 2 ended before the macrotask timer.
