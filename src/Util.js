var validator = require('./Validator')
var moment = require('moment')

var yearAndMonthFormatter = (value, dateformat) => {
    var d = moment(value, dateformat)
    console.log(d)
    var formattedDate = new Date(d);
    console.log(formattedDate);
    console.log(formattedDate.getMonth()+formattedDate.getUTCFullYear());

    return value;
}

var dateFlag = (firstRow, key, columns, dateformat) => {
    var flag = false;
    return columns.forEach(value => {
        if (key == value) {
            if (validator.checkIfItIsADate(firstRow[value], dateformat)) {
                flag = true;
                return flag;
            }
        }
    })

}


var checkIfFieldIsADate = (value, format) => {
    if (validator.checkIfItIsADate(value, format)) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = {
    yearAndMonthFormatter, dateFlag, checkIfFieldIsADate
}