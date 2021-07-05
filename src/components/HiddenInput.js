import React, { useContext } from "react";
import FormIdContext from "../context/FormIdContext";
import { connect } from "frontity";

/**
 * HiddenInputs component
 *
 * @param {Object} state Frontity state.
 * @param {Object} actions Actions.
 * @param {Object} inputProps Input props.
 *
 * @return {*}
 */
const HiddenInputs = ({ state, actions, inputProps }) => {
    const id = useContext(FormIdContext);
    const inputName = inputProps.name;
    const inputValue = inputProps.value;

    actions.gf.addHiddenInputs({ id, inputName, value: inputValue });

    return null;
};

export default connect(HiddenInputs);
