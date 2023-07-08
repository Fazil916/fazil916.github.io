// Select the container
var svgContainer = d3.select("#svg-container");

// Define the SVG within the container
var svg = svgContainer
    .append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .attr("viewBox", "0 0 300 300");

// Define the gradient
var gradient = svg.append("defs")
  .append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#7db9e8")
    .attr("stop-opacity", 1);

gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#1a237e")
    .attr("stop-opacity", 1);

// On click event for the "Calculate" button
d3.select("#calculate").on("click", function() {
    // Make the SVG container visible
    svgContainer.style("display", "flex");

    // Remove any existing rectangle and text
    svg.selectAll("rect").remove();
    svg.selectAll("text").remove();
    svg.selectAll("circle").remove(); // Added to remove any existing luminaires

    // Fetch the length and width from input fields
    var length = d3.select("#length").property("value");
    var width = d3.select("#width").property("value");

    // Define scales based on input values
    var lengthScale = d3.scaleLinear()
        .domain([0, Math.max(length, width)])
        .range([0, 200]);

    var widthScale = d3.scaleLinear()
        .domain([0, Math.max(length, width)])
        .range([0, 200]);

    var borderThickness = 10; // you can adjust this

    // Append a rectangle for border
    svg.append("rect")
        .attr("width", lengthScale(length) + 2 * borderThickness)
        .attr("height", widthScale(width) + 2 * borderThickness)
        .attr("x", 50 - borderThickness)
        .attr("y", 50 - borderThickness)
        .attr("fill", "url(#gradient)"); // Apply gradient to border

    // Append a rectangle for room (white color)
    svg.append("rect")
        .attr("width", lengthScale(length))
        .attr("height", widthScale(width))
        .attr("x", 50)
        .attr("y", 50)
        .attr("fill", "white");

    // Append text to SVG
    svg.append("text")
        .attr("x", lengthScale(length) / 2 + 50)
        .attr("y", widthScale(width) / 2 + 50)
        .text(length + "m x " + width + "m")
        .attr("fill", "black");

    // Define number of luminaires and luminaire radius
    var numLuminaires = 10; // Change this according to your needs
    var luminaireRadius = 5; // Radius of the luminaire circles

    // The distance from the wall, converted to pixels
    var offset = 30; // Here, 30 cm = 30 px, adjust this according to your conversion factor

    // Calculate the available space and spacing between luminaires
    var availableLength = lengthScale(length) - 2 * offset;
    var availableWidth = widthScale(width) - 2 * offset;
    var spacingX = availableLength / (numLuminaires - 1);
    var spacingY = availableWidth / (numLuminaires - 1);

    // Generate luminaires
    for (var i = 0; i < numLuminaires; i++) {
        for (var j = 0; j < numLuminaires; j++) {
            svg.append("circle")
                .attr("cx", 50 + offset + i * spacingX)
                .attr("cy", 50 + offset + j * spacingY)
                .attr("r", luminaireRadius)
                .attr("fill", "yellow");
        }
    }
});
