export function getTimeByTimezone(timezone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function getDateByTimezone(timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function getShortTime(timezone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}