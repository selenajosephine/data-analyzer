const { askQuestions, readFile } = require('./FileProcessor');
const filelocationQuestion = 'Enter your file location  '

askQuestions(filelocationQuestion)
    .then(filename => {
        if (filename.includes(".txt") || filename.includes(".csv")) {
            readFile(filename).then(file =>{
               console.log(file)
            }).catch(err =>{
                console.log(`Check the file location`);
                process.exit(1)
            })
        }
        else{
            console.log(`Only .txt and .csv files are accepted`)
            process.exit(1)
        }

    });
