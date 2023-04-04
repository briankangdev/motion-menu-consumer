export function getNumberOfLines(element) {
  // Get the line height and element height
  const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
  const elementHeight = element.offsetHeight;

  // Check if line height is zero to avoid division by zero errors
  if (lineHeight === 0) {
    return 0;
  }

  // Calculate the number of lines by dividing the element height by the line height and rounding
  const numberOfLines = Math.round(elementHeight / lineHeight);
  return numberOfLines;
}
