import { ReactChart } from 'chartjs-react';
import {
    BarController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    BarElement,
    Tooltip,
} from 'chart.js';

// Register all of your imported stuff!
ReactChart.register(BarController, CategoryScale, LinearScale, LogarithmicScale, BarElement, Tooltip);

export function ExpressionBarchart({ data }) {
    if (!data) return;

    // default chart options
    const options = {
        scales: {
            y: {
                axis: 'y',
                type: 'category',
                position: 'left', // `axis` is determined by the position as `'y'`,
                title: {
                    text: 'Sample',
                    display: true,
                },
                ticks: {
                    autoSkip: false,
                },
            },
            x: {
                axis: 'x',
                min: 0,
                type: 'linear',
                position: 'bottom',
                title: {
                    text: 'TPM',
                    display: true,
                },
                ticks: {
                    display: true,
                    major: {
                        enabled: true,
                    },
                },
            },
        },
	maintainAspectRatio: false,
	responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.parsed.x + " TPM";
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div className="chart-container">
            <ReactChart
                id="expression-bar-chart"
                type="bar"
                data={{
                    datasets: [
                        data.datasets[0]
                    ]
                }}
                options={options}
            />
        </div>
    );
}
