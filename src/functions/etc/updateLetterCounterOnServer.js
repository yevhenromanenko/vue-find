


const updateLetterCounterOnServer = async (ladyId, counter) => {
    try {
        const response = await fetch(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/letter-counter/${ladyId}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ letterCounter: counter })
        });

        if (!response.ok) {
            throw new Error('Failed to update invite counter on the server');
        }

    } catch (error) {
        console.error('Error updating invite counter:', error);
    }
};

export default updateLetterCounterOnServer;
