import React from 'react';
import { useState, useEffect } from 'react';
import CanvasXpressReact from 'canvasxpress-react';

import Loader from './common/loader';

import querySources from "./query/querySources.js";
import queryExpressionData from "./query/queryExpressionData.js";

import getData from "./chart/getData.js";

export default function RootContainer({ serviceUrl, entity, config }) {
    const featureId = entity.value;
    const [error, setError] = useState(null);
    // overall data
    const [sources, setSources] = useState(null);
    const [graph, setGraph] = useState(null);
    // per source data
    const [source, setSource] = useState(null);
    const [data, setData] = useState(null);
    //    const [chartData, setChartData] = useState(null);

    const conf = {
        "axisAlgorithm": "wilkinson",
        "graphOrientation": "vertical",
        "marginTop": 100,
        "axisMinMaxTickTickWidth": false,
        "axisTickScaleFontFactor": 1,
        "axisTitleScaleFontFactor": 1.0,
        "smpLabelRotate": 45,
        "smpTitleFontStyle": "italic",
        "smpTitleScaleFontFactor": 0.5,
        "smpTitle": "Mouse over bar for full sample description",
        "legendPosition": "right",
        "colorScheme": "CanvasXpress",
        "colorBy": "repgroup",
        "xAxisTitle": "TPM"
    }

    const evts = {
        mousemove: function(o, e, t) {
            const sample = o.y.smps;
            // const genotype = String(genotypesJSON${index}[sample]);
            // const tissue = String(tissuesJSON${index}[sample]);
            // const treatment = String(treatmentsJSON${index}[sample]);
            // const description = String(descriptionsJSON${index}[sample]);
            // let s = sample;
            // if (genotype!="undefined") s += ":" + genotype;
            // if (tissue!="undefined") s += ":" + tissue;
            // if (treatment!="undefined") s += ":" + treatment;
            // if (description!="undefined") s += ":" + description;
            // t.showInfoSpan(e, s);
        }
    }
    
    // TIP: useEffect with empty array dependency only runs once!
    useEffect(() => {
        querySources(serviceUrl)
            .then(response => {
                setSources(response);
            })
            .catch(() => {
                setError("No expression sources found.");
            });
    }, []);

    // set the graph reference
    function onRef(graph) {
        setGraph(graph);
    }

    if (error) return (
            <div className="rootContainer error">{ error }</div>
    );

    // on selector change set the source and get its data
    function handleChange(event) {
        var i = event.target.value;
        if (i < 0) {
            setSource(null);
            // setChartData(null);
        } else {
            setSource(sources[i]);
            queryExpressionData(serviceUrl, sources[i], featureId)
                .then(response => {
                    setData(getData(response));
                })
                .catch(() => {
                    setError("No expression data found in "+sources[i].primaryIdentifier+" for this gene.");
                });
        }
    }

    // show legend if we have rep groups
    if (data) {
        conf["showLegend"] = Object.keys(data.x).length > 0;
    }

    return (
        <div className="rootContainer">
            {sources && (
	        <div className="selector">
                    <select name="sourceIndex" onChange={handleChange}>
                        <option key={-1} value={-1}>--- SELECT EXPRESSION EXPERIMENT ---</option>
                        {sources.map((source,i) => (
                            <option key={i} value={i}>{source.primaryIdentifier}</option>
                        ))}
                    </select>
                </div>
            )}
            {source && (
                <div className="synopsis">{source.synopsis}</div>
            )}
            {data && (
                <div className="canvas">
                    <CanvasXpressReact target={"canvas"} data={data} config={conf} events={evts} height={800} width={1150} onRef={onRef} />
                </div>
            )}
            {!sources && (
                <Loader />
            )}
        </div>
    );
}


            // {chartData && (
	    //     <ExpressionBarchart data={chartData} />
            // )}
