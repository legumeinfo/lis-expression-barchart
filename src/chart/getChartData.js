/**
 * Create ChartJS data from queryData results.
 */
export default function getChartData(results) {
    // initialize the chart.js data object
    // sampleNames are stored for chart sizing purposes
    const data = {
        datasets: [],
        maxSamples: 0
    };

    // colors for up to 10 sources
    const backgroundColors = [ '#900', '#090', '#009', '#990', '#909', '#099', '#360', '#306', '#036', '#000' ];

    // populate the datasets array with data from each source
    var currentSource = null;
    var i = -1;
    results.forEach(result => {
        // build sample display name
        var name = result.sample.num;
        if (result.sample.genotype) {
            name = name + "." + result.sample.genotype + ".";
        }
        if (result.sample.tissue) {
            name = name + result.sample.tissue;
        }
        if (result.sample.treatment) {
            name = name + ":" + result.sample.treatment;
        }
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
    });

    // find the maximum number of samples in a source
    for (var i=0; i<data.datasets.length; i++) {
        if (data.datasets[i].data.length > data.maxSamples) {
            data.maxSamples = data.datasets[i].data.length;
        }
    }
    
    return data;
}
