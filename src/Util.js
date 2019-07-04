var validator = require('./Validator')


var yearAndMonthFormatter = (value) => {
    console.log("Inside formater")
    return value;
}

var dateFlag = (firstRow, key, columns,dateformat) => {
    return columns.forEach(value => {
        if (key == value) {
            if (validator.checkIfItIsADate(firstRow[value], dateformat) ){
                return true
            }
        }
    })
}


module.exports = {
    yearAndMonthFormatter, dateFlag
}