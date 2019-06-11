function TextBoxComponent(parent, options = {}) {
  const { x = 0, y = 0, width = 250 } = options;
  const lineHeight = 15;

  const textGroup = parent
    .append("g")
    .attr("transform", `translate(${x},${y})`);

  const controller = {
    setContent: content => {
      const lines = wordWrap(content, { contentWidth: width });

      const linesSelection = textGroup.selectAll("text").data(lines);

      linesSelection
        .enter()
        .append("text")
        .attr("class", "c-text-box__text")
        .attr("x", 0)
        .attr("y", (_, i) => i * lineHeight)
        .text(l => l);

      linesSelection.text(l => l);

      linesSelection.exit().remove();
    }
  };

  return controller;
}
