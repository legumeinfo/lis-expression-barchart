import React from 'react';
import Loader from './common/loader';
import { useState, useEffect } from 'react';

import queryData from "./query/queryData.js";
import getChartData from "./chart/getChartData.js";

import { ExpressionBarchart } from "./components/ExpressionBarchart.js";
         
function RootContainer({ serviceUrl, entity, config }) {
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState(null);
    
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
            {chartData ? (
	        <div className="rootContainer">
	            <ExpressionBarchart data={chartData} />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
    
}

// need to export here for some reason
export default RootContainer;
