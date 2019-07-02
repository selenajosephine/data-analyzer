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
var checkIfItIsADate = (value, dateformat) => {
    if (value.includes("-") || value.includes("/")) {
        if (askFirstTime) {
            if (value.includes("-") && !value.includes("/") && dateformat.includes("-")) {
                datetypevalidation(value, "-", dateformat);
            }
            else if (value.includes("/") && !value.includes("-") && dateformat.includes("/")) {
                datetypevalidation(value, "/", dateformat)
            }
            else {
                console.log("Check the Date format")
                process.exit();
            }
            askFirstTime=false;
        }
        else {

        }
    }
}


var datetypevalidation = (value, delimiter, dateformat) =>{
    if((value.indexOf(delimiter)==dateformat.indexOf(delimiter)) && (value[1].length == dateformat[1].length) ){
        console.log("all conditions match")
    }
    else{
        console.log("Check the date format")
        process.exit()
    }
}

module.exports = { checkColumnCount, checkFileExists, checkIfItIsADate }