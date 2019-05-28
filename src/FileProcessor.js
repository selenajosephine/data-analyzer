const readline = require('readline');
const fs = require('fs')

let title = []

// method to read input from user
const Ask = (questions) => {
    return new Promise(async resolve => {
        let rl = readline.createInterface(process.stdin, process.stdout);
        let results = await new Promise(resolve => { rl.question(questions, answer => resolve(answer)) })
        resolve(results)
    })
}

// method to read the file
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}

// method to split the file into title and 
const processFile = (file) => {
    try {
        titleTemp = file.split("\n")
        title = titleTemp[0].split("\t")
        var data = titleTemp;
        data.shift()
        
        console.log("Do you have "+title.length+ " columns?  (y/n)")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    askQuestions: Ask,
    readFile: readFile,
    processFile: processFile
}
