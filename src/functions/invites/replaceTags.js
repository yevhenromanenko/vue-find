
const replaceTags = (text, randomUser) => {

    const { name, country, age, city } = randomUser;

    let fullName = name.toString();
    let firstRightName;

    if (fullName.includes('.')) {
        const dotIndex = fullName.indexOf('.');
        firstRightName = fullName.substring(0, dotIndex); // Взяли часть строки до точки
        firstRightName = firstRightName[0].toUpperCase() + firstRightName.slice(1); // Сделали первую букву заглавной
    } else {
        firstRightName = fullName[0].toUpperCase() + fullName.slice(1);
    }

    const replaceTag = () => {

        let result = text;
        let invalidAge = result.includes('%Age%') && age === null;
        let invalidCountry = result.includes('%Country%') && country === null || country === "";
        let invalidCity = result.includes('%Country%') && city === null || city === "";

        while (result.includes('%Name%')) {
            result = result.replace('%Name%', firstRightName);
        }

        while (result.includes('%Age%')) {
            if (!invalidAge) {
                result = result.replace('%Age%', age);
            } else {
                return;
            }
        }

        while (result.includes('%Country%')) {
            if (!invalidCountry) {
                result = result.replace('%Country%', country);
            } else {
                return;
            }
        }

        while (result.includes('%City%')) {
            if (!invalidCity) {
                result = result.replace('%City%', city);
            } else {
                return;
            }
        }

        return result;
    };

    return replaceTag();
};

export default replaceTags;
