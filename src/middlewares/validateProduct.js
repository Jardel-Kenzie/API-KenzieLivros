const yup = require("yup");
const Livro = require("../models/Livro");

class Validations{
  	static livroSchema = yup.object().shape({
    	titulo: yup
			.string("Formato de titulo invalido, deve ser uma string")
			.required("Campo de titulo obrigátorio"),
    	autor: yup
    	  	.string("Formato de autor invalida, deve ser uma string")
    	  	.required("Campo de autor obrigátorio"),
    	categoria: yup
    	  	.string("Formato de categoria invalido, deve ser uma string")
    	  	.required("Campo de categoria obrigátorio"),
    	imagem: yup
    	  	.string()
    	  	.url("Formato de imagem invalido, deve ser uma url"),
    	descricao: yup
    	  	.string("Formato de categoria invalido, deve ser uma string")
    	  	.required("Campo de categoria obrigátorio")
  	});
	
	  static livroSchemaPatch = yup.object().shape({
		titulo: yup
			.string("Formato de titulo invalido, deve ser uma string"),
    	autor: yup
    	  	.string("Formato de autor invalida, deve ser uma string"),
    	categoria: yup
    	  	.string("Formato de categoria invalido, deve ser uma string"),
    	imagem: yup
    	  	.string()
    	  	.url("Formato de imagem invalido, deve ser uma url"),
    	descricao: yup
    	  	.string("Formato de categoria invalido, deve ser uma string")
	});


	static registerSchema = yup.object().shape({
		email: yup
			.string()
			.email("Campo email deve está em forma de string email")
			.required("Campo email Obrigátorio"),
		name: yup
			.string("Campo nome deve ser uma string")
			.required("Campo name Obrigátorio"),
		password: yup
			.string("Campo password deve ser uma string")
			.required("Campo password Obrigátorio")
	})

  static validaLivro = async (req, res, next) =>{
    const livro = req.body;
    try {
      	await Validations.livroSchema.validate(livro);
      	next();
    } catch (e) {
      	return res.status(400).json({ error: e.errors.join(", ") });
    }
  };

  static validadeRegister = async(req, res, next) => {
	  const user = req.body
	  try{
		  await Validations.registerSchema.validate(user);
		  next()
	  } catch (e){
		  return res.status(400).json({error:e.errors.join(", ")});
	  }
  }

  static async isExist(id, user_id){
	return ( await Livro.findOne({
		where: {
		  id,
		  user_id
		},
		attributes: { exclude: ["ip_user", "user_id"] }
	}) || false)
  }

  	static validatePatchLivro = async (req, res, next) => {
		const livro = req.body
	
		try {
			await Validations.livroSchemaPatch.validate(livro);
			next();
			
		} catch (e) {
			return res.status(400).json({ error: e.errors.join(", ") });
		}
		
  }
}


module.exports = Validations;
