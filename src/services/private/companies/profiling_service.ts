import Cookies from "js-cookie";

// Cookie name following the naming convention
const PROFILING_COMPLETED_COOKIE = "profiling_completed";

export const markProfilingAsCompleted = () => {
  // Set cookie with no expiration date (browser session) or set expiration in days
  // Using 365 days (1 year) as an example
  Cookies.set(PROFILING_COMPLETED_COOKIE, "true");
};

export const hasCompletedProfiling = (): boolean => {
  return Cookies.get(PROFILING_COMPLETED_COOKIE) === "true";
};
