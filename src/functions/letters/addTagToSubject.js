import {addTag} from "@/functions/tags/addTag.js";

export function addTagToSubject(tag) {
    const inputElement = this.$refs.subjectInput;
    addTag(tag, inputElement);
    this.subject.val = inputElement.value;
}
