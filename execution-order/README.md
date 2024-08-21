# JavaScript Execution Challenges

This repository contains two JavaScript challenges that explore the nuances of JavaScript's event loop, promises, and async/await behavior. Each challenge presents a code snippet, a prompt to guess the output, and an explanation of what happens and why.

## Challenge 1: Understanding the Event Loop and Promise Execution

### Code Snippet

```javascript
console.log('Step 1');

setTimeout(() => console.log('Step 2'), 0);

new Promise((resolve, reject) => resolve(console.log('Step 3')));

new Promise((resolve, reject) => resolve('Step 4'))
    .then((value) => console.log(value));

console.log('Step 5');
```

### Prompt
Before you run the code, take a moment to guess the order in which the console logs will appear. What do you think the output will be?

### Output
```javascript
Step 1
Step 3
Step 5
Step 4
Step 2
```

### Explanation
1. `Step 1`: This is logged immediately as it’s a simple console.log statement.
2. `Step 3`: This is logged next because the promise is resolved synchronously with console.log('Step 3') as part of the promise executor function.
3. `Step 5`: This console.log is executed next, as it’s the next synchronous operation in the stack.
4. `Step 4`: The then callback is added to the microtask queue after the promise is resolved with 'Step 4'. Microtasks are processed after the current execution stack is clear, but before tasks like setTimeout.
5. `Step 2`: The setTimeout callback is scheduled to run after 0 milliseconds, which means it’s added to the task queue. Task queue callbacks are processed after the microtasks, so it’s executed last.


## Challenge 2: Mixing Promises with Async/Await

### Code Snippet

```javascript
console.log('Step 1');

setTimeout(() => console.log('Step 2'), 0);

new Promise((resolve, reject) => resolve('Step 3'))
	.then((value) => console.log(value));
	
new Promise((resolve, reject) => resolve(console.log('Step 4')));

await console.log('Step 5');

console.log('Step 6');
```

### Prompt

Take a moment to consider what the output of this code will be. How do you think the await keyword and the mix of promises and setTimeout will affect the execution order?

### Output
```javascript
Step 1
Step 4
Step 5
Step 6
Step 3
Step 2
```

### Explanation
1. `Step 1`: This is logged immediately as it’s the first synchronous operation.
2. `Step 4`: This is logged next because the first promise resolves immediately with the console.log('Step 4') call inside the executor.
3. `Step 5`: The await expression here immediately logs 'Step 5' and pauses the execution of the remaining code in the function until this console.log completes. However, because console.log is synchronous, it doesn’t actually pause anything substantial.
4. `Step 6`: This console.log runs immediately after 'Step 5' because await doesn’t introduce any actual asynchronous delay here.
5. `Step 3`: The then callback is placed in the microtask queue after 'Step 6' because the promise resolving 'Step 3' had its resolution handled asynchronously.
6. `Step 2`: The setTimeout callback runs last because it was placed in the task queue, which is processed after the microtask queue.