/**
 * Create ChartJS data from queryData results for a desired source.
 */
export default function getChartData(results, source) {
    // initialize the chart.js data object with a single dataset.
    const data = {
        datasets: [{
            source: source.name,
            indexAxis: 'y',
	    backgroundColor: source.backgroundColor,
	    borderWidth: 0,
	    data: []
        }]
    };
    // populate the datasets array with data from the desired source
    results.forEach(result => {
        if (result.sample.source.primaryIdentifier == source.name) {
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
            data.datasets[0].data.push({ x:value, y:name });
        }
    });
    return data;
}
