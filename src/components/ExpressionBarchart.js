import {
    BarController,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';

import { ReactChart } from 'chartjs-react';

ReactChart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

export function ExpressionBarchart({ data }) {
    if (!data) return;

    // default chart options
    const options = {
        scales: {
            myScale: {
                type: 'category',
                position: 'left', // `axis` is determined by the position as `'y'`
            },
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    text: 'TPM',
                    display: true,
                },
            },
        },
	maintainAspectRatio: true,
	responsive: true,
    };

    return (
        <ReactChart
            id="expression-bar-chart"
            type="bar"
            data={data}
            options={options}
            height={ data.sampleNames.length>30 ? '260px' : '' }
        />
    );
}

