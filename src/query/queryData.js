// ExpressionValue.value
// ExpressionValue.feature.id
// ExpressionValue.feature.name
// ExpressionValue.sample.identifier
// ExpressionValue.sample.num
// ExpressionValue.sample.source.primaryIdentifier"
// sortOrder = ExpressionValue.sample.source.primaryIdentifier asc ExpressionValue.sample.num asc
// constraint path=ExpressionValue.feature.id = 5609734
const pathQuery = ({ featureId }) => ({
    from: 'ExpressionValue',
    select: [
        'value',
        'feature.id',
	'feature.name',
        'sample.num',
	'sample.name',
        'sample.description',
        'sample.treatment',
        'sample.replicateGroup',
	'sample.source.primaryIdentifier'
    ],
    orderBy: [
        {
            path: 'sample.source.primaryIdentifier',
            direction: 'ASC'
        },
	{
	    path: 'sample.num',
	    direction: 'ASC'
	}
    ],
    where: [
	{
	    path: 'feature.id',
	    op: '=',
	    value: featureId
	}
    ]
});

// {
//     "objectId": 98618455,
//     "sample": {
//         "objectId": 7000013,
//         "class": "ExpressionSample",
//         "source": {
//             "objectId": 7000002,
//             "class": "ExpressionSource",
//             "primaryIdentifier": "CDCFrontier.gnm3.ann1.expr.CDC_Consul.Perilla-Henao_2018"
//         },
//         "num": 1,
//         "name": "LR-112A",
//         "description": "Description of this sample.",
//         "treatment": "Concentrated salt",
//         "replicateGroup": "salt_exposure"
//     },
//     "value": 0,
//     "class": "ExpressionValue",
//     "feature": {
//         "objectId": 5609734,
//         "class": "Gene",
//         "name": "Ca3g022200"
//     }
// }
// rearrange the data from an ExpressionValue query into the form expected by this tool
// {
//     "objectId": 93106720,
//     "class": "ExpressionValue",
//     "sample": {
//         "num": 1,
//         "objectId": 7000013,
//         "class": "ExpressionSample",
//         "name": "LR-112A",
//         "description": "Description of this sample.",
//         "treatment": "Concentrated salt",
//         "replicateGroup": "salt_exposure"
//     },
//     "source": "CDCFrontier.gnm3.ann1.expr.CDC_Consul.Perilla-Henao_2018",
//     "value": 0,
//     "feature": "Ca3g022200"
// }
function rearrange(data) {
    var results = [];
    for (var i=0; i<data.length; i++) {
        results.push(
            {
                "feature": data[i].feature.name,
                "value": data[i].value,
                "source": data[i].sample.source.primaryIdentifier,
                "sample": {
                    "name": data[i].sample.name,
                    "class": data[i].sample.class,
                    "objectId": data[i].sample.objectId,
                    "num": data[i].sample.num,
                    "description": data[i].sample.description,
                    "treatment": data[i].sample.treatment,
                    "replicateGroup": data[i].sample.replicateGroup
                },
                "class": data[i].class,
                "objectId": data[i].objectId
            }
        );
    }
    return(results);
}

function queryData(featureId, serviceUrl, imjsClient = imjs) {
    return new Promise((resolve, reject) => {
	// eslint-disable-next-line
	const service = new imjsClient.Service({ root: serviceUrl });
	service
	    .records(pathQuery({ featureId }))
	    .then(data => {
                // rearrange into expected format
                data = rearrange(data);
		if (data && data.length) {
                    resolve(data);
		} else {
                    reject('No data found!');
                }
	    })
	    .catch(reject);
    });
}

export default queryData;
