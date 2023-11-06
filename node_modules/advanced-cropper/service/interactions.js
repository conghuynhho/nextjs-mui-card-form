function hasInteractions(interactions) {
    return (interactions.moveCoordinates ||
        interactions.resizeCoordinates ||
        interactions.transformImage.move ||
        interactions.transformImage.rotate ||
        interactions.transformImage.flip ||
        interactions.transformImage.scale);
}
function emptyInteractions() {
    return {
        moveCoordinates: false,
        resizeCoordinates: false,
        transformImage: {
            rotate: false,
            move: false,
            scale: false,
            flip: false,
        },
    };
}

export { emptyInteractions, hasInteractions };
