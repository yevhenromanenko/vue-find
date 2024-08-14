import resetDailyLetterCounter from "@/functions/etc/resetDailyLetterCounter.js";


export function setResetCountersIntervalsLetter() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const msUntilMidnight = midnight - now;
    setTimeout(async () => {
        await resetDailyLetterCounter(this);
        setInterval(resetDailyLetterCounter, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
}
