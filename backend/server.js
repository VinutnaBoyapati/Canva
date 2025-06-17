const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const canvasRoutes = require('./routes/canvasRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/canvas', canvasRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
