const readline = require('readline');
var checkColumnCount = (columncount, titlecolumn) => {
    if (columncount > 0 && columncount < titlecolumn.length + 1)
        return true
    else
        return false
}

var checkFileExists = (file) => {
    if (file) {
        var valdata = file;
        var count = valdata.split(/\n/g);
        valdata = "";
        if (count.length > 2) return true;
        else return false;
    }
}

var askFirstTime = true;
var checkIfItIsADate = (value) => {
    if (value.includes("-") || value.includes("/")) {
        console.log(value)
        if (askFirstTime) {
            askQuestion("Enter the date format: ").then(response => {
                console.log("inside response")
                resolve(response)
            })
                .catch(err => {
                    console.log("Error reading date format")
                })
        }
        else {

        }
    }
    else {
        console.log("Date format does not match")
    }
}

// method to read input from user
function askQuestion(query) {
    var rl = null;
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false 
    });
  
    return new Promise(resolve => rl.question(query, ans => {
      rl.close();
      resolve(ans);
    }))
  } 
module.exports = { checkColumnCount, checkFileExists, checkIfItIsADate }