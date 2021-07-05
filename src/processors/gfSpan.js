import Span from "../components/Span";

export const gfSpan = {
    name: "gfSpan",
    test: ({ node }) =>
        node.component === "div" &&
        /ginput_container/.test(node.props.className),
    processor: ({ node }) => {
        let spanKey = "";

        if (node.children.length > 0) {
            spanKey = node.children[0].props.name;
        }

        node.props.spanKey = spanKey;

        node.component = Span;
        return node;
    },
};
