export function validateFormLetter(letter) {

    if (letter === '' || letter.length < 200) {
        return false;
    }

    return true;
}
