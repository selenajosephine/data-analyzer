var validator = require('./Validator.js')

describe("test validation in application",()=>{
    it("has been defined",()=>{
        expect(validator).toBeDefined();
    })

    it("check if the column count is invalid",()=>{
        var title=["col1","col2","col3"];
        var column = 4;
        var flag = validator.checkColumnCount(column, title); 
        expect(flag).toBeFalsy();
    })

    it("check if the column count is valid",()=>{
        var title=["col1","col2","col3"];
        var column = 2;
        var flag = validator.checkColumnCount(column, title); 
        expect(flag).toBeTruthy();
    })

    it("file has proper data to be dealt with",()=>{
        var filecontent ="SampleText\n this is my second line \n and my third line";
        var flag = validator.checkFileExists(filecontent);
        expect(flag).toBeTruthy();
    })

    it("file has one row of data",()=>{
        var filecontent ="SampleText\n this is my second line";
        var flag = validator.checkFileExists(filecontent);
        expect(flag).toBeFalsy();
    })

    it("file has only title row",()=>{
        var filecontent ="SampleText\n this is my second line";
        var flag = validator.checkFileExists(filecontent);
        expect(flag).toBeFalsy();
    })

    it("file has no data",()=>{
        var filecontent ="";
        var flag = validator.checkFileExists(filecontent);
        expect(flag).toBeFalsy();
    })

    it("date format mm-dd-yyyy",()=>{
        var dateFormat = "mm-dd-yyyy";
        var value = "09-14-1995";
        var flag = validator.checkIfItIsADate(dateFormat,value);
        expect(flag).toBeTruthy();
    })

    // it("date format mm-dd-yyyy does not match",()=>{
    //     var dateFormat = "mm-dd-yyyy";
    //     var value = "1995-09-14";
    //     var flag = validator.checkIfItIsADate(dateFormat,value);
    //     expect(flag).toBeFalsy();
    // })
})