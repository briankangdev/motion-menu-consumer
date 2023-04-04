export function getFontHeight(element) {
  if (!element) {
    return null;
  }

  // Get the computed style of the element
  const computedStyle = window.getComputedStyle(element);

  // Extract the font size from the computed style
  const fontSizeStr = computedStyle.getPropertyValue("font-size");

  // Convert the font size to a number
  const fontSize = parseFloat(fontSizeStr);

  return fontSize;
}
