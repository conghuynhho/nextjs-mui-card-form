function fitBoundary(boundary, size) {
    var areaHeight = boundary.clientHeight;
    var areaWidth = boundary.clientWidth;
    var currentHeight = areaHeight;
    var currentWidth = (size.width * areaHeight) / size.height;
    if (currentWidth > areaWidth) {
        currentWidth = areaWidth;
        currentHeight = (size.height * areaWidth) / size.width;
    }
    return {
        width: currentWidth,
        height: currentHeight,
    };
}
function fillBoundary(boundary) {
    return {
        width: boundary.clientWidth,
        height: boundary.clientHeight,
    };
}

export { fillBoundary, fitBoundary };
