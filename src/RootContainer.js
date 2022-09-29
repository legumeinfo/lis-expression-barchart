import Loader from './common/loader';
import { useState, useEffect } from 'react';

import queryData from "./query/queryData.js";

import getChartData from "./chart/getChartData.js";

import { ExpressionBarchart } from "./components/ExpressionBarchart.js";

function RootContainer({ serviceUrl, entity, config }) {
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
            {(chartData) ? (
                <div>
                    <select name="source" value={sourceIndex} onChange={handleChange}>
                        {chartData.datasets.map((dataset,i) => (
                            <option key={i} value={i}>{dataset.source}</option>
                        ))}
                    </select>
	            <ExpressionBarchart data={chartData} sourceIndex={sourceIndex} />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
    
}

// need to export here for some reason
export default RootContainer;

// {sources ? (
//     <SourceSelector sources={sources} />
// ) : (
//     <Loader />
// )}

// // query ExpressionSources which have expression for this gene
// // TIP: useEffect with empty array dependency only runs once!
// useEffect(() => {
//     querySources(entity.value, serviceUrl)
//         .then(response => {
//             setSources(response);
//         })
//         .catch(() => {
//             setError("No expression data found for this gene.");
//         });
// }, []);
