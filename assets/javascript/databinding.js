/**
 * Calls updateCallBack with the new value for the "input" event of textInput and rangeInput.
 * Updates to textInput update rangeInput and vice versa.
 * @param {*} textInput the text input for the value
 * @param {*} rangeInput the range input for the value
 * @param {*} updateCallBack the callback function to call on updates with the new value 
 */
export function oneWayBindFloat(textInput, rangeInput, updateCallBack) {
    textInput.addEventListener("input", function () {
        rangeInput.value = textInput.value;
        updateCallBack(parseFloat(textInput.value));
    });
    rangeInput.addEventListener("input", function () {
        updateCallBack(parseFloat(rangeInput.value));
        textInput.value = rangeInput.value;
    });
};

/**
 * Calls updateCallBack with the new value for the "input" event of colorInput.
 * @param {*} colorInput the color input for the value
 * @param {*} updateCallBack the callback function to call on updates with the new value 
 */
export function oneWayBindColor(colorInput, updateCallBack) {
    colorInput.addEventListener("input", function () {
        updateCallBack(colorInput.value);
    });
};