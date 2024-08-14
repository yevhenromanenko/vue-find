
export function addTagToInput(tag) {
    const startPosition = this.inputElement.selectionStart;
    const endPosition = this.inputElement.selectionEnd;

    const newText = this.inputElement.value.substring(0, startPosition) + `%${tag}%` + this.inputElement.value.substring(endPosition);

    this.inputElement.value = newText;
    const newCursorPosition = startPosition + `%${tag}%`.length;
    this.inputElement.setSelectionRange(newCursorPosition, newCursorPosition);

    const event = new Event('input', { bubbles: true });
    this.inputElement.dispatchEvent(event);

    this.input.val = this.inputElement.value;
}
