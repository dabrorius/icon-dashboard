// Define method for measuring text length
function initializeTextMeasurer(svg, defaultTextSize = 12) {
  const textMeasurer = svg.append("text").attr("visibility", "hidden");
  return (string, fontSize = defaultTextSize) =>
    textMeasurer
      .text(string)
      .style("font-size", `${fontSize}px`)
      .node()
      .getBBox().width;
}
