
const getUserToken = () => {
    const allCookies = document.cookie.split(';');
    for (const index of allCookies) {
        let cookies = index.trim().split('=');

        if (!cookies.includes('userData') && cookies.includes('g_reconnect_id')) {
            const userTokenId = JSON.parse(decodeURIComponent(cookies[1]));
            return userTokenId;
        }
    }
    return null;
};

export default getUserToken;
