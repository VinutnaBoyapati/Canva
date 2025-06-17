const { loadImage } = require('canvas');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { initCanvas, getCanvas } = require('../utils/canvasStore');
const sharp = require('sharp');
exports.initCanvas = (req, res) => {
    const { id, width, height } = req.body;
    const scale = 2; 
    initCanvas(id, Number(width), Number(height), scale);
    res.json({ message: 'Canvas initialized', id });
    };


    exports.addElement = (req, res) => {
    const { id, type, x, y, width, height, radius, text } = req.body;
    const canvasData = getCanvas(id);
    if (!canvasData) return res.status(400).json({ error: 'Canvas not found' });

    const { ctx } = canvasData;

    if (type === 'rectangle') {
        ctx.fillRect(Number(x), Number(y), Number(width), Number(height));
    } else if (type === 'circle') {
        ctx.beginPath();
        ctx.arc(Number(x), Number(y), Number(radius), 0, 2 * Math.PI);
        ctx.fill();
    } else if (type === 'text') {
        ctx.font = '20px Arial';
        ctx.fillText(text, Number(x), Number(y));
    } else {
        return res.status(400).json({ error: 'Use /upload for image' });
    }

    res.json({ message: `${type} added` });
    };

    exports.addImage = async (req, res) => {
    const { id, x, y } = req.body;
    let { width, height } = req.body;
    const canvasData = getCanvas(id);

    if (!canvasData) return res.status(400).json({ error: 'Canvas not found' });
    if (!req.file) return res.status(400).json({ error: 'No image file uploaded' });

    const { ctx } = canvasData;
    const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);

    try {
        const img = await loadImage(imagePath);

        // Use uploaded image’s native size if not provided
        width = width ? Number(width) : img.width;
        height = height ? Number(height) : img.height;

        ctx.drawImage(img, Number(x), Number(y), width, height);

        // Save element for PDF export
        canvasData.elements = canvasData.elements || [];
        canvasData.elements.push({
        type: 'image',
        filename: req.file.filename,
        x: Number(x),
        y: Number(y),
        width,
        height,
        });

        res.json({ message: 'Image added successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to draw image' });
    }
    };


exports.exportPDF = async (req, res) => {
    const { id } = req.query;
    const canvasData = getCanvas(id);
    if (!canvasData) return res.status(400).json({ error: 'Canvas not found' });

    const { canvas, scale } = canvasData;

    // Convert canvas to PNG buffer
    const rawImgBuffer = canvas.toBuffer('image/png');

    //Compress the PNG using sharp
    const compressedBuffer = await sharp(rawImgBuffer)
        .png({ quality: 60, compressionLevel: 9 })  // Adjust compression as needed
        .resize({
            width: canvas.width / scale,  // Scale down resolution if needed
        })
        .toBuffer();

    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument({ autoFirstPage: false });

    const pageWidth = canvas.width / scale;
    const pageHeight = canvas.height / scale;

    doc.addPage({ size: [pageWidth, pageHeight] });

    doc.image(compressedBuffer, 0, 0, {
        width: pageWidth,
        height: pageHeight,
    });

    const filename = `canvas_${id}.pdf`;
    const filePath = path.join(__dirname, '..', 'uploads', filename);

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
    doc.end();

    stream.on('finish', () => {
        res.download(filePath, filename, () => {
            fs.unlinkSync(filePath);
        });
    });
};

