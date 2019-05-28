const readline = require('readline');
const fs = require('fs')

let title = [];
let groupby = [];

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
        fs.readFile(path, { encoding: 'utf8' }, (err, data) => { err ? reject(err) : resolve(data); });
    });
}

// method to split the file into title and 
const processFile = (file) => {
    try {
        titleTemp = file.split("\n")
        title = titleTemp[0].trim().split("\t")
        var data = titleTemp;
        data.shift()

        Ask("Do you have " + title.length + " columns?  (y/n)  ").then(response => {
            if (response == "Y" || response == "y") {
                var jsonData = convertToJson(data, title)
                return jsonData
            }
            // TO-DO
            else Ask("Then how many columns are there?  ").then(columncount => { console.log(columncount) })
        }).then(jsonData => {
            sortData(jsonData)
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


var sortData = jsonData => {
    var groupBy = [];
    groupBy = groupByColumns()
}

var groupByColumns = () => {
    console.log("Your columns are")
    title.forEach((value, index) => {
        console.log(`${index + 1}. ${value}`)
    })
    Ask("Which columns do you want to group by? Enter the column number separated by commas (,)  ").then(response =>{
        var temp = response.split(",")
        for(var i = 0; i<temp.length;i++)
        {
            groupby.push(title[temp[i]-1])
        }
        
    })
}

module.exports = {
    askQuestions: Ask,
    readFile: readFile,
    processFile: processFile
}
