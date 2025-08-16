function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
function enumToText(value: string): string {
    return value.replace(/_/g, ' ');
}
function enumToCssId(value: string): string {
    const lastWord = value.split('_').pop()?.toLowerCase();
    return lastWord ? `${lastWord}` : '';
}

export { formatDate, enumToText, enumToCssId };