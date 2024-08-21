console.log('Step 1')

setTimeout(() => console.log('Step 2'), 0)

new Promise((resolve, reject) => resolve('Step 3'))
	.then((value) => console.log(value))
	
new Promise((resolve, reject) => resolve(console.log('Step 4')))

await console.log('Step 5')

console.log('Step 6')