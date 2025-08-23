import {format, parseISO} from "date-fns";

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

function htmlToPlaintext(html: string): string {
    if (!html) return "";
    return html
        // remove scripts/styles
        .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
        .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, "")
        // strip tags
        .replace(/<\/?[^>]+(>|$)/g, " ")
        // decode entities like &nbsp;
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        // collapse whitespace
        .replace(/\s+/g, " ")
        .trim();
}

function getTime(date: Date){
    if (date) {
        return date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
    }
    return "no time"

}
export { formatDate, enumToText, enumToCssId, htmlToPlaintext, getTime };