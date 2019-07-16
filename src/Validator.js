var checkColumnCount = (columncount, titlecolumn) => {
  return !!((columncount > 0 && columncount < titlecolumn.length + 1))
}

var checkFileExists = (file) => {
  if (file) {
    var valdata = file
    var count = valdata.split(/\n/g)
    return (count.length > 2)
  }
}

var checkIfItIsADate = (value, dateformat) => {
  var flag = false
  if (value.includes('-') || value.includes('/')) {
    if (value.includes('-') && !value.includes('/') && dateformat.includes('-')) {
      flag = datetypevalidation(value, '-', dateformat)
    } else if (value.includes('/') && !value.includes('-') && dateformat.includes('/')) {
      flag = datetypevalidation(value, '/', dateformat)
    } else {
      console.log('Check the Date format')
      process.exit()
    }
  }
  return flag
}

var datetypevalidation = (value, delimiter, dateformat) => {
  if ((value.indexOf(delimiter) === dateformat.indexOf(delimiter)) && (value[1].length === dateformat[1].length)) {
    return true
  } else {
    console.log('Check the date format')
    process.exit()
  }
}

module.exports = { checkColumnCount, checkFileExists, checkIfItIsADate }
