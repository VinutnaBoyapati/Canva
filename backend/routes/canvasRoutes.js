const express = require('express');
const multer = require('multer');
const path = require('path');
const canvasController = require('../controllers/canvasController');

const router = express.Router();

// Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only jpg, jpeg, png allowed'));
    },
});

router.post('/init', canvasController.initCanvas);
router.post('/add', canvasController.addElement); // NO multer here!
router.post('/upload', upload.single('image'), canvasController.addImage); // multer only for upload!
router.get('/export', canvasController.exportPDF);

module.exports = router;
