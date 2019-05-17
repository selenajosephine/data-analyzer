// var readFileName = require(`./FileProcessor.js`)

// console.log(`Your Analzyer is starting`)
// var filename = readFileName().then((filename )=>{
//     console.log(`isnide filename`)
// })
// console.log(filename)

// For those interested I put together this little module that takes an array of questions and returns a promise that resolves to an array of answers:


const { askQuestions } = require('./FileProcessor');
const filelocationQuestion = 'Enter your file location::'

askQuestions(filelocationQuestion)
    .then(filename => {
        if (filename.includes(".txt") || filename.includes(".csv"))
            console.log(`true`)
        else {
            console.log(`Only .txt and .csv files are accepted`)
            askQuestions(filelocationQuestion)
        }
    });
