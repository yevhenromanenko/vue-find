export function addTag(tag, inputElement) {
    const startPosition = inputElement.selectionStart;
    const endPosition = inputElement.selectionEnd;

    const newText = inputElement.value.substring(0, startPosition) + `%${tag}%` + inputElement.value.substring(endPosition);

    inputElement.value = newText;
    const newCursorPosition = startPosition + `%${tag}%`.length;
    inputElement.setSelectionRange(newCursorPosition, newCursorPosition);

    const event = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(event);
}


