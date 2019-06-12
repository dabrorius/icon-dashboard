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
  const fullTableData = data[3];

  console.log("FTD", fullTableData);

  const cardHeight = alytic.cardSize.height;
  const cardWidth = alytic.cardSize.width;

  const padding = 10;
  const menuWidth = 300;
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

  const tableWidth = 500;
  const tableHeight = 200;

  const table = TableComponent(svg, {
    columns: ["Row Name", "Availability", "Importance"],
    columnWidths: ["200", "auto", "auto"],
    x: (cardWidth - tableWidth) / 2,
    y: cardHeight - tableHeight,
    width: tableWidth,
    height: tableHeight
  });

  IconMenuComponent(svg, leftMenuData, {
    x: padding,
    y: secondRowY,
    width: menuWidth,
    orderAndIcons: [
      {
        title: "Operational, Portfolio & Asset efficiency",
        icon: "home.png",
        tableLinks: ["Operational, Portfolio & Asset efficiency"]
      },
      {
        title: "Growth & Innovation",
        icon: "notebook.png",
        tableLinks: ["Growth & Innovation"]
      },
      {
        title: "Capabilities & Resources",
        icon: "check.png",
        tableLinks: ["Capabilities", "Resources"]
      },
      { title: "Shareholder Capital", icon: "chart.png" },
      { title: "Competitive advantage", icon: "money.png" }
    ],
    onIconMouseover: d => {
      textBox.show();
      textBox.setContent(d.content);
      textBox.positionArrowHead("left", d.y);
    },
    onLinkClick: ({ tableName, category }) => {
      console.log(tableName, category);

      const tableData = fullTableData.filter(
        d => d.category === category && d.table === tableName
      );
      table.update(tableData);
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
      {
        title: "Leadership & culture",
        icon: "people-bright.png",
        tableLinks: ["Leadership"]
      }
    ],
    onIconMouseover: d => {
      textBox.show();
      textBox.setContent(d.content);
      textBox.positionArrowHead("right", d.y);
    },
    onLinkClick: d => {
      console.log(d);
    }
  });

  table.update([]);

  done();
}

return {
  generateName: generateName,
  renderSlide: renderSlide
};
