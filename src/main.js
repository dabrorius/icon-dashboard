function generateName(data, cfg) {
  return "Focus Table";
}

let measureText;
let wordWrap;

function renderSlide(data, cfg, done) {
  // Initialize global helpers
  measureText = initializeTextMeasurer(svg);
  wordWrap = initializeWordWrapper(measureText);

  const headerData = data[0].find(d => d.title && d.subtitle);
  const leftMenuData = data[1].filter(d => d.title);
  const rightMenuData = data[2].filter(d => d.title);
  const fullTableData = data[3];

  console.log(
    "DATA",
    data,
    headerData,
    leftMenuData,
    rightMenuData,
    fullTableData
  );

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

  const handleLinkClick = ({ tableName, category }) => {
    console.log(tableName, category);
    const tableData = fullTableData.filter(
      d => d.category === category && d.table === tableName
    );
    table.update(tableData);
  };

  IconMenuComponent(svg, leftMenuData, {
    x: padding,
    y: secondRowY,
    width: menuWidth,
    orderAndIcons: [
      {
        title: "Operational, Portfolio & Asset efficiency",
        icon: "home.png",
        tableLinks: [
          {
            label: "Operational, Portfolio & Asset efficiency",
            value: "Operational, Portfolio & Asset efficiency"
          }
        ]
      },
      {
        title: "Growth & Innovation",
        icon: "notebook.png",
        tableLinks: [
          { label: "Growth & Innovation", value: "Growth & Innovation" }
        ]
      },
      {
        title: "Capabilities & Resources",
        icon: "check.png",
        tableLinks: [
          { label: "Capabilities", value: "Capability" },
          { label: "&" },
          { label: "Resources", value: "Resources" }
        ]
      },
      { title: "Shareholder Capital", icon: "chart.png" },
      { title: "Competitive advantage", icon: "money.png" }
    ],
    onIconMouseover: d => {
      textBox.show();
      textBox.setContent(d.content);
      textBox.positionArrowHead("left", d.y);
    },
    onLinkClick: handleLinkClick
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
        tableLinks: [
          { label: "Leadership", value: "Leadership" },
          { label: "& culture" }
        ]
      }
    ],
    onIconMouseover: d => {
      textBox.show();
      textBox.setContent(d.content);
      textBox.positionArrowHead("right", d.y);
    },
    onLinkClick: handleLinkClick
  });

  table.update([]);

  done();
}

return {
  generateName: generateName,
  renderSlide: renderSlide
};
