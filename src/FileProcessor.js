const readline = require('readline');
const fs = require('fs')
const {yearAndMonthFormatter} = require('./Util.js')

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

// method to get the group by params and group it
var sortData = jsonData => {
    groupByColumns().then(columnsToGroupBy => {
        mapperFunction(jsonData, columnsToGroupBy[0])

    })
}

var groupByColumns = () => {
    return new Promise(async resolve => {
        console.log("Your columns are")
        // map all the columns to display index-column name
        title.forEach((value, index) => console.log(`${index + 1}. ${value}`))
        // wait for user input on what column you want to group by
        Ask("Which columns do you want to group by? Enter the column number separated by commas (,)  ").then(response => {
            var temp = response.split(",")
            // flag to check if it is the group by values are correct
            var flag = true;
            // check if the input value is lower than number of columns (index)
            temp.forEach(value => {
                if (value < title.length && value > 0) return
                else flag = false;
            })
            // if the column number is permissible
            if (flag) {
                for (var i = 0; i < temp.length; i++)
                    //push the column names to be grouped by to var
                    groupby.push(title[temp[i] - 1])
                resolve(groupby)
            }

            // TO-DO
            else {
                console.log(`invalid column number`)
            }
        })
    })
}


const mapperFunction = (objectArray, keyValue) => {
    var map = new Map();
    objectArray.forEach((item) => {
        map = groupAction(item, keyValue, map, false);
    })
    console.log(map)
    var resultHashMap = []//groupByStatus(map);
    return resultHashMap
}

var groupAction = (item, keyValue, map, flag) => {
    if (flag)
        key = yearAndMonthFormatter(item[`${keyValue}`])
    else
        key = keyValue;
    const collection = map.get(key)
    if (!collection)
        map.set(key, [item])
    else
        collection.push(item);
    return map;
}

module.exports = {
    askQuestions: Ask,
    readFile: readFile,
    processFile: processFile
}
