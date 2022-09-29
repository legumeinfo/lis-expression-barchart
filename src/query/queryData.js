/**
 * Query the expression for a gene given by featureId
 */
export default function queryData(featureId, serviceUrl, imjsClient = imjs) {
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

// imjs path query to grab the expression for a given gene
const pathQuery = ({ featureId }) => ({
    from: 'ExpressionValue',
    select: [
        'value',
        'sample.num',
	'sample.name',
        'sample.description',
        'sample.genotype',
        'sample.tissue',
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

// Rearrange the data from a pathQuery result into the form expected by this tool
function rearrange(data) {
    var results = [];
    for (var i=0; i<data.length; i++) {
        results.push(
            {
                "value": data[i].value,
                "sample": {
                    "num": data[i].sample.num,
                    "name": data[i].sample.name,
                    "description": data[i].sample.description,
                    "genotype": data[i].sample.genotype,
                    "tissue": data[i].sample.tissue,
                    "treatment": data[i].sample.treatment,
                    "replicateGroup": data[i].sample.replicateGroup,
                    "class": data[i].sample.class,
                    "objectId": data[i].sample.objectId
                },
                "source": data[i].sample.source.primaryIdentifier,
                "class": data[i].class,
                "objectId": data[i].objectId
            }
        );
    }
    return(results);
}
