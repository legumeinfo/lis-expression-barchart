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
		if (data && data.length) {
                    alert(JSON.stringify(data));
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
	'sample.source.primaryIdentifier',
        'sample.source.synopsis'
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
