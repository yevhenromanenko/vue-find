import resetDailyInviteCounter from "@/functions/etc/resetDailyInviteCounter.js";


export function setResetCountersIntervals() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const msUntilMidnight = midnight - now;
    setTimeout(async () => {
        await resetDailyInviteCounter(this);
        setInterval(resetDailyInviteCounter, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
}
