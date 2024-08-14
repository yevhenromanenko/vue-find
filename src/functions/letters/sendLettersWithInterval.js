import sendLetterToUser from "@/functions/letters/sendLetterToUser.js";

export async function sendLettersWithInterval() {
    this.intervalIdLetters = setInterval(async () => {
        if (!this.isSendingLetters) {
            this.errorLetter++;
            clearInterval(this.intervalIdLetters);
            this.isSendingLetters = false;
            return;
        }

        const randomUserIndex = Math.floor(Math.random() * this.usersOnline.length);
        const randomUser = this.usersOnline[randomUserIndex];

        try {
            const userExists = this.myManSectionIds.some(user => user.manId === randomUser);

            if (userExists) {
                this.countLettersForMyUsers++;
                console.log('попытка отправить постояльцу, не отправлено')
            } else {
                await sendLetterToUser(this, randomUser)
            }

        } catch (error) {
            console.error('Error sending invite:', error);
            this.errorLetter++;
        }
    }, Math.floor(Math.random() * (25000 - 15000 + 1) + 15000));
}
