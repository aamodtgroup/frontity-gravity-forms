import React from 'react';
import FormIdContext from "../context/FormIdContext";
import { connect } from "frontity";

/**
 * Textarea Component.
 *
 * @param {Object} state Frontity state.
 * @param {Object} actions Actions.
 * @param {Object} inputProps Input props.
 *
 * @return {*}
 */
const Textarea = ( { state, actions, inputProps } ) => {

	const id          = React.useContext( FormIdContext );
	const inputName   = inputProps.name;
	const placeholder = inputProps.placeholder;

	if ( 'undefined' === typeof ( state.gf.forms[ id ].inputVals[ inputName ] ) ) {
		actions.gf.changeInputValue( { id, inputName, value: inputProps.value } );
	}

	/**
	 * Textarea onChange event handler.
	 *
	 * @param {Object} event Event.
	 */
	const onChange = ( event ) => {

		actions.gf.changeInputValue( { id, inputName, value: event.target.value } );

	};

	return (
		<textarea
			name={ inputProps.name }
			className={ inputProps.className }
			id={ inputProps.id }
			aria-invalid={ inputProps.ariaInvalid }
			aria-required={ inputProps.ariaRequired }
			cols={ inputProps.cols }
			rows={ inputProps.rows }
			value={ state.gf.forms[ id ].inputVals[ inputName ] }
			onChange={ onChange }
			placeholder={ placeholder }
		/>
	);
};

export default connect( Textarea );
