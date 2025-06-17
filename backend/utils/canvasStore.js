const { createCanvas } = require('canvas');

const canvasStore = {};

function initCanvas(id, width, height, scale = 2) {
    const canvas = createCanvas(width * scale, height * scale);
    const ctx = canvas.getContext('2d');

    // Scaled the drawing context so x/y/width/height stay in user units
    ctx.scale(scale, scale);

    canvasStore[id] = {
        canvas,
        ctx,
        scale,
        width: width * scale,
        height: height * scale,
    };
}

function getCanvas(id) {
    return canvasStore[id];
}

module.exports = {
    initCanvas,
    getCanvas,
};
