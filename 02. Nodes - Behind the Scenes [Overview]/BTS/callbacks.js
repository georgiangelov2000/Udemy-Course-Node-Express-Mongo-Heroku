let fs = require('fs')

// let data = fs.readFileSync('example.txt');

// console.log(data.toString());

fs.readFile('example.txt', (error, data) => {
    if(error) return console.log(error);
    console.log(data.toString());
})


console.log('Program Ended');