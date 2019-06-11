function IconMenuComponent(parent, data, options) {
  const { x = 0, y = 0 } = options;
  const spacing = 50;
  const root = parent.append("g").attr("transform", `translate(${x},${y})`);

  const textGroups = root
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", (_, i) => `translate(10,${i * spacing})`);

  textGroups.each(function(d) {
    const $this = d3.select(this);
    const lines = wordWrap(d);
    console.log("Lines::", lines);
    $this
      .selectAll("text")
      .data(lines)
      .enter()
      .append("text")
      .attr("x", 0)
      .attr("y", (_, i) => i * 15)
      .text(l => l);
  });
}
