
const checkForForbiddenTags = (text) => {
    const forbiddenTags = ["%Name%", "%Age%", "%Country%", "%City%"];
    return forbiddenTags.some((tag) => text.includes(tag));
};

export default checkForForbiddenTags;
