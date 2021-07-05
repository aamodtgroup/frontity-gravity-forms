import HiddenInput from "../components/HiddenInput";

export const gfHiddenInputs = {
    name: "gfHiddenInputs",
    test: ({ node }) =>
        node.component === "input" && /hidden/.test(node.props.type),

    processor: ({ node }) => {
        const className =
            "undefined" === typeof node.props.className
                ? null
                : node.props.className;
        const id = "undefined" === typeof node.props.id ? null : node.props.id;
        const name =
            "undefined" === typeof node.props.name ? null : node.props.name;
        const type =
            "undefined" === typeof node.props.type ? null : node.props.type;
        const value =
            "undefined" === typeof node.props.value ? null : node.props.value;

        node.props.inputProps = {
            className: className,
            id: id,
            name: name,
            type: type,
            value: value,
        };

        node.component = HiddenInput;
        return node;
    },
};
