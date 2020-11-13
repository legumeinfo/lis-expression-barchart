import React from 'react';

const Cell = ({ id, name, text, value, checked, onChange }) => (
    <label htmlFor={id}>
	<input
	    type="radio"
	    id={id}
	    name={name}
	    value={value}
	    onChange={onChange}
	    checked={checked}
	/>
	<span>{text}</span>
    </label>
);

function ExpressionControls({ controlOptions, changeOptions }) {
    return (
	<div className="controls">
	    <Cell
		id="logarithmic-scale"
		name="scale"
		value="log"
		text="Logarithmic Scale"
		onChange={changeOptions}
		checked={controlOptions['scale'] === 'log'}
	    />
	    <Cell
		id="linear-scale"
		name="scale"
		value="linear"
		text="Linear Scale"
		onChange={changeOptions}
		checked={controlOptions['scale'] === 'linear'}
	    />
	</div>
    );
}

export default ExpressionControls;
