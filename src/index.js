const { askQuestions, readFile, processFile } = require('./Processor');
const filelocationQuestion = 'Enter your file location  '

var start = () => {
    // method call to run readline 
    askQuestions(filelocationQuestion)
        .then(filename => {
            if (filename.includes(".txt") || filename.includes(".csv")) {
                readFile(filename)
                    .then(file =>
                        processFile(file)
                    )
                    .catch(err => {
                        console.log(`Check the file location`);
                        process.exit();
                    })
            }
            else {
                console.log(`Only .txt and .csv files are accepted`)
                filename = "";
                start();
            }
        });
}

start();

module.exports = start;