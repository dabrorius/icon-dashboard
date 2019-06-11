/**
 * This functions initializes a word wrapper.
 * It accepts a `measureText` function that measures length of a given text.
 *
 * It returns a function that accepts a String and returns a Array<String>
 * where each array element represents a single row of the wrapped text.
 * @param {*} measureText
 */
function initializeWordWrapper(measureText) {
  const memoization = {};

  return (text, options = {}) => {
    const { contentWidth = 120, textSize = 12 } = options;

    // Use object for last two params
    const key = `${text} | ${textSize} | ${contentWidth}`;
    if (!memoization.hasOwnProperty(key)) {
      rows = [[]];
      text
        .toString()
        .split(" ")
        .forEach(word => {
          let currentRow = rows[rows.length - 1];
          let currentRowLength = measureText(
            currentRow.concat([word]).join(" "),
            textSize
          );
          if (currentRowLength <= contentWidth) {
            currentRow.push(word);
          } else {
            rows.push([word]);
          }
        });
      memoization[key] = rows.map(row => row.join(" "));
    }
    return memoization[key];
  };
}
