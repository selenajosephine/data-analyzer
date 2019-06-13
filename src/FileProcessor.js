const readline = require('readline');
const fs = require('fs')
const { yearAndMonthFormatter } = require('./Util.js')

let title = [];
let groupby = [];

// method to read input from user
const Ask = (questions) => {
    return new Promise(async resolve => {
        // create a readline interface to read data
        let rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
        // wait for input before proceeding
        let results = await new Promise(resolve => { rl.question(questions, answer => resolve(answer)) })
        // wait for promise to resolve
        resolve(results)
    })
}

// method to read the file
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        // read the file with utf8; and wait for the data to resolve
        fs.readFile(path, { encoding: 'utf8' }, (err, data) => { err ? reject(err) : resolve(data); });
    });
}

// method to split the file into title and data
const processFile = (file) => {
    try {
        // split based on the first \n for title
        titleTemp = file.split("\n")
        // remove white spaces to avoid '\r'
        title = titleTemp[0].trim().split("\t")
        var data = titleTemp;
        data.shift()
        // get user input on number of columns available
        Ask("Do you have " + title.length + " columns?  (y/n)  ")
            .then(response => {
                // check if the response is valid- y|Y
                if (response == "Y" || response == "y") {
                    // convert data to Json if it is valid
                    var jsonData = convertToJson(data, title)
                    // method returns json format data 
                    return jsonData
                }
                // TO-DO
                else Ask("Then how many columns are there?  ")
                    .then(columncount => {
                        console.log(columncount)
                    })
            }).then(jsonData => {
                // method to sort all the data
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
    // iterate through each row divided by \n
    data.forEach(singleRow => {
        // remove the whitespace with trim to avoid \r and split it 
        var oneRow = singleRow.trim().split('\t')
        var temp = {}
        // for every item in the row, map to property of json object
        for (var i = 0; i < oneRow.length; i++)  temp[title[i]] = oneRow[i];
        // add temp to json object
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

// method to decide which 
var groupByColumns = () => {
    return new Promise(async resolve => {
        console.log("Your columns are")
        // map all the columns to display index-column name
        title.forEach((value, index) => console.log(`${index + 1}. ${value}`))
        // wait for user input on what column you want to group by
        Ask("Which columns do you want to group by? Enter the column number separated by commas (,)  ")
            .then(response => {
                var temp = response.split(",")
                // flag to check if it is the group by values are correct
                var flag = true;
                // check if the input value is lower than number of columns (index)
                temp.forEach(value => {
                    // if no of titles are valid, then return
                    if (value < title.length && value > 0) return
                    // if no of titles are not false
                    else flag = false;
                })
                // if the column number is permissible
                if (flag) {
                    // map the temp based on index to title
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

// method where all the mapping takes place 
const mapperFunction = (objectArray, keyValue) => {
    var map = new Map();
    // group object by key [ group by first group by object]
    objectArray.forEach((item) => map = groupAction(item, item[keyValue], map, false))
    var resultHashMap = groupByStatus(map);
    return resultHashMap
}

var groupByStatus = (datamap) => {
    console.log(datamap)
    var result = new Map();
    for ([key, value] of datamap) {
        var map = new Map();
        var temp = key
        value.forEach(singleParam => {
            map = groupAction(singleParam, singleParam[groupby[1]], map, false)
        })
        result.set(temp, map);
    }
    var finalResult = new Array();
    for ([key, value] of result) {
        value.forEach(singleParam => {
            var obj = {};
            obj[groupby[0]] = key
            obj[groupby[1]] = singleParam[0][groupby[1]]
            obj["count"] = singleParam.length

            //console.log(singleParam)

            finalResult.push(obj)
        })
    }
    console.log("Final Result is ")
    console.log(finalResult)
    
    return finalResult
}

// group action to decide if its a new object or an existing key
var groupAction = (item, keyValue, map, flag) => {
    flag ? key = yearAndMonthFormatter(item[`${keyValue}`]) : key = keyValue;
    const collection = map.get(key)
    collection ? collection.push(item) : map.set(key, [item])
    return map;
}

module.exports = {
    askQuestions: Ask,
    readFile: readFile,
    processFile: processFile
}
