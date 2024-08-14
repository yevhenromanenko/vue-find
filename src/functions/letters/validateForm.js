import {validateFormSubject} from "@/functions/letters/validateFormSubject.js";
import {validateFormLetter} from "@/functions/letters/validateFormLetter.js";

export function validateForm() {
    this.formIsValid = true;
    this.subject.isValid = validateFormSubject(this.subject.val);
    this.letter.isValid = validateFormLetter(this.letter.val);

    if (!this.subject.isValid || !this.letter.isValid) {
        this.formIsValid = false;
    }
}
