var fs = require('fs')
var exportDataToJson = (json, filename) => {
  // decide output filename
  if (filename.endsWith('.txt')) { filename = filename.replace('.txt', '_output.csv') } else if (filename.endsWith('.csv')) { filename = filename.replace('.csv', '_output.csv') } else {
    console.log('Unsupported Format')
    process.exit(1)
  }
  // print the header column
  var csv = Object.keys(json[Object.keys(json)[0]]).join(',') // Header columns.
  csv += '\n'
  // iterate through json object
  for (var item in json) {
    if (json[item] !== '') {
      csv += Object.values(json[item]).join(',')
      csv += '\n'
    }
  }
  // write file
  fs.writeFile(filename, csv, (err, data) => {
    if (err) {
      console.log('Unsupported file operation.')
      console.log('Check if the file is open.')
    }

    console.log('File can be found at ' + filename)
    process.exit()
  })
}

module.exports = { exportDataToJson }
