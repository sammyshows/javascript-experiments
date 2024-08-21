console.log('Step 1');

setTimeout(() => console.log('Step 2'), 0);

new Promise((resolve, reject) => resolve(console.log('Step 3')));

new Promise((resolve, reject) => resolve('Step 4'))
    .then((value) => console.log(value));

console.log('Step 5');
