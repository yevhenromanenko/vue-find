
export function validateFormSubject(subject) {
    if (subject === '' || subject.length < 5 || subject.length > 80) {
        return false;
    }
    return true;
}
