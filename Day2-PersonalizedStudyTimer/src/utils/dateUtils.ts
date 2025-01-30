export function convertDateToUTC(date: Date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),
    date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}

export function increaseDateByTime(date: Date, hours: number, minutes: number, seconds: number): Date {
  const newDate = new Date(date);

  newDate.setHours(newDate.getHours() + hours);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  newDate.setSeconds(newDate.getSeconds() + seconds);

  return newDate;
}

export function getUTCTimes(baseDate: Date, offsetHours: number, offsetMinutes: number, offsetSeconds: number) {
  const utcStartingTime = convertDateToUTC(baseDate);
  const baseOffsetDate = increaseDateByTime(baseDate, offsetHours, offsetMinutes, offsetSeconds);
  const utcEndingTime = convertDateToUTC(baseOffsetDate);

  

  return {
    startTime: utcStartingTime,
    endTime: utcEndingTime
  };
}