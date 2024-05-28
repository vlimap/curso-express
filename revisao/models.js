const { DataTypes } = require('sequelize');
const moment = require('moment-timezone')
const sequelize = require('./configBD');
const bcrypt = require('bcrypt');

const Usuario = sequelize.define('Usuario',{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: {
                msg: 'O nome é obrigatorio!'
            },
            len:{
                args:[3, 50],
                msg:'O nome deve ter no minimo 3 caracteres e no máximo 50'
            }   
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
            msg: 'O e-mail já existe!'
        },
        validate:{
            isEmail:{
                msg: 'Forneça um e-mail valido!'
            }
        }
    },
    telefone:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:{
                args:[8,11],
                msg: 'O telefone deve ter no minimo 8 e no máximo 11 digitos!'
            }
        }
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
            msg: 'O CPF já existe!'
        },
        validate:{
                is:{
                    args:[/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/],
                    msg: 'CPF invalido!'
            }
        }
    },
    endereco:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
        notNull:{
            msg: 'Endereço não pode ser vazio!'
        }
       }
    },
    data_cadastro:{
        type: DataTypes.NOW,
        allowNull: false,
        defaultValue: ()=> moment().tz('America/Recife').format('DD-MM-YYYY HH-mm-ss')
    },
    data_nascimento:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            isAfter:{
                args: ()=> moment().tz('America/Recife').format('DD-MM-YYYY HH-mm-ss'),
                msg: 'Não é permitido cadastro com data '
            },
            isBefore:{
                args:['1900-01-01'],
                msg:'A data deve ser depois de 1900-01-01'
            }
        }

    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:{
                args:[8,15],
                msg:'A senha deve ter no minimo 8 e no máximo 15 digitos'
            }
        }

    },
    status:{
        type: DataTypes.ENUM('ativo', 'inativo'),
        defaultValue: 'ativo',
        allowNull: false
    },
},{
    hooks:{
        beforeCreate: async (usuario) => {
            if(usuario.senha){
                const salt = await bcrypt.genSalt(10);
                usuario.senha = await bcrypt.hash(usuario.senha, salt);
            }
        },
        beforeUpdate: async (usuario) => {
            if(usuario.senha){
                const salt = await bcrypt.genSalt(10);
                usuario.senha = await bcrypt.hash(usuario.senha, salt);
            }
        }
    },
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuario',
    timestamps: false
});


module.exports = Usuario;