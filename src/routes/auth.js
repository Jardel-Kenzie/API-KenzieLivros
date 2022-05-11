const { Router } = require("express");
const CreateUser = require("../controllers/CreateUserController");
const AuthenticateUser = require("../controllers/AuthenticateUserController");
const Validations = require("../middlewares/validateProduct");

const router = Router();

router.post("/register",Validations.validadeRegister, CreateUser.handle)
router.post("/login", AuthenticateUser.handle)

module.exports = router