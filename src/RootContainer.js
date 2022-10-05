import React from 'react';
import Loader from './common/loader';
import { useState, useEffect } from 'react';

import queryData from "./query/queryData.js";

import getChartData from "./chart/getChartData.js";
import getSources from "./chart/getSources.js";

import { ExpressionBarchart } from "./components/ExpressionBarchart.js";

export default function RootContainer({ serviceUrl, entity, config }) {
    const featureId = entity.value;
    const [error, setError] = useState(null);
    // overall data
    const [response, setResponse] = useState(null);
    const [sources, setSources] = useState(null);
    // per source data
    const [source, setSource] = useState(null);
    const [chartData, setChartData] = useState(null);
    
    // TIP: useEffect with empty array dependency only runs once!
    useEffect(() => {
        queryData(featureId, serviceUrl)
            .then(response => {
                setResponse(response);
                setSources(getSources(response));
            })
            .catch(() => {
                setError("No expression data found.");
            });
    }, []);

    if (error) return (
            <div className="rootContainer error">{ error }</div>
    );

    // on selector change set the source and get its data
    function handleChange(event) {
        var i = event.target.value;
        if (i < 0) {
            setSource(null);
            setChartData(null);
        } else {
            setSource(sources[i]);
            setChartData(getChartData(response, sources[i]));
        }
    }

    return (
        <div className="rootContainer">
            {sources && (
	        <div className="selector">
                    <select name="sourceIndex" onChange={handleChange}>
                        <option key={-1} value={-1}>--- SELECT EXPRESSION EXPERIMENT ---</option>
                        {sources.map((source,i) => (
                            <option key={i} value={i}>{source.name}</option>
                        ))}
                    </select>  <span className="scroll-note">[stretch tool vertically to widen sample rows; scroll up if this selector becomes hidden]</span>
                </div>
            )}
            {source && (
                <div className="synopsis">{source.synopsis}</div>
            )}
            {chartData && (
	        <ExpressionBarchart data={chartData} />
            )}
            {(!sources && !chartData) && (
                <Loader />
            )}
        </div>
    );
}


