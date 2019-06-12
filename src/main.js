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
  const rightMenuData = data[2];

  const cardHeight = alytic.cardSize.height;
  const cardWidth = alytic.cardSize.width;

  const padding = 10;
  const menuWidth = cardWidth / 4;
  const menuPadding = 20;
  const tooltipWidth =
    cardWidth - menuWidth * 2 - padding * 2 - menuPadding * 2;

  const header = HeaderComponent(svg, headerData);

  const secondRowY = header.getHeight() + 20;

  const textBox = TextBoxComponent(svg, {
    x: padding + menuPadding + menuWidth,
    y: secondRowY,
    width: tooltipWidth
  });

  IconMenuComponent(svg, leftMenuData, {
    x: padding,
    y: secondRowY,
    width: menuWidth,
    orderAndIcons: [
      { title: "Operational, Portfolio & Asset efficiency", icon: "home.png" },
      { title: "Growth & Innovation", icon: "notebook.png" },
      { title: "Capabilities & Resources", icon: "check.png" },
      { title: "Shareholder Capital", icon: "chart.png" },
      { title: "Competitive advantage", icon: "money.png" }
    ],
    onIconMouseover: d => {
      textBox.show();
      textBox.setContent(d.content);
      textBox.positionArrowHead("left", d.y);
    }
  });

  IconMenuComponent(svg, rightMenuData, {
    x: cardWidth - menuWidth - padding,
    y: secondRowY,
    width: menuWidth,
    iconsOnLeft: true,
    orderAndIcons: [
      { title: "Risk management", icon: "notebook-bright.png" },
      { title: "Decision making", icon: "check-bright.png" },
      { title: "Performance management", icon: "chart-bright.png" },
      { title: "Leadership & culture", icon: "people-bright.png" }
    ],
    onIconMouseover: d => {
      textBox.show();
      textBox.setContent(d.content);
      textBox.positionArrowHead("right", d.y);
    }
  });

  const tableHeight = 200;

  const table = TableComponent(svg, {
    columns: ["foo", "bar"],
    columnWidths: ["auto", "50"],
    x: padding + menuPadding + menuWidth,
    y: cardHeight - tableHeight,
    width: tooltipWidth,
    height: tableHeight
  });

  table.update([{ foo: 5, bar: 10 }, { foo: 17, bar: 19 }]);

  done();
}

return {
  generateName: generateName,
  renderSlide: renderSlide
};
