
export function isBirthday(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    return today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth();
}
