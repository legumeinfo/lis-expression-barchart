/**
 * Create ChartJS data from PathQuery results.
 */
export default function getChartData(results) {
    // sort results according to sample number
    // results.sort((r1, r2) => {
    // 	let valA, valB;
    //     valA = r1.sample.num;
    //     valB = r2.sample.num;
    //     return valA < valB ? -1 : valA > valB ? 1 : 0;
    // });

    // initialize the chart.js data object
    // store sampleNames in data for sizing purposes
    // const data = {
    //     datasets: [],
    //     sampleNames: [],
    // };

    // initialize the chart.js data object
    const data = {
        datasets: [],
        sampleNames: [],
    };

    // available colors for up to 7 sources
    const backgroundColors = [ '#900', '#090', '#009', '#990', '#909', '#099' ];


    // {
    //     "objectId": 90986843,
    //     "class": "ExpressionValue",
    //     "sample": {
    //         "num": 1,
    //         "objectId": 7000013,
    //         "class": "ExpressionSample",
    //         "name": "LR-112A",
    //         "description": "Description of this sample.",
    //         "treatment": "Concentrated salt",
    //         "replicateGroup": "salt_exposure"
    //     },
    //     "source": "CDCFrontier.gnm3.ann1.expr.CDC_Consul.Perilla-Henao_2018",
    //     "value": 0,
    //     "feature": "Ca3g022200"
    // }
    

    // populate the datasets array with data from each source
    // do we want to scale to log values?
    // scale value according to log / linear
    // const scaleVal = n => (scale=='log' ? Math.log2(n) : n);
    var currentSource = null;
    var i = -1;
    results.forEach(result => {
        var name = "";
        if (result.sample.replicateGroup) {
            name = name + result.sample.replicateGroup + ": ";
        }
        name = name + result.sample.name;
        const value = result.value;
        const source = result.source;
        if (source != currentSource) {
            currentSource = source;
            i++;
            data.datasets.push({
                source: source,
                indexAxis: 'y',
	        backgroundColor: backgroundColors[i],
	        borderWidth: 0,
	        data: [] });
        }
        data.datasets[i].data.push({ x:value, y:name });
        data.sampleNames.push(name);
    });
    
    return data;
}
