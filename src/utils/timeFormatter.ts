import { format } from "date-fns";

export function formatSecodsToMinutes(seconds: number): string {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

export function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return format(date, "dd/MM/yyyy HH:mm");
}
