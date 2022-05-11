const { Model, DataTypes } = require('sequelize')

module.exports = class Livro extends Model{
    static init(sequelize){
        super.init({
            titulo: {
                type: DataTypes.STRING,
                allowNull: {
                    msg: "Campo titulo não foi setado"
                },
                validate : {
                    notEmpty: {
                        msg: "Campo titulo não pode ser vazio"
                    },
                    len: {
                        args: [4,150],
                        msg: "Campo Titulo deve ter entre 4 a 150 caracteres",
                    }
                }
            },
            autor: {
                type: DataTypes.STRING,
                allowNull: {
                    msg: "Campo autor não foi setado"
                },
                validate : {
                    notEmpty: {
                        msg: "Campo autor não pode ser vazio"
                    },
                }
            },
            categoria: {
                type: DataTypes.STRING,
                allowNull: {
                    msg: "Campo categoria não foi setado"
                },
                validate : {
                    notEmpty: {
                        msg: "Campo categoria não pode ser vazio"
                    },
                    len: {
                        args: [4,150],
                        msg: "Campo Categoria deve ter entre 4 a 150 caracteres",
                    }

                }
            },
            descricao:{
                type: DataTypes.TEXT,
                allowNull: {
                    msg: "Campo descricao não foi setado"
                },
                validate : {
                    notEmpty: {
                        msg: "Campo descricao não pode ser vazio"
                    },
                    max: {
                        msg: "Campo descricao não pode ultrapassar 500 caracteres",
                    }

                }
            },
            imagem: {
                type: DataTypes.TEXT,
                allowNull: {
                    msg: "Campo imagem não foi setado"
                },
                validate : {
                    isUrl: {
                        msg: "Campo imagem deve ser uma URL"
                    }
                }
            },
            ip_user: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'users'})
    }
}