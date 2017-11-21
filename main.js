const WebPageTest = require('webpagetest');
const config = require('./movoto.config.json');
const URL_Home = 'https://www.movoto.com/';
const wpt = new WebPageTest(config.WebPageTestHost, config.APIKEY);
const Promise = require('bluebird');

const runTestAsync = Promise.promisify(wpt.runTest, { context: wpt });
const getTestStatusAsync = Promise.promisify(wpt.getTestStatus, { context: wpt });
const getTestResultsAsync = Promise.promisify(wpt.getTestResults, { context: wpt });


var customMetrics = [
    '[myiframes]',
    'return document.getElementsByTagName("iframe").length'
  ]

// runTestAsync(URL_Home, {
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

let testId = '171121_B2_c660b310005e5567175c7716fb552340';
getTestStatusAsync(testId).then((ret)=>{
    if(ret.statusCode === 200)
        return getTestResultsAsync(testId)
    throw new Error('Not finished');
}).then((ret)=>{
    console.log(ret.data.average.firstView);
}).catch(err=>{
    console.log(err);
});