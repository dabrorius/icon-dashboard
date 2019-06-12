function IconMenuComponent(parent, data, options) {
  const {
    x = 0,
    y = 0,
    width = 200,
    height = 200,
    orderAndIcons = [],
    onIconMouseover,
    iconsOnLeft = false
  } = options;

  data.sort((a, b) => {
    const firstIndex = orderAndIcons.findIndex(d => d.title === a.title);
    const secondIndex = orderAndIcons.findIndex(d => d.title === b.title);
    return firstIndex < secondIndex ? -1 : 1;
  });

  const spacing = height / data.length;
  const imagePadding = 20;
  const imageSize = 35;

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
    const lines = wordWrap(d.title, { contentWidth: labelsWidth });
    const lineHeight = 15;
    const halfHeight = (lines.length * lineHeight) / 2;
    $this
      .selectAll("text")
      .data(lines)
      .enter()
      .append("text")
      .attr("class", "c-icon-menu__text")
      .attr("x", iconsOnLeft ? imageSize + imagePadding : 0)
      .attr("y", (_, i) => spacing / 2 - halfHeight + i * lineHeight)
      .text(l => l);
  });

  // Render icons
  const getIconUrl = title => {
    const rootURL =
      "https://raw.githubusercontent.com/dabrorius/icon-dashboard/master/icons/";
    const info = orderAndIcons.find(d => d.title === title);
    if (info) {
      return rootURL + info.icon;
    } else {
      return rootURL + "home.png";
    }
  };

  const icons = root
    .selectAll("image")
    .data(data)
    .enter()
    .append("image")
    .attr("xlink:href", d => getIconUrl(d.title))
    .attr("x", iconsOnLeft ? 0 : width - imageSize)
    .attr("y", (_, i) => i * spacing + spacing / 2 - imageSize / 2)
    .style("width", imageSize)
    .style("height", imageSize)
    .attr("class", "c-icon_menu__image");

  if (onIconMouseover) {
    icons.on("mouseover", onIconMouseover);
  }
}
