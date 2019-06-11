function IconMenuComponent(parent, data, options) {
  const { x = 0, y = 0, width = 200 } = options;
  const spacing = 80;
  const imageSize = 40;
  const imagePadding = 20;

  const labelsWidth = width - imageSize - imagePadding;

  const root = parent.append("g").attr("transform", `translate(${x},${y})`);

  // Render group for each label
  const textGroups = root
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", (_, i) => `translate(0,${i * spacing})`);

  // Render individual lines for each label
  textGroups.each(function(d) {
    const $this = d3.select(this);
    const lines = wordWrap(d, { contentWidth: labelsWidth });
    const lineHeight = 15;
    const halfHeight = (lines.length * lineHeight) / 2;
    $this
      .selectAll("text")
      .data(lines)
      .enter()
      .append("text")
      .attr("class", "c-icon-menu__text")
      .attr("x", 0)
      .attr("y", (_, i) => spacing / 2 - halfHeight + i * lineHeight)
      .text(l => l);
  });

  // Render icon
  root
    .selectAll("image")
    .data(data)
    .enter()
    .append("image")
    .attr(
      "xlink:href",
      "https://raw.githubusercontent.com/dabrorius/icon-dashboard/master/icons/home.png"
    )
    .attr("x", width - imageSize)
    .attr("y", (_, i) => i * spacing + spacing / 2 - imageSize / 2)
    .style("width", imageSize)
    .style("height", imageSize);
}
