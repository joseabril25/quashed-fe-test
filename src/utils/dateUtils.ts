/**
 * Format a timestamp to a localized date string
 * @param timestamp - Unix timestamp in milliseconds
 * @param locale - Optional locale string (defaults to user's locale)
 * @param options - Optional Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  timestamp: number | undefined | null,
  locale?: string,
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!timestamp) return 'N/A';
  
  return new Date(timestamp).toLocaleDateString(locale, options);
};

/**
 * Format a timestamp to a custom date format
 * @param timestamp - Unix timestamp in milliseconds
 * @param format - Format string (e.g., 'dd/MM/yyyy', 'MM-dd-yyyy')
 * @returns Formatted date string
 */
export const formatDateCustom = (
  timestamp: number | undefined | null,
  format: 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy-MM-dd' = 'dd/MM/yyyy'
): string => {
  if (!timestamp) return 'N/A';
  
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  switch (format) {
    case 'dd/MM/yyyy':
      return `${day}/${month}/${year}`;
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`;
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

/**
 * Convert a Date object to a timestamp
 * @param date - Date object or null
 * @returns Unix timestamp in milliseconds or null
 */
export const dateToTimestamp = (date: Date | null): number | null => {
  return date ? date.getTime() : null;
};

/**
 * Check if a timestamp is valid
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Boolean indicating if the timestamp is valid
  */
export const isValidTimestamp = (timestamp: number): timestamp is number => {
  return !isNaN(timestamp) && timestamp > 0;
};

/**
 * Get the time ago from a timestamp
 * @param timestamp - Unix timestamp in milliseconds
 * @returns A human-readable string indicating how long ago the timestamp was
 */
export const getTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hr${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} min ago`;
  } else {
    return 'Just now';
  }
};
