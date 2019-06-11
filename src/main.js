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
  const leftMenuData = data[1];
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

  const textBox = TextBoxComponent(svg, { x: 220, y: 90 });
  textBox.setContent("FOOO BARRRR");

  IconMenuComponent(svg, leftMenuData, {
    x: 10,
    y: 90,
    orderAndIcons: [
      { title: "Operational, Portfolio & Asset efficiency", icon: "home.png" },
      { title: "Growth & Innovation", icon: "notebook.png" },
      { title: "Capabilities & Resources", icon: "check.png" },
      { title: "Shareholder Capital", icon: "chart.png" },
      { title: "Competitive advantage", icon: "money.png" }
    ],
    onIconMouseover: d => textBox.setContent(d.content)
  });

  done();
}

return {
  generateName: generateName,
  renderSlide: renderSlide
};
