let parser = {}

parser.generateTestReport = (data) => {
    let myJSON = {
        "testResult": [
            {
                "totalTests": 0,
                "passed": 0,
                "failed": 0,
                "assertionReport": []
            }
        ]
    };
    if (data) {
        let content = JSON.parse(data);
        myJSON.testResult[0].totalTests = content.numTotalTests;
        myJSON.testResult[0].passed = content.numPassedTests;
        myJSON.testResult[0].failed = content.numFailedTests;
        let mydata = [];
        for (let i of content.testResults[0].assertionResults) {
            let obj = {};
            obj.status = i.status;
            let title = i.title.split("-");
            obj.testId = title[0];
            obj.testName = title[1];
            mydata.push(obj)
        }
        myJSON.testResult[0].assertionReport = mydata;
        return myJSON;
    }
}
// parser.generateTestReport();
module.exports = parser;