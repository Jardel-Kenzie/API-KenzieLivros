const { Router } = require("express");
const Livro = require("../models/Livro");

const router = Router();


router.get("/",  async (req, res) => {
  const user_id = 1
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

module.exports = router;
