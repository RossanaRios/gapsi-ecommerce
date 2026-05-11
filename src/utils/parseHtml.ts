/**
 * Strips HTML tags from a string and returns plain text.
 * Uses DOMParser for safe, browser-native parsing.
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent?.trim() ?? '';
}

/** Returns true if the string contains any HTML tags */
export function containsHtml(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}
