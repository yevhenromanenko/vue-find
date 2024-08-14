
import updateCounterOnServer from "@/functions/etc/updateInviteCounterOnServer.js";

const resetDailyLetterCounter = async (context) => {
    context.dailyLetterCounter = 0;
    await updateCounterOnServer(context.ladyId, context.dailyLetterCounter, 'letter-counter', 'dailyLetter');
}
export default resetDailyLetterCounter;
