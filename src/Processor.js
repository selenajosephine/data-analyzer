const readline = require('readline');
const fs = require('fs')
const { yearAndMonthFormatter, dateFlag} = require('./Util')
const exporter = require('./Reporter')
const validate = require('./Validator')
let title = [];
let groupby = [];
var filename = "";
var dateformat="";

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
    filename = path
    return new Promise((resolve, reject) => {
        // read the file with utf8; and wait for the data to resolve
        fs.readFile(path, { encoding: 'utf8' }, (err, data) => { err ? reject("Ch") : resolve(data) });
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
        console.log("Enter the date format used in the file")
        Ask("Press enter if it is not applicable  ").then(response=>{
            return new Promise((resolve, reject)=>{
                String(response)
                if(response!=null && response != "/n" && (response.includes("-")||response.includes("/"))){
                    dateformat = response
                }
                getColumnsFromUser(data);
            })
        })
        // get user input on number of columns available
        
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
        for (var i = 0; i < oneRow.length; i++)
            temp[title[i]] = oneRow[i];
        // add temp to json object
        json.push(temp)
    })
    return json
}

// method to process the number of columns if the user says column count is not rights
var processNewColumnCount = (data, resolve) => {
    // read the number of columns
    Ask("Then how many columns are there?  ")
        .then(columncount => {
            // check if the number of columns is valid
            if (!validate.checkColumnCount(columncount, title)) {
                // throw error if it is invalid
                console.log("Check the file placed")
                process.exit()
            }
            // proceed processing if it is invalid
            var jsonData = convertToJson(data, title);
            resolve(jsonData);
        });
}


// method to get the group by params and group it
var sortData = jsonData => {
    // group by columns
    groupByColumns().then(columnsToGroupBy => {
        // calls map function
        const resultJson = mapperFunction(jsonData, columnsToGroupBy[0]);
        // export the result to json
        exporter.exportDataToJson(resultJson, filename)
    })
}

// method to decide which 
var groupByColumns = () => {
    return new Promise(async resolve => {
        console.log("Your columns are")
        // map all the columns to display index-column name
        title.forEach((value, index) =>
            console.log(`${index + 1}. ${value}`)
        )
        console.log("Which columns do you want to group by?")
        // wait for user input on what column you want to group by
        readColumn(resolve);
    })
}

// method to read column in order to group
var readColumn = (resolve) => {
    Ask("Enter the column number separated by commas in the order of grouping (,)  ")
        .then(response => {
            var { flag, temp } = columntitlenumbermapping(response);
            // if the column number is permissible
            if (flag) {
                // map the temp based on index to title
                for (var i = 0; i < temp.length; i++)
                    //push the column names to be grouped by to var
                    groupby.push(title[temp[i] - 1]);
                resolve(groupby);
            }
            // TO-DO
            else {
                console.log(`invalid column number`);
                readColumn(resolve);
            }
        })
}


// map title and column number
var columntitlenumbermapping = (response) => {
    var temp = response.split(",");
    // flag to check if it is the group by values are correct
    var flag = true;
    // check if the input value is lower than number of columns (index)
    temp.forEach(value => {
        // if no of titles are valid, then return
        if (value < title.length+1 && value > 0)
            return;
        // if no of titles are not false
        else
            flag = false;
    });
    return { flag, temp };
}

// method where all the mapping takes place 
const mapperFunction = (objectArray, keyValue) => {
    var flag = false;
    //flag = dateFlag(objectArray[0],keyValue, title)
    var map = new Map();
    // group object by key [ group by first group by object]
    objectArray.forEach((item) =>
        // call the group action 
        map = groupAction(item, item[keyValue], map)
    )
    // group all the column names
    var resultHashMap = groupByColumnNames(map);
    return resultHashMap
}

// group action to decide if its a new object or an existing key
var groupAction = (item, keyValue, map, flag) => {
    // checks if it is a date and month formatter
    flag ? key = yearAndMonthFormatter(item[`${keyValue}`]) : key = keyValue;
    // takes the key's object from the collection
    const collection = map.get(key)
    // if the obj is already present, adds the item, otherwise sets the item in map
    collection ? collection.push(item) : map.set(key, [item])
    // returns the map object
    return map;
}


// method to group by the column names
var groupByColumnNames = (datamap) => {
    var result = new Map();
    for (var i = 1; i < groupby.length; i++)
        // iterates to do the second level of grouping
        iterativelyGroup(datamap, result, groupby[i]);
    // iterates to keep the grouped data in JSON
    var finalResult = new Array();
    for ([key, value] of result) {
        value.forEach(singleParam => {
            var obj = {};
            obj[groupby[0]] = key
            for (var i = 1; i < groupby.length; i++) obj[groupby[i]] = singleParam[0][groupby[i]]
            obj["count"] = singleParam.length
            finalResult.push(obj)
        })
    }
    return finalResult
}

// method called when there are more than one groupingby objects
var iterativelyGroup = (datamap, result, param) => {
    for ([key, value] of datamap) {
        var map = new Map();
        var temp = key;
        value.forEach(singleParam => {
            map = groupAction(singleParam, singleParam[param], map, false);
        });
        result.set(temp, map);
    }
}



module.exports = {
    askQuestions: Ask,
    readFile: readFile,
    processFile: processFile,
   
}
function getColumnsFromUser(data) {
    Ask("Do you have " + title.length + " columns?  (y/n)  ")
        .then(response => {
            return new Promise((resolve, reject) => {
                // check if the response is valid- y|Y
                if (response == "Y" || response == "y") {
                    // convert data to Json if it is valid
                    var jsonData = convertToJson(data, title);
                    // method returns json format data 
                    resolve(jsonData);
                }
                // TO-DO
                else if (response == "N" || response == "n")
                    processNewColumnCount(data, resolve);
                else {
                    console.log("Invalid Response");
                    process.exit();
                }
            });
        }).then(jsonData => {
            // method to sort all the data
            sortData(jsonData);
        });
}

