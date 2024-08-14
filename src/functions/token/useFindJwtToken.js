
function UseFindJWTRefreshToken() {
    const getJWTRefreshToken = () => {
        const allCookies = document.cookie.split(';');
        for (const index of allCookies) {
            let cookies = index.trim().split('=');
            if (cookies.includes('Iscashe-JWTRefreshToken')) {
                const getToken = decodeURIComponent(cookies[1]);
                return getToken;
            }
        }
        return null;
    };

    let JWTRefreshToken = getJWTRefreshToken();

    const updateJWTRefreshToken = () => {
        const elBody = document.querySelector('body');
        const newToken = elBody.attributes.getNamedItem('data-jwt-refresh-token').value;
        const newJWTRefreshToken = `Iscashe-JWTRefreshToken=${encodeURIComponent(newToken)}; expires=0; path=/`;
        document.cookie = newJWTRefreshToken;
        return JWTRefreshToken = newToken;
    };

    return { JWTRefreshToken, updateJWTRefreshToken };
}

export default UseFindJWTRefreshToken;
