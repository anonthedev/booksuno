export function trimString(string: string, trimTill: number): string {
  return string.length > trimTill
    ? string.slice(0, -(string.length - trimTill)) + "..."
    : string;
}