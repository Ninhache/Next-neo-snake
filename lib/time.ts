export function parseDateTime(
  dateTimeString: string,
  intl: "fr-FR" | "en-US" | "en-EN" = "fr-FR",
): string {
  return new Date(dateTimeString).toLocaleString(intl, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}
