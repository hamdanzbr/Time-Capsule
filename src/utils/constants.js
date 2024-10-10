export const BASE_URL='http://localhost:4000'

export const formatDate=(dateString)=> {
    const date = new Date(dateString);

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(2); // Get last two digits of the year

    // Extract time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format the date and time
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Example usage
console.log(formatDate('2024-10-11T00:42')); // Output: 11/10/24 00:42
console.log(formatDate('2024-10-10T19:11:12.565Z')); // Output: 10/10/24 19:11
