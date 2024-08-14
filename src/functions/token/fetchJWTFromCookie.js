import UseFindJWTRefreshToken from "@/functions/token/useFindJwtToken.js";
import UseUserToken from "@/functions/token/useUserToken.js";
import SITE_DOMEIN from "@/functions/SITE_DOMEIN.js";
import UseFindAccessToken from "@/functions/token/useFindAccessToken.js";
import getUserToken from "@/functions/token/getLadyIdFromCookies.js";

async function generateJWTWithCurrentTime() {

    const token = UseUserToken();
    const JWTRefreshToken = UseFindJWTRefreshToken();
    const AccessToken = UseFindAccessToken();
    const ladyId = getUserToken();

    const params = new URLSearchParams({
        user_id: token.userToken ? token.userToken.siteId : ladyId,
        user_gender: 'girl',
        refresh_token: JWTRefreshToken.JWTRefreshToken || ''
    });

    try {
        const res = await fetch(`${SITE_DOMEIN}/api/v2/init/user/get_access_jwt_token?${params}`);
        if (res.ok) {
            const data = await res.json();
            AccessToken.updateAccessToken(data.content.access_token);
        }
        return null;
    } catch (e) {
        console.log(e)
        return null;
    }
}

export default generateJWTWithCurrentTime;
