/**
 *
 * @returns {number} - scroll percentage
 *
 * **getScrollPercent** function returns the scroll percentage of the page, from 0 to 100.
 */

export function getScrollPercent(): number {
  const h: HTMLElement = document.documentElement,
    b: HTMLElement = document.body,
    st: string = "scrollTop",
    sh: string = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
}
