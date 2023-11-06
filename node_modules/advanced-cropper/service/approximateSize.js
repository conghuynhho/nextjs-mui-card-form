import { getCloserSize, createAspectRatio, resizeToSizeRestrictions } from './utils.js';

// Limitations:
// 1. Assume that maximum width and height always larger than minimum width and height
// 2. Assume that aspectRatio.minimum < aspectRatio.maximum
// If you break this limitations function could return null!
function approximateSize(params) {
    var width = params.width, height = params.height;
    var sizeRestrictions = params.sizeRestrictions || {
        minWidth: 0,
        minHeight: 0,
        maxWidth: Infinity,
        maxHeight: Infinity,
    };
    var aspectRatio = createAspectRatio(params.aspectRatio);
    var coordinates = {
        width: Math.max(sizeRestrictions.minWidth, Math.min(sizeRestrictions.maxWidth, width)),
        height: Math.max(sizeRestrictions.minHeight, Math.min(sizeRestrictions.maxHeight, height)),
    };
    var candidates = [coordinates];
    if (aspectRatio) {
        [aspectRatio.minimum, aspectRatio.maximum].forEach(function (ratio) {
            if (ratio) {
                candidates.push({ width: coordinates.width, height: coordinates.width / ratio }, { width: coordinates.height * ratio, height: coordinates.height });
            }
        });
    }
    // Resize the candidates as much as possible to prevent breaking minimum size
    candidates = candidates.map(function (candidate) { return resizeToSizeRestrictions(candidate, sizeRestrictions); });
    // TODO: fix the type of return value
    return getCloserSize(candidates, { width: width, height: height }, sizeRestrictions, aspectRatio);
}

export { approximateSize };
