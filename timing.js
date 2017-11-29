var keys = ['navigationStart', 'unloadEventStart', 'unloadEventEnd', 'redirectStart', 'redirectEnd', 'fetchStart', 'domainLookupStart', 'domainLookupEnd', 'connectStart', 'connectEnd', 'secureConnectionStart', 'requestStart', 'responseStart', 'responseEnd', 'domLoading', 'domInteractive', 'domContentLoadedEventStart', 'domContentLoadedEventEnd', 'domComplete', 'loadEventStart', 'loadEventEnd'];

var timings = [];
var startTime = performance.timing['navigationStart'];
for (var key of keys) {
    let time = performance.timing[key];
    let elapse = 0;
    if (time) {
        elapse = time - startTime;
    }
    var item = {
        value: time,
        key: key,
        elapse: `${elapse} ms`
    }
    if (item.key === 'responseStart') {
        item.comment = 'TTFB is here';
    }
    timings.push(item);
}

timings.sort((a, b) => {
    return a.value - b.value
})