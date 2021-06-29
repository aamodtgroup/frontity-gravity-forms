import React from 'react';
import { connect, styled } from "frontity";
import FormIdContext from "./../context/FormIdContext";

/**
 * Message component
 *
 * Used to display success and error messages.
 *
 * @param {Object} state Frontity state.
 *
 * @return {*|string}
 *
 */
const Message = ( { state, libraries } ) => {

	const id           = React.useContext( FormIdContext );
	const responseInfo = state.gf.forms[ id ];

	// Get the html2react component for the message.
	const Html2React = libraries.html2react.Component;

	/**
	 * Get the error or success message
	 *
	 * @return {string|*}
	 */
	const getMessage = () => {

		if ( 'sent' === responseInfo.status && typeof responseInfo.message === 'string' ) {
			return <SuccessMessage><Html2React html={responseInfo.message} /></SuccessMessage>
		} else if ( 'failed' === responseInfo.status ) {
			return <ErrorMessage>{responseInfo.message}</ErrorMessage>
		} else {
			return '';
		}

	};

	return getMessage();

};

const SuccessMessage = styled.div`
    border: 2px solid #398f14;
    padding: 0.75rem 1.25rem;
`;

const ErrorMessage = styled.div`
    border: 2px solid #ff2c18;
    padding: 0.75rem 1.25rem;
`;

export default connect( Message );
