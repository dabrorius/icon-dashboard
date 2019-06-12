function HeaderComponent(parent, data) {
  const padding = 10;
  const lineHeight = 15;
  const titleHeight = 30;

  const root = parent
    .append("g")
    .attr("transform", `translate(${padding}, ${padding})`);

  root
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("class", "c-header__title")
    .text(data.title);

  const subtitle = root
    .append("g")
    .attr("transform", `translate(0, ${titleHeight})`);

  const subtitleLines = wordWrap(data.subtitle, { contentWidth: 600 });

  subtitle
    .selectAll("text")
    .data(subtitleLines)
    .enter()
    .append("text")
    .attr("class", "c-header__sub-title")
    .attr("x", 0)
    .attr("y", (_, i) => i * lineHeight)
    .text(l => l);

  const controller = {
    getHeight: () =>
      titleHeight + subtitleLines.length * lineHeight + padding * 2
  };
  return controller;
}
