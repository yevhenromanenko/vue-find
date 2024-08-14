function UseFindAccessToken() {
    const getAccessToken = () => {
        const getToken = localStorage.getItem('AccessToken') || '';
        if (!getToken) {
            return null;
        }
        return getToken;
    };

    let AccessToken = getAccessToken();

    const updateAccessToken = (newToken) => {
        localStorage.setItem('AccessToken', newToken);
        return (AccessToken = newToken);
    };

    return { AccessToken, updateAccessToken };
}

export default UseFindAccessToken;
