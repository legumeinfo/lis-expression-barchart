import {
    BarController,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import { ReactChart } from 'chartjs-react';

ReactChart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

export function ExpressionBarchart({ chartData, chartOptions }) {
    if (!chartData || !chartOptions) return;
    return (
        <ReactChart
            type="bar"
            data={chartData}
            options={chartOptions}
            height={ chartData.sampleNames.length>30 ? '260px' : '' }
        />
    );
}
