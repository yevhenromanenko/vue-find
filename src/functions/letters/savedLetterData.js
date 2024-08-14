import getLetterFromServer from "@/functions/letters/getLetterFromServer.js";

export async function savedLetterData(ladyId, letter) {
    return await getLetterFromServer(ladyId, letter);
}
