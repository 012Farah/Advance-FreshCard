export function calcTimeLeft(targetDate) {
    if (!targetDate) targetDate = new Date().setHours(23, 59, 59, 999); // Default to end of today lw el backend fe api m4 7ab3tsh target date

    const ONE_HOURS_MS = 60 * 60 * 1000;
    const ONE_MINUTES_MS = 60 * 1000;
    const ONE_SECONDS_MS = 1000;

    const timeLeft = targetDate - new Date().getTime();

    if (timeLeft > 0) {
  const hours = Math.trunc(timeLeft / ONE_HOURS_MS);
  const minutes = Math.trunc((timeLeft % ONE_HOURS_MS) / ONE_MINUTES_MS);
  const seconds = Math.trunc((timeLeft % ONE_MINUTES_MS) / ONE_SECONDS_MS);

  return { hours, minutes, seconds };
} else {
  return { hours: 0, minutes: 0, seconds: 0 };
}

}



