import React from 'react';
import Loader from './common/loader';
import { useState, useEffect } from 'react';

import queryData from "./query/queryData.js";
import getChartData from "./chart/getChartData.js";

import { ExpressionBarchart } from "./components/ExpressionBarchart.js";
         
function RootContainer({ serviceUrl, entity, config }) {
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState(null);
    
    // default chart options
    const [chartOptions, setChartOptions] = useState({
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
	responsive: true,
    });

    // query data for expression barchart
    // TIP: useEffect with empty array dependency only runs once!
    useEffect(() => {
        queryData(entity.value, serviceUrl)
	    .then(res => {
	        setChartData(getChartData(res));
	    })
	    .catch(() => {
	        setError("No Expression Data Found!");
	    });
    }, []);

    if (error) return (
        <div className="rootContainer error">{ error }</div>
    );
    
    return (
        <div>
            {(chartData && chartOptions) ? (
	        <div className="rootContainer">
	            <ExpressionBarchart chartData={chartData} chartOptions={chartOptions} />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
    
}

// need to export here for some reason
export default RootContainer;
