/**
 * Query the expression for a gene given by featureId and given source
 */
export default function queryExpressionData(serviceUrl, source, featureId, imjsClient = imjs) {
    return new Promise((resolve, reject) => {
	// eslint-disable-next-line
	const service = new imjsClient.Service({ root: serviceUrl });
	service
	    .records(pathQuery({ source, featureId }))
	    .then(data => {
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
const pathQuery = ({ source, featureId }) => ({
    from: 'ExpressionValue',
    select: [
        'value',
	'sample.name',
        'sample.description',
        'sample.genotype',
        'sample.tissue',
        'sample.treatment',
        'sample.replicateGroup'
    ],
    orderBy: [
	{
	    path: 'sample.name',
	    direction: 'ASC'
	}
    ],
    where: [
	{
	    path: 'sample.source.id',
	    op: '=',
	    value: source.objectId
	},
	{
	    path: 'feature.id',
	    op: '=',
	    value: featureId
	}
    ]
});
