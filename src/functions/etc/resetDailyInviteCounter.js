import updateCounterOnServer from "@/functions/etc/updateInviteCounterOnServer.js";

const resetDailyInviteCounter = async (context) => {
    context.dailyInviteCounter = 0;
    await updateCounterOnServer(context.ladyId, context.dailyInviteCounter, 'counter', 'dailyInvite');
}
export default resetDailyInviteCounter;
