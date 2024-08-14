import axios from "axios";

const getLetterFromServer = async (ladyId, letter) => {
    try {
        const response = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/${letter}/${ladyId}.json`);
        return response.data.letterData;
    } catch (error) {
        console.error("Ошибка при получении данных о письме:", error);
        return false;
    }
}

export default getLetterFromServer;
