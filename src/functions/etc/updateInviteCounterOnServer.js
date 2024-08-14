const updateCounterOnServer = async (ladyId, counter, nameCounter, type) => {
    try {
        const response = await fetch(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/${nameCounter}/${ladyId}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ [`${type}Counter`]: counter })
        });

        if (!response.ok) {
            throw new Error('Failed to update invite counter on the server');
        }
    } catch (error) {
        console.error('Error updating invite counter:', error);
    }
}

export default updateCounterOnServer;
