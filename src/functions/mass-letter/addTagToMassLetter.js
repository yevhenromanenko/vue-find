import {addTag} from "@/functions/tags/addTag.js";

export function addTagToMassLetter(tag) {
    const inputElement = this.$refs.letterInputMassLetter;
    addTag(tag, inputElement);
    this.letterMassLetter.val = inputElement.value;
}
