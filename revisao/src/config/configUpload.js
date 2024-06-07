// importando o modulo multer
const multer = require('multer');
// importando o modulo uuid
const { v4: uuidv4 } = require('uuid');
// importando o modulo path
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../modulos/usuario/upload'));
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = uuidv4() + path.extname(file.originalname);
        callback(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
