var validator = require('./Validator')

var months = ["January", "February", "March", "April", 
                "May", "June", "July", "August", 
                "September", "October", "November", "December"];

var yearAndMonthFormatter = (value, dateformat) => {
    var formattedDate = new Date(value);
    var month = months[formattedDate.getMonth()]
    var year = formattedDate.getFullYear();
    var newKey = month + " " + year;
    return newKey;
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
    return validator.checkIfItIsADate(value, format) ? true:false;
}

module.exports = {
    yearAndMonthFormatter, dateFlag, checkIfFieldIsADate
}