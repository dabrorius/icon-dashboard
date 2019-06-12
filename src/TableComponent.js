function TableComponent(parent, options = {}) {
  const {
    x = 0,
    y = 0,
    width = 100,
    height = 100,
    colorCodeAttribute,
    colorScheme = {}
  } = options;
  const columnLabels = options.columns;
  const columnWidths = columnLabels.map(
    (_, i) => (options.columnWidths && options.columnWidths[i]) || "auto"
  );

  const autoColumns = columnWidths.filter(d => isNaN(d));
  const fixedWidthColumns = columnWidths.filter(d => !isNaN(d));
  const totalFixedColumnsWidths =
    width - fixedWidthColumns.reduce((sum, d) => sum + d, 0);
  const autoColumnWidth = totalFixedColumnsWidths / autoColumns.length;

  const calculateColumnWidth = index => {
    const fixedWidth = columnWidths[index];
    return isNaN(fixedWidth) ? autoColumnWidth : fixedWidth;
  };

  const root = parent.append("g").attr("transform", `translate(${x},${y})`);

  root
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("class", "c-table__background");

  const rowHeight = 20;

  let sortOptions = {
    field: "Benefit",
    direction: -1
  };
  let currentContent = [];
  let controlObject;

  // Render table header
  const header = root.append("g").attr("class", "c-table__header");
  const handleHeaderClick = field => {
    // Update sort direction state
    if (sortOptions.field === field) {
      sortOptions.direction = -sortOptions.direction;
    } else {
      sortOptions = { field, direction: 1 };
    }

    // Add sorting indicators to header
    const columnLabelsWithArrows = columnLabels.map(d => {
      if (d === sortOptions.field) {
        return `${d} ${sortOptions.direction > 0 ? "↑" : "↓"}`;
      } else {
        return d;
      }
    });
    console.log(columnLabelsWithArrows);
    const headerLabelsSelection = header
      .selectAll("text.c-table__cell-content")
      .data(columnLabelsWithArrows);
    headerLabelsSelection.text(d => d);

    controlObject.update(currentContent);
  };
  renderRow(header, columnLabels, {
    calculateColumnWidth,
    rowHeight,
    onClick: handleHeaderClick
  });

  const contentGroup = root
    .append("g")
    .attr("transform", `translate(0,${rowHeight})`);

  controlObject = {
    update: content => {
      currentContent = content;

      const compareFunction = (a, b) => {
        if (a[sortOptions.field] < b[sortOptions.field]) {
          return -sortOptions.direction;
        }
        if (a[sortOptions.field] > b[sortOptions.field]) {
          return sortOptions.direction;
        }
        return 0;
      };
      const sortedContent = content.slice().sort(compareFunction);

      const rowsSelection = contentGroup
        .selectAll("g.c-table__row")
        .data(sortedContent, d => Object.values(d).join("."));

      rowsSelection
        .enter()
        .append("g")
        .attr("class", "c-table__row")
        .attr(
          "transform",
          (d, rowIndex) => `translate(0,${rowHeight * rowIndex})`
        )
        .each(function(rowContent) {
          const rowGroup = d3.select(this);
          const color = colorScheme[rowContent[colorCodeAttribute]];
          const data = columnLabels.map(attr => rowContent[attr]);
          renderRow(rowGroup, data, {
            calculateColumnWidth,
            rowHeight,
            color
          });
        });

      rowsSelection
        .attr(
          "transform",
          (d, rowIndex) => `translate(0,${rowHeight * rowIndex})`
        )
        .each(function(rowContent) {
          const rowGroup = d3.select(this);
          const data = columnLabels.map(attr => rowContent[attr]);
          renderRow(rowGroup, data, { calculateColumnWidth, rowHeight });
        });

      rowsSelection.exit().remove();
    }
  };

  return controlObject;
}

/**
 * Calls Create/Update/Delete
 * to update given table row.
 *
 * @param {*} root
 * @param {*} data
 * @param {*} options
 */
function renderRow(root, data, options) {
  const { calculateColumnWidth, rowHeight, color, onClick } = options;

  const cellMargin = 2;
  const cellPadding = 4;

  // const cellWidth = columnWidth - cellMargin;
  const cellHeight = rowHeight - cellMargin;

  const backgroundSelection = root
    .selectAll("rect.c-table__cell-background")
    .data(data);

  const calculateXPosition = i =>
    d3.sum(d3.range(i).map(i => calculateColumnWidth(i)));

  const backgrounds = backgroundSelection
    .enter()
    .append("rect")
    .attr("x", (d, i) => calculateXPosition(i))
    .attr("y", 0)
    .attr("width", (d, i) => calculateColumnWidth(i) - cellMargin)
    .attr("height", cellHeight)
    .attr("class", "c-table__cell-background");

  if (color) {
    backgrounds.style("fill", color);
  }

  if (onClick) {
    backgrounds.on("click", onClick);
  }

  backgroundSelection.exit().remove();

  const contentSelection = root
    .selectAll("text.c-table__cell-content")
    .data(data);

  contentSelection
    .enter()
    .append("text")
    .attr("x", (d, i) => cellPadding + calculateXPosition(i))
    .attr("y", rowHeight / 2)
    .attr("class", "c-table__cell-content")
    .text(d => d);

  contentSelection.text(d => d);
  contentSelection.exit().remove();
}
