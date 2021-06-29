import Form from "../components/Form";

export const gfForm = {
	name: "gfForm",
	test: ({ node }) => node.component === "form" && /gform/.test( node.props.id ),

	processor: ({ node }) => {

		node.props.id = node.props.id;
		node.component = Form;

		return node;
	}
};