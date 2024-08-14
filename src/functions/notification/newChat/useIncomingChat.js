
function useIncomingChat() {
    const getIncomingChat = () => {
        const dataIncomingChat = JSON.parse(sessionStorage.getItem('myIncomingChat') || 'null');
        if (!dataIncomingChat) {
            const createStorage = {
                newChat: null,
                chatWithoutAutoAnswer: null,
                whoGetAnswer: [],
                infoMan: { autoName: '', autoId: '', message: null }
            };
            sessionStorage.setItem('myIncomingChat', JSON.stringify(createStorage));
            return createStorage;
        }
        return dataIncomingChat;
    }

    let dataIncomingChat = getIncomingChat();

    const saveIncomingChat = (newData) => {
        sessionStorage.setItem('myIncomingChat', JSON.stringify(newData));
        return dataIncomingChat = newData;
    }

    return { dataIncomingChat, saveIncomingChat };
}

export default useIncomingChat;
