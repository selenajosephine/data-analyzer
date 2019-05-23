const readline = require('readline');
const fs = require('fs')

let title = []

// method to read input from user
const Ask = (questions) => {
    return new Promise(async resolve => {
        let rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
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
        title = titleTemp[0].trim().split('\t')
        var data = titleTemp;
        data.shift();
        Ask("Do you have " + title.length + " columns?  (y/n)   ").then(response => {
            if (response == "Y" || response == "y") {
                var jsonData = convertToJson(data, title)
                return jsonData
            }
            else
                Ask("Then how many columns are there?  ").then(columncount => {
                    console.log(columncount)
                })
        }).then(jsonData => {
            console.log(jsonData)
        })
    }
    catch (err) {
        console.log(err)
    }
}

// method to convert txt to json
var convertToJson = (data, title) => {
    var json = new Array();
    data.forEach(singleRow => {
        var oneRow = singleRow.trim().split('\t')
        var temp = []
        for (var i = 0; i < oneRow.length; i++)
            temp[title[i]] = oneRow[i];
        json.push(temp)
    })
    return json
}

module.exports = {
    askQuestions: Ask,
    readFile: readFile,
    processFile: processFile
}
