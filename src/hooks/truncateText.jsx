export function getFileName(url, maxLength = 30) {
    try {
        const pathname = new URL(url).pathname;
        const fileName = decodeURIComponent(pathname.split('/').pop()); // Decode URL and get file name
        if (fileName.length <= maxLength) return fileName;
        const start = fileName.slice(0, 8);
        const end = fileName.slice(-10);
        return `${start}...${end}`;
    } catch (error) {
        return url; // Return the original URL if parsing fails
    }
}