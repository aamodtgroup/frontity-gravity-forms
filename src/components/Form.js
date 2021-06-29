import { connect, styled } from "frontity";
import FormIdContext from "./../context/FormIdContext";
import Message from "./Message";

/**
 *
 * @param {Object} state Frontity State.
 * @param {Object} actions Actions methods.
 * @param {int} id Form Id.
 * @param {Object} children children.
 * @param {String} className Classname.
 * @param {Object} method Function.
 *
 * @return {*}
 */
const Form = ( { state, actions, id, children, className, method } ) => {

	actions.gf.initForm( id );

	/**
	 * Form onSubmit event handler.
	 *
	 * @param {Object} event Event.
	 */
	const handleOnSubmit = ( event ) => {

		event.preventDefault();

		// Set the loading to true first to show processing while the request is ongoing.
		state.gf.forms[ id ].loading = true;

		// Call the action sendform that will get the form data from state using the form id.
		actions.gf.sendForm( id );

	};

	return (
		<FormIdContext.Provider value={ id }>
			<FormElement method={ method } onSubmit={ handleOnSubmit } className={ className } id={ id }>
				{ children }
			</FormElement>
			{ state.gf.forms[ id ].loading ? <Processing>Processing...</Processing> : <Message /> }
		</FormIdContext.Provider>
	)
};

const FormElement = styled.form``;
const Processing = styled.div``;

export default connect( Form );
