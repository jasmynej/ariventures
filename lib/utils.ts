import { parseISO, format } from "date-fns";

function formatDate(isoString: string): string {
    const date = parseISO(isoString); // safely parse ISO date-time string
    return format(date, "MMMM do, yyyy");
}

function enumToText(value: string): string {
    if(value === null)  {
        return ''
    }
    return value.replace(/_/g, ' ');
}
function enumToCssId(value: string): string {
    if(value === null)  {
        return ''
    }
    const lastWord = value.split('_').pop()?.toLowerCase();
    return lastWord ? `${lastWord}` : '';
}

export { formatDate, enumToText, enumToCssId };