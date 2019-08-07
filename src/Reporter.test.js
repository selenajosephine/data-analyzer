const reporter = require('./Reporter.js')
const fs = require('fs')
//jest.mock('fs')
describe("test reporter function", () => {
    beforeAll(async () => {
        var json = [{
            "title1": "val",
            "title2": "val"
        }];
        var filename = "text.csv";
        //await reporter.exportDataToJson(json, filename)
    })
    it("should exist", () => {
        expect(reporter).toBeDefined();
    })

    it("should be called", () => {
       // expect(reporter.exportDataToJson(json, filename)).toHaveBeenCalled();

    })
    // it("calls fs",()=>{
    //     expect(fs).toHaveBeenCalled();
    // })
})