const { Model, DataTypes } = require('sequelize');

class User extends Model {
	static init(sequelize) {
		super.init({
		name: {
			type: DataTypes.STRING,
			allowNull: {
				msg: "Campo nome não foi setado"
			},
			va2lidate : {
				notEmpty: {
					msg: "Campo nome não pode ser vazio"
				},
				len: {
					args: [4,150],
					msg: "Campo nome deve ter entre 4 a 150 caracteres",
				}

			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: {
				msg: "Email não foi setado"
			},

			isUnique : {
				msg: "Email já cadastrado"
			},

			validate: {
				notEmpty: {
					msg: "Campo email não pode ser vazio"
				},
				isEmail:{
					msg: "Deve ser um email valido"
				}
			},
		},

		password: {
			type: DataTypes.STRING,
			allowNull: {
				msg: "Campo password não foi setado"
			},
			validate : {
				notEmpty: {
					msg: "Campo password não pode ser vazio"
				},
				len: {
					args: [6,150],
					msg: "Campo password deve ter entre 6 a 60 caracteres",
				}
			}
		},
		}, 
		{
			sequelize
		})
	}
	static associate(models){
		this.hasMany(models.Livro, {foreignKey: 'user_id', as: 'livros'})
	}
}

module.exports = User