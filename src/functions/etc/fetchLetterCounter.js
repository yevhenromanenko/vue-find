export async function fetchLetterCounter() {
    try {
        const response = await fetch(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/letter-counter/${this.ladyId}.json`);
        if (!response.ok) {
            throw new Error('Failed to fetch invite counter from the server');
        }
        const data = await response.json();

        if (data) {
            this.dailyLetterCounter = data.dailyLetterCounter ?? 0;
        }
    } catch (error) {
        console.error('Error fetching invite counter:', error);
    }
}

