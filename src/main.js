function generateName(data, cfg) {
  return "Focus Table";
}

let measureText;
let wordWrap;

function renderSlide(data, cfg, done) {
  // Initialize global helpers
  measureText = initializeTextMeasurer(svg);
  wordWrap = initializeWordWrapper(measureText);

  const headerData = data[0][0];
  const leftMenuData = data[1].map(d => d.title);
  console.log(data);

  svg
    .append("text")
    .attr("x", 10)
    .attr("y", 10)
    .attr("class", "c-header__title")
    .text(headerData.title);

  svg
    .append("text")
    .attr("x", 10)
    .attr("y", 40)
    .attr("class", "c-header__sub-title")
    .text(headerData.subtitle);

  IconMenuComponent(svg, leftMenuData, { x: 10, y: 90 });
  done();
}

return {
  generateName: generateName,
  renderSlide: renderSlide
};
