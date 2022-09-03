export function getISODateOnly(date = new Date()) {
  return new Date(date).toISOString().split("T")[0];
}
