
export function truncateContent(content) {
    return content.length > 5 ? content.slice(0, 5) + '..' : content;
}
