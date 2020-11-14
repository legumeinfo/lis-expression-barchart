const featureToExpressionQuery = ({ featureId }) => ({
    from: 'ExpressionValue',
    select: [
        'feature.id',
	'feature.secondaryIdentifier',
	'feature.symbol',
        'value',
	'sample.dataSets.name',
	'sample.name',
        'sample.num'
    ],
    orderBy: [
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

// eslint-disable-next-line
function queryData(featureId, serviceUrl, imjsClient = imjs) {
    return new Promise((resolve, reject) => {
	// eslint-disable-next-line
	const service = new imjsClient.Service({ root: serviceUrl });
	service
	    .records(featureToExpressionQuery({ featureId }))
	    .then(data => {
		if (data && data.length) resolve(data[0]);
		else reject('No data found!');
	    })
	    .catch(reject);
    });
}

export default queryData;
