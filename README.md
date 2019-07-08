# Data Analyzer v1.0.0

This data mining tool was built in 2019 to analyze large volumes of data with JavaScript. 

The data analyzer is a command line tool built to interactively help examine large volumes of production data, and group the data to aid in making analysis/predictions. The grouped and analyzed data which contains a view on the number of rows under the grouping orders and is written to a CSV File. 

It has been built with only JavaScript API and no external development dependency.

The tool can easily handle 5,000,000 rows of data in 45 seconds upon increasing the heap. 

# Requirements - Software
Before diving into it, check if you have the following requirements

1. Node Runtime - to check, run `npm -v`
2. TXT/CSV file of data (preferably exported with a Query to the database)

## Other Requirements
You will require to input the following data
1. File Path (relative and absolute path accepted)
2. Date format in case it is available (if it is not, you can leave it blank)
3. Number of columns in the file
4. Columns by which data should be grouped

# How to Use

To use the data analyzer, follow the following steps- 
1. Create a new node project. Navigate to a location of choice and hit 
    `npm init -y`
2. `npm install data-analyzer` on your node runtime. The package gets installed to your node modules
3. Create a index.js file
4. Use the node module

To understand with an example, see below

# Example Usage

var analyze = require('data-analyzer')
analyze.start();

In the command terminal, type `node index.js`

In case the file has millions of rows of data, ` node --max-old-space-size=4096 index.js`


# Acknowledgment
This tool would not be possible without the support these three people -
`Vinoth Kumar Sunderraj` for guiding me and giving me an opportunity to build this tool.
`Radhakrishnan Balakrishnan` for being the best Lead and giving me the freedom to explore.
`Anurag Pathak` for inspiring me every day.


 
