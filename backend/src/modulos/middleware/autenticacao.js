const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;

const autenticar = (req, res, next) => { 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) {
        console.log('Token não fornecido');
        return res.sendStatus(401);
    }

    jwt.verify(token, secret_key, (err, user) => {
        if (err) {
            console.log('Erro na verificação do token:', err);
            return res.sendStatus(403);
        }
        console.log('Token decodificado:', user);
        req.user = user;
        next();
    });
};

module.exports = autenticar;
