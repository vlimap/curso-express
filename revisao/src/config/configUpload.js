// importando o modulo multer
const multer = require('multer');
// importando o modulo uuid
const { v4: uuidv4 } = require('uuid');
// importando o modulo path
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let uploadDir;
        if (req.path.startsWith('/administrador')) {// /administrador
            uploadDir = path.join(__dirname, '../modulos/administrador/upload');
        } else if (req.path.startsWith('/usuario')) {
            uploadDir = path.join(__dirname, '../modulos/usuario/upload');
        } else {
            uploadDir = path.join(__dirname, '../uploads'); 
        }
        callback(null, uploadDir);
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = uuidv4() + path.extname(file.originalname);
        callback(null, uniqueSuffix);
    }
});

const filtro = (requisicao, file, callback) =>{
    const tipo_arquivo = /jpg|jpeg|png|gif|webp/;
    const mimetype = tipo_arquivo.test(file.mimetype);
    const extensao = tipo_arquivo.test(path.extname(file.originalname).toLowerCase());
    if(mimetype && extensao){
        return callback(null, true);
    }else{
        callback(new Error('Formato de arquivo invalido'));
    }
};

const tamanho_arquivo ={
    fileSize: 5 * 1024 * 1024, // 5mb
    files: 1
};

const upload = multer({ 
    storage: storage,
    fileFilter: filtro,
    fileSize: tamanho_arquivo
});

module.exports = upload;
