import sanitizeHtml from 'sanitize-html';
export function trimString(string: string, trimTill: number): string {
  return string.length > trimTill
    ? string.slice(0, -(string.length - trimTill)) + "..."
    : string;
}

export function sanitizeAndReturnString(inputString: string | null): string {
    // Check if inputString is null or undefined, and return an empty string if so
    if (inputString === null || inputString === undefined) {
      return '';
    }
  
    // Sanitize the inputString using sanitize-html
    const sanitizedString = sanitizeHtml(inputString);
  
    return sanitizedString;
  }