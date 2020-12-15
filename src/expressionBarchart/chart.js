import React from 'react';
import { Chart, Tooltip, BarElement, BarController, CategoryScale, LinearScale, Title } from 'chart.js';

Chart.register(Tooltip, BarElement, BarController, CategoryScale, LinearScale, Title);

class ExpressionBarchart extends React.Component {
    componentDidMount() {
	const { chartData, dataOptions } = this.props;
	if (!chartData) return;
	this.chart = new Chart(this.graph, {
	    type: 'bar',
	    data: {
		labels: chartData.sampleNames,
		datasets: [
		    {
                        indexAxis: 'y',
			data: chartData.values,
			backgroundColor: '#373',
			borderWidth: 0
		    }
		]
	    },
	    options: {
                plugins: {
	            title: {
	                text: 'Expression by Sample (TPM)',
	                position: 'top',
	                display: true,
                        font: {
	                    size: 16,
	                    style: 'bold'
                        }
	            }
                },
                // need to figure out how to label TPM axis!
	        // scales: {
	        //     x: {
	        //         scaleLabel: {
	        //             display: true,
	        //             labelString: 'Sample Name',
	        //             fontSize: 16,
	        //             fontStyle: 'italic',
	        //             fontColor: '#000'
	        //         }
	        //     },
	        //     y: {
	        //         scaleLabel: {
	        //             display: true,
	        //             labelString: 'Expression (TPM)',
	        //             fontSize: 16,
	        //             fontStyle: 'italic',
	        //             fontColor: '#000'
	        //         }
	        //     }
	        // },
	        maintainAspectRatio: true,
	        responsive: true
	    }
	});
    }

    componentDidUpdate() {
	const { chartData, dataOptions } = this.props;
	if (!chartData) return;
	this.chart.data.labels = chartData.sampleNames;
	this.chart.data.datasets[0].data =
	    dataOptions.val === chartData.values;
	this.chart.data.datasets[0].backgroundColor = '#bbb';
	this.chart.update();
    }

    render() {
	return (
	    <canvas
		height={
		    (this.props.chartData && this.props.chartData.sampleNames.length) > 30
			? '260px'
			: ''
		}
		className="graph"
		ref={r => {
		    this.graph = r;
		}}
	    />
	);
    }
}

export default ExpressionBarchart;
