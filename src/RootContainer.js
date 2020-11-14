import React from 'react';
import Loader from './common/loader';
import {
    chart as ExpressionBarchart,
    controls as ExpressionBarchartControls,
    queryData as queryExpressionData,
    getChartData as getExpressionBarchartData
} from './expressionBarchart';

class RootContainer extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    expressionData: null,
	    expressionBarchartData: null,
	    expressionOptions: {
		scale: 'linear'  // log or linear
	    },
	    error: null
	};
	this.changeOptions = this.changeOptions.bind(this);
    }

    componentDidMount() {
	// when testing via jest, don't do all the calcs
	if (this.props.testing) return;

	if (!this.props.entity || !this.props.serviceUrl)
	    throw new Error('No `entity` or `serviceUrl` passed as prop');

	const {
	    entity: { value: featureId },
	    serviceUrl
	} = this.props;

	// fetch data for expression barchart
	queryExpressionData(featureId, serviceUrl)
	    .then(res => {
		const results = res.expressionValues;
		const chartData = getExpressionBarchartData(
		    results,
		    this.state.expressionOptions
		);
		this.setState({
		    expressionData: results,
		    expressionBarchartData: chartData
		});
	    })
	    .catch(() =>
		this.setState({ error: 'No Expression Data Found!' })
	    );
    }

    changeOptions(ev) {
	const { name, value } = ev.target;
	const chartData = getExpressionBarchartData(
	    this.state.expressionData,
	    Object.assign({}, this.state.expressionOptions, { [name]: value })
	);
	this.setState({
	    expressionOptions: Object.assign({}, this.state.expressionOptions, {
		[name]: value
	    }),
	    expressionBarchartData: chartData
	});
    }

    render() {
	if (this.state.error) {
	    return <div className="rootContainer error">{this.state.error}</div>;
	}

	return (
	    <div className="rootContainer">
		{this.state.expressionBarchartData ? (
		    <>
			<ExpressionBarchart
			    chartData={this.state.expressionBarchartData}
			    dataOptions={this.state.expressionOptions}
			/>
			<ExpressionBarchartControls
			    controlOptions={this.state.expressionOptions}
			    changeOptions={this.changeOptions}
			/>
		    </>
		) : (
		    <Loader />
		)}
	    </div>
	);
    }
}

export default RootContainer;
