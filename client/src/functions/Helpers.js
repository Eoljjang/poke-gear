// Accepts a "Date" object. Formats it. Converts it into a string: "yyyy-mm-dd 00:00am/pm" and returns it.
export function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const isAM = hours < 12;

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;  // Handle 12 AM/PM correctly
    const period = isAM ? 'AM' : 'PM';

    // Construct formatted date string
    const formattedDate = `${year}-${month}-${day} ${String(hours).padStart(2, '0')}:${minutes} ${period}`;
    return formattedDate;
}

export function previewContent(content, maxLength){
    const truncatedContent = content.slice(0, maxLength) + "..."
    return truncatedContent
}
