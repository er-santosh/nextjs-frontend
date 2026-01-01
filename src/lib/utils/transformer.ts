export function getNameInitials(name: string): string {
  if (!name) {
    return "";
  }
  return name
    .trim()
    .split(/\s+/)
    .filter(part => part.length > 0)
    .map(part => part.charAt(0))
    .join("")
    .toUpperCase();
}

export function capitalizeWords(str: string): string {
  return str
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}
