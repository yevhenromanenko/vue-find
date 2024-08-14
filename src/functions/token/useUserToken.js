function UseUserToken() {
    const getUserToken = () => {
        const allCookies = document.cookie.split(';');
        for (const index of allCookies) {
            let cookies = index.trim().split('=');
            if (cookies.includes('userData')) {
                const userToken = JSON.parse(decodeURIComponent(cookies[1]));
                return userToken;
            }
        }
        return null;
    };

    let userToken = getUserToken();

    const saveUserToken = (newUserToken) => {
        let updateUserToken = `userData=${encodeURIComponent(JSON.stringify(newUserToken))}; expires=0; path=/`;
        document.cookie = updateUserToken;

        return userToken = newUserToken;
    };

    return { userToken, saveUserToken };
}

export default UseUserToken;
