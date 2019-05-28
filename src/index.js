const { askQuestions, readFile,processFile } = require('./FileProcessor');
const filelocationQuestion = 'Enter your file location  '

askQuestions(filelocationQuestion)
    .then(filename => {

        if (filename.includes(".txt") || filename.includes(".csv")) {
            readFile(filename)
                .then(file =>processFile(file))
                .catch(err =>{console.log(`Check the file location`);process.exit(1);})
                
        }
        else{
            console.log(`Only .txt and .csv files are accepted`)
            filename="";
            //askQuestions(filelocationQuestion)
            process.exit(1)
        }

    });
