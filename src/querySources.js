/**
 * Query all expression sources.
 */
export default function querySources(serviceUrl, imjsClient = imjs) {
    return new Promise((resolve, reject) => {
	// eslint-disable-next-line
	const service = new imjsClient.Service({ root: serviceUrl });
	service
	    .records(pathQuery())
	    .then(data => {
		if (data && data.length) {
                    resolve(data);
		} else {
                    reject('No expression source data found!');
                }
	    })
	    .catch(reject);
    });
}

// ExpressionSource.primaryIdentifier
// ExpressionSource.synopsis
// ExpressionSource.description
// ExpressionSource.bioProject
// ExpressionSource.sra
// ExpressionSource.unit
const pathQuery = () => ({
    from: 'ExpressionSource',
    select: [
	'primaryIdentifier',
        'synopsis',
        'description',
        'bioProject',
        'sra',
        'unit'
    ],
    orderBy: [
        { path: 'primaryIdentifier', direction: 'ASC' }
    ]
});
