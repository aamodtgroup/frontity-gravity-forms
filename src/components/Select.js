import React, { useContext } from "react";
import FormIdContext from "../context/FormIdContext";
import { connect } from "frontity";

/**
 * Select Dropdown.
 *
 * @param {Object} state Frontity state.
 * @param {Object} actions Actions.
 * @param {Object} inputProps Input props.
 *
 * @return {*}
 */
const Select = ({ state, actions, inputProps }) => {
    // Context is used so that we can pass the form id to different components.
    const id = useContext(FormIdContext);
    const inputName = inputProps.name;

    if ("undefined" === typeof state.gf.forms[id].inputVals[inputName]) {
        actions.gf.changeInputValue({
            id,
            inputName,
            value: inputProps.value,
        });
    }

    /**
     * OnChange handler for input.
     *
     * @param {Object} event Event.
     *
     * @return {void}
     */
    const onChange = (event) => {
        actions.gf.changeInputValue({
            id,
            inputName,
            value: event.target.value,
        });
    };

    return (
        <select
            name={inputProps.name}
            className={inputProps.className}
            id={inputProps.id}
            aria-invalid={inputProps.ariaInvalid}
            aria-required={inputProps.ariaRequired}
            onChange={onChange}
            value={state.gf.forms[id].inputVals[inputName]}
        >
            {inputProps.options.map((item, index) => (
                <option key={index} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    );
};

export default connect(Select);
