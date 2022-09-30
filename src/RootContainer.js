import React from 'react';
import Loader from './common/loader';
import { useState, useEffect } from 'react';

import queryData from "./query/queryData.js";

import getChartData from "./chart/getChartData.js";

import { ExpressionBarchart } from "./components/ExpressionBarchart.js";

export default function RootContainer({ serviceUrl, entity, config }) {
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [sourceIndex, setSourceIndex] = useState(0);
    
    useEffect(() => {
        queryData(entity.value, serviceUrl)
            .then(response => {
                const data = getChartData(response);
                setChartData(data);
            })
            .catch(() => {
                setError("No expression data found.");
            });
    }, []);

    function handleChange(event) {
        setSourceIndex(event.target.value);
    }

    // const [sources, setSources] = useState(null);
    // const [sourceIndex, setSourceIndex] = useState(0);
    // const labels = [];
    // for (var i=0; i<data.datasets.length; i++) {
    //     labels.push(data.datasets[i].label);
    // }
    // setSources(labels);

    if (error) return (
            <div className="rootContainer error">{ error }</div>
    );

    return (
        <div className="rootContainer">
            {chartData ? (
                <div>
		    <div style={{ 'padding':'10px' }}>
                        <select name="source" value={sourceIndex} onChange={handleChange}>
                            {chartData.datasets.map((dataset,i) => (
                                <option key={i} value={i}>{dataset.source}</option>
                            ))}
                        </select>
                    </div>
	            <ExpressionBarchart data={chartData} sourceIndex={sourceIndex} />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
    
}
