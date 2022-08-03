/**
 * Create ChartJS data from PathQuery results.
 *
 * results[0]:
 *     {
 *         "feature": "Phvul.001G037800",
 *         "value": 966.57,
 *         "dataSets": [
 *             {
 *                 "name": "G19833.gnm1.ann1.expr.4ZDQ",
 *                 "class": "DataSet",
 *                 "objectId": 64000001
 *             }
 *         ],
 *         "sample": {
 *             "name": "Leaf Young",
 *             "class": "ExpressionSample",
 *             "objectId": 64000005,
 *             "num": 1
 *         },
 *         "class": "expressionValue",
 *         "objectId": 169177
 *     }
 */
export default function getChartData(results) {
    
    // sort results according to sample number
    results.sort((r1, r2) => {
    	let valA, valB;
        valA = r1.sample.num;
        valB = r2.sample.num;
        return valA < valB ? -1 : valA > valB ? 1 : 0;
    });

    // initialize the chart.js data object
    const data = {
        labels: [],
        datasets: [{
            indexAxis: 'y',
	    backgroundColor: '#373',
	    borderWidth: 0,
	    data: [],
        }],
        sampleNames: [],
    };

    // populate the labels, data, and sampleNames arrays
    // do we want to scale to log values?
    // scale value according to log / linear
    // const scaleVal = n => (scale=='log' ? Math.log2(n) : n);
    results.forEach(result => {
        const name = result.sample.name;
        const value = result.value;
        const feature = result.feature;
        data.labels.push(name);
        data.datasets[0].data.push(Number(value));
        data.sampleNames.push(feature);
    });

    return data;
}
