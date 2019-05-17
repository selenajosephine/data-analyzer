const readline = require('readline');

const Ask = (questions) => {
    return new Promise(async resolve => {
        let rl = readline.createInterface(process.stdin, process.stdout);
        let results = await new Promise(resolve => { rl.question(questions, answer => resolve(answer)) })
        resolve(results)
    })
}


module.exports = {
    askQuestions: Ask
}
