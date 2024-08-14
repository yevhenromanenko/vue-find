import {addTag} from "@/functions/tags/addTag.js";

export function addTagToLetter(tag) {
    const inputElement = this.$refs.letterInput;
    addTag(tag, inputElement);
    this.letter.val = inputElement.value;
}
