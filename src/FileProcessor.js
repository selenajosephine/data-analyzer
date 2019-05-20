const readline = require('readline');
const fs = require('fs')



const Ask = (questions) => {
    return new Promise(async resolve => {
        let rl = readline.createInterface(process.stdin, process.stdout);
        let results = await new Promise(resolve => { rl.question(questions, answer => resolve(answer)) })
        resolve(results)
    })
}


const readFile = (path) =>{
    return new Promise((resolve,reject) =>{
        fs.readFile(path,{encoding:'utf8'}, (err, data)=>{
            err?reject(err):resolve(data);
        });
    });
}

module.exports = {
    askQuestions: Ask,
    readFile: readFile
}
