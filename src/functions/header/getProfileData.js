import UseUserToken from "@/functions/token/useUserToken.js";
import getUserToken from "@/functions/token/getLadyIdFromCookies.js";
import SITE_DOMEIN from "@/functions/SITE_DOMEIN.js";
import fetchProfileData from "@/functions/profile-data/fetchProfileData.js";

export async function getProfileData() {
    const token = UseUserToken();
    const userId = getUserToken();

    const ladyId = token.userToken ? token.userToken.siteId : userId;
    const profileUrl = `${SITE_DOMEIN}/search/profile/all/${ladyId}`;

    try {
        const { imageUrl, name } = await fetchProfileData(profileUrl);
        if (imageUrl && name) {
            this.ladyPhoto = imageUrl;
            this.ladyName = name;
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}
