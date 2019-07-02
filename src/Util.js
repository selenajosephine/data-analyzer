var validator = require('./Validator')


var yearAndMonthFormatter = (value) => {
    console.log("Inside formater")
    return value;
}

var dateFlag = (firstRow, key, columns) => {
    return columns.forEach(value => {
        if (key = value) {
            if (validator.checkIfItIsADate(firstRow[value])) {s
                return true
            }
        }
    })
}


module.exports = {
    yearAndMonthFormatter, dateFlag
}