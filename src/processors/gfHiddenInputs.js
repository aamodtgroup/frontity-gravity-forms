import HiddenInput from '../components/HiddenInput';

export const gfHiddenInputs = {
	name: "gfHiddenInputs",
	test: ({ node }) => node.component === "input" && /hidden/.test( node.props.type ) && /_wpgf/.test( node.props.name ),
	
	processor: ({ node }) => {

		const name  = ( 'undefined' === typeof ( node.props.name ) ) ? null : node.props.name;
		const value = ( 'undefined' === typeof ( node.props.value ) ) ? null : node.props.value;

		node.props.inputProps = {
			name: name,
			value: value
		};

		node.component = HiddenInput;
		return node;
	}
};