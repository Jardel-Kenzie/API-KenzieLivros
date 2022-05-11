const { Router } = require("express");
const Livro = require("../models/Livro");

const authenticateToken = require('../middlewares/autheticatedToken');
const Validations = require("../middlewares/validateProduct");
const router = Router();


router.get("/", authenticateToken, async (req, res) => {
  const {user_id} = req
  try {
    const livros = await Livro.findAll({
      where: {
        user_id
      },
      attributes: { exclude: ["ip_user", "user_id"] },
    });
    return res.status(200).json(livros);
  } catch (error) {
    return res.status(400).json({msg: "Erro ao carregar Livros"});
  }
});

router.post("/", authenticateToken, Validations.validaLivro, async (req, res) => {
  try {
    const { titulo, autor, categoria, imagem, descricao } = req.body;

    let {user_id, ip_user} = req
    ip_user = "111.111.111"

    const product = await Livro.create({
      user_id,
      titulo,
      autor,
      categoria,
      imagem,
      descricao,
      ip_user,
      attributes: { exclude: ["ip_user", "user_id"] }
    });
    
    product["ip_user"] = undefined
    product["user_id"] = undefined

    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({msg: error.message});

  }
});

router.patch('/:id', authenticateToken, Validations.validatePatchLivro, async (req, res) => {
  const user_id = req.user_id
  const id = req.params.id
  const livro = req.body
  try{
    const exist = await Validations.isExist(id, user_id)
    const tagsProducts = ['titulo', 'autor', 'categoria', 'descricao', 'imagem']
		const newData = {}
		const dataError = {}

		for(const key in livro){
			if(tagsProducts.includes(key)){
				newData[key] = livro[key]
			}else{
				dataError[key] = livro[key]
			}
		}

    if(exist){
      if(Object.values(newData).length > 0){
        try{
          await Livro.update({
            ...newData
          },{
            where: {id, user_id}
          })
  
          if(Object.values(dataError).length > 0){
            return res.status(202).json({msg: "Livro Atualizado", error: `propriedades incorretas: ${Object.keys(dataError)}, usar apenas essas chaves: ${tagsProducts}`  }) 
          }
          return res.status(202).json("Livro Atualizado")   
        }catch(err){
          return res.status(400).json(err.message)
        }
      }else{
        return res.status(400).json(`Bad request, passar pelo menos uma dessas propriedades: ${tagsProducts}`)
      }
    }
  
    return res.status(404).json({msg: `Livro com id ${id} não pertence a você ou está invalido`});
  } catch(err){
    return res.status(400).json({error: err.message})
  }

})

router.delete("/:id", authenticateToken, async (req, res) => {
  const user_id = req.user_id
  const id = req.params.id

  try{
    const exist = await Validations.isExist(id, user_id)

    if(exist){
      await Livro.destroy({
        where: {
          id,
          user_id
        },
      });

      return res.status(204).json();
    }
    
    return res.status(404).json({msg: `Livro com id ${id} não pertence a você ou está invalido`});
  }catch(err){
    return res.status(400).json({msg: err.message})
  }
  
});

module.exports = router;
