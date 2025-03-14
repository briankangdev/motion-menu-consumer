/**
 * @param created_at - date string
 *
 * **Time_ago** function returns a *message* that will be used to render a i18n key
 * and the *values* that will be used to render the correct translation.
 *
 */

export let time_ago = (
  created_at: string,
): { message: string; values: { [key: string]: number } } => {
  let date = new Date(created_at);
  let todayDate = new Date();
  let timeDiff = Math.abs(todayDate.getTime() - date.getTime());
  let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

  if (diffDays === 0) {
    return { message: "today", values: null };
  } else if (diffDays > 0 && diffDays < 7) {
    // use diffDays as a key to get the correct translation
    let message = diffDays === 1 ? "day_ago" : "days_ago";
    return { message, values: { days: diffDays } };
  } else if (diffDays >= 7 && diffDays < 30) {
    let message = Math.floor(diffDays / 7) === 1 ? "week_ago" : "weeks_ago";
    return { message, values: { weeks: Math.floor(diffDays / 7) } };
  } else if (diffDays >= 30 && diffDays < 365) {
    let message = Math.floor(diffDays / 30) === 1 ? "month_ago" : "months_ago";
    return { message, values: { months: Math.floor(diffDays / 30) } };
  } else if (diffDays >= 365) {
    let message = Math.floor(diffDays / 365) === 1 ? "year_ago" : "years_ago";
    return { message, values: { years: Math.floor(diffDays / 365) } };
  }
};
