export function getContentWidthByLine(element) {
  if (!element) {
    return null;
  }

  // Get the text content and split it into words
  const content = element.textContent;
  const words = content.split(" ");

  // Get the element's styles
  const computedStyle = window.getComputedStyle(element);
  const fontFamily = computedStyle.fontFamily;
  const fontSize = computedStyle.fontSize;

  // Create a temporary element to measure the width of the words
  const tempElement = document.createElement("span");
  tempElement.style.position = "absolute";
  tempElement.style.left = "-9999px";
  tempElement.style.top = "-9999px";
  tempElement.style.fontFamily = fontFamily;
  tempElement.style.fontSize = fontSize;
  document.body.appendChild(tempElement);

  // Set the line width limit to 95% of the element's width
  const borderLimit = 0.95;

  // Initialize variables to store line information
  let currentLine = 1;
  let currentLineWidth = 0;
  const lineData = [];

  // Iterate over each word and check if a line break is needed
  for (const word of words) {
    tempElement.textContent = word;
    const wordWidth = tempElement.offsetWidth;

    if (currentLineWidth + wordWidth > element.clientWidth * borderLimit) {
      lineData.push(currentLineWidth);
      currentLine += 1;
      currentLineWidth = 0;
    }

    currentLineWidth += wordWidth;
  }

  // Add the last line and remove the temporary element
  lineData.push(currentLineWidth);
  document.body.removeChild(tempElement);

  return lineData;
}
