function TextBoxComponent(parent, options = {}) {
  const { x = 0, y = 0, width = 250, height = 200 } = options;
  const lineHeight = 15;
  const padding = 7;
  const contentWidth = width - padding * 2;
  const root = parent.append("g").attr("transform", `translate(${x},${y})`);
  const arrowHeadSize = 10;

  root.style("visibility", "hidden");

  // Render arrowhead
  const arrowHead = root
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", arrowHeadSize)
    .attr("height", arrowHeadSize)
    .attr("class", "c-text-box__arrow-head")
    .attr("transform", "translate(0,20) rotate(45)");

  const content = root.append("g");

  // Render shadow
  const shadow = content
    .append("rect")
    .attr("x", 3)
    .attr("y", 3)
    .attr("width", width)
    .attr("height", height)
    .attr("class", "c-text-box__shadow");

  // Render background
  const background = content
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("class", "c-text-box__background");

  const textGroup = content.append("g");

  let calculatedHeight = 0;

  const controller = {
    show: () => {
      root.style("visibility", "visible");
    },
    positionArrowHead: (side, centerY) => {
      const x = side === "right" ? width : 0;
      const y = centerY - (arrowHeadSize * Math.SQRT2) / 2;
      content.attr(
        "transform",
        `translate(0,${centerY - calculatedHeight / 2})`
      );
      arrowHead.attr("transform", `translate(${x},${y}) rotate(45)`);
    },
    setContent: content => {
      const lines = wordWrap(content, { contentWidth: contentWidth });

      const linesSelection = textGroup.selectAll("text").data(lines);

      linesSelection
        .enter()
        .append("text")
        .attr("class", "c-text-box__text")
        .attr("x", padding)
        .attr("y", (_, i) => lineHeight / 2 + padding + i * lineHeight)
        .text(l => l);

      linesSelection.text(l => l);
      linesSelection.exit().remove();

      calculatedHeight = textGroup.node().getBBox().height + padding;
      shadow.attr("height", calculatedHeight);
      background.attr("height", calculatedHeight);
    }
  };

  return controller;
}
