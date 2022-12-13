// [
//     {
//         "objectId": 93859618,
//         "sample": {
//             "genotype": "Negro jamapa",
//             "objectId": 42000013,
//             "replicateGroup": null,
//             "class": "ExpressionSample",
//             "tissue": "Flower",
//             "description": "Young flowers, collected prior to floral emergence",
//             "name": "Flower",
//             "treatment": "Nitrate fertilizer"
//         },
//         "value": 34.37,
//         "class": "ExpressionValue"
//     },
// ]

// {
//     "y": {
//         "vars": [
//             "cicar.ICC4958.gnm2.ann1.Ca_22202"
//         ],
//         "smps": [
//             "Flower 1",
//             "Flower 2",
//             "Flower 3",
//             "Flower 4",
//             "Flower bud 1",
//             "Flower bud 2",
//             "Flower bud 3",
//             "Flower bud 4",
//             "Germinating seedling",
//             "Shoot apical meristem",
//             "Young leaves"
//         ],
//         "data": [
//             [
//                 1827.21,
//                 1651.27,
//                 2240.68,
//                 2728.8,
//                 1707.87,
//                 1963.18,
//                 1973.38,
//                 1402.35,
//                 1748.3,
//                 1551.37,
//                 4456.7
//             ]
//         ]
//     },
//     "x": {
//         "repgroup": [
//             "Flower",
//             "Flower",
//             "Flower",
//             "Flower",
//             "Flower bud",
//             "Flower bud",
//             "Flower bud",
//             "Flower bud",
//             "Germinating seedling",
//             "Shoot apical meristem",
//             "Young leaves"
//         ]
//     }
// }

/**
 * Return a chartXpress data object from queryExpressionData results.
 */
export default function getData(response) {
    const vars = ["gene"]; // not used
    const values = [];
    const smps = [];
    const repgroup = [];
    response.forEach(result => {
        const sample = result.sample;
        const value = result.value;
        smps.push(sample.name);
        values.push(value);
        if (sample.replicateGroup) repgroup.push(sample.replicateGroup);
    });
    const data = [ values ];

    const y = {
        "data": data,
        "smps": smps,
        "vars": vars
    }

    const x = {
        "repgroup": repgroup
    }

    return {
        "y": y,
        "x": x
    };
}
