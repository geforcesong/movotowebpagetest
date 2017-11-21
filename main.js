const WebPageTest = require('webpagetest');
const config = require('./movoto.config.json');
const URL_Home = 'https://www.movoto.com/';
const {promisify} = require('util');
const wpt = new WebPageTest(config.WebPageTestHost, config.APIKEY);

wpt.runTestAsync = promisify(wpt.runTest);
wpt.getTestStatusAsync = promisify(wpt.getTestStatus);
wpt.getTestResultsAsync = promisify(wpt.getTestResults);


var customMetrics = [
    '[myiframes]',
    'return document.getElementsByTagName("iframe").length'
  ]

// wpt.runTestAsync(URL_Home, {
//     custom: customMetrics.join('\n'),
//     connectivity: 'Cable',
//     location: 'Dulles:Chrome',
//     firstViewOnly: false,
//     runs: 1,
//     video: true
// }).then((ret) => {
//     const testId = ret.data.testId;
//     console.log(testId);
// }).catch(err => {
//     console.log(err);
// })

let testId = '171121_DV_7b322f7c2cda41b89fe586995a36d886';
wpt.getTestStatusAsync(testId).then((ret)=>{
    if(ret.statusCode === 200)
        return wpt.getTestResultsAsync(testId)
    throw new Error('Not finished');
}).then((ret)=>{
    console.log(ret.data.average.firstView);
}).catch(err=>{
    console.log(err);
});