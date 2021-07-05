import processors from "./processors";

const GravityForms = {
    state: {
        gf: {
            forms: {},
        },
    },

    libraries: {
        html2react: {
            processors,
        },
    },

    actions: {
        gf: {
            /**
             * Initialize the form input object in the state.
             *
             * @param {Object} state State.
             * @return {Function}
             */
            initForm:
                ({ state }) =>
                (id) => {
                    if (!state.gf.forms[id]) {
                        state.gf.forms[id] = { inputVals: {} };
                        state.gf.forms[id].inputVals["form_id"] = id.substr(6);
                    }
                },

            /**
             * Initialize the input values in the state.
             *
             * @param {Object} state State.
             * @return {Function}
             */
            initInput:
                ({ state }) =>
                ({ id, inputName }) => {
                    state.gf.forms[id].inputVals =
                        "" !== inputName ? { [inputName]: "" } : {};
                },

            /**
             * Handle on change event when user enters values in the form.
             *
             * Set the input value entered by the user in the state.
             *
             * @param {Object} state State.
             * @return {Function}
             */
            changeInputValue:
                ({ state }) =>
                ({ id, inputName, value }) => {
                    state.gf.forms[id].inputVals[inputName] = value;
                },

            /**
             * Add hidden input values.
             *
             * @param {Object} state State.
             * @return {Function}
             */
            addHiddenInputs:
                ({ state }) =>
                ({ id, inputName, value }) => {
                    state.gf.forms[id].inputVals[inputName] = value;
                },

            /**
             * Handle form submit.
             *
             * @param {Object} state State.
             * @return {Function}
             */
            sendForm:
                ({ state }) =>
                async (id) => {
                    const myData = state.gf.forms[id].inputVals;

                    // Create new form data to send the post request with form data.
                    const formData = new FormData();
                    for (var key of formData.keys()) {
                        myData[key] = formData.get(key);
                    }

                    // CF7 REST API URL.
                    const url = `${state.source.api}gf/v2/forms/${id.substr(
                        6
                    )}/submissions`;
                    const auth =
                        "Basic " +
                        Buffer.from(
                            state.source.gfAuth.key +
                                ":" +
                                state.source.gfAuth.secret
                        ).toString("base64");

                    // Post Request.
                    const res = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: auth,
                        },
                        body: JSON.stringify(myData),
                    });
                    const body = await res.json();
                    let invalidFieldsObj = {};

                    // Set loading to false for the message to show
                    state.gf.forms[id].loading = false;

                    // Clear previous errors if any
                    if (state.gf.forms[id].invalidFields) {
                        state.gf.forms[id].invalidFields = {};
                    }

                    /**
                     * Populate state with the errors, or thank-you message...
                     */
                    if (true === body.is_valid) {
                        state.gf.forms[id].status = "sent";
                        state.gf.forms[id].message = body.confirmation_message;

                        // Once the email is sent, clear the form fields.
                        state.gf.forms[id].inputVals = {};
                        // Clear message after 5s
                        setTimeout(() => {
                            state.gf.forms[id].message = {};
                        }, 5000);
                    } else if (false === body.is_valid) {
                        if (body.validation_messages) {
                            for (const key in body.validation_messages) {
                                let errorKey = key.replace(key, "input_" + key);
                                invalidFieldsObj[errorKey] =
                                    body.validation_messages[key];
                            }

                            state.gf.forms[id].invalidFields = invalidFieldsObj;
                        }

                        state.gf.forms[id].status = "failed";

                        /**
                         * Populate errors from the response so React components
                         * can see them and re-render appropriately
                         */
                        state.gf.forms[id].message =
                            "One or more fields have an error. Please check and try again.";
                    }
                },
        },
    },
};

export default GravityForms;
