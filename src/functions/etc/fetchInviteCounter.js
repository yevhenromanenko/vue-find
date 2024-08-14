
export async function fetchInviteCounter() {
    try {
        const response = await fetch(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/counter/${this.ladyId}.json`);
        if (!response.ok) {
            throw new Error('Failed to fetch invite counters from the server');
        }
        const data = await response.json();

        if (data) {
            this.dailyInviteCounter = data.dailyInviteCounter ?? 0;
        }
    } catch (error) {
        console.error('Error fetching invite counters:', error);
    }
}
