require("dotenv").config();

const { compare } = require("bcryptjs");
const User = require("../models/User");

const { sign } = require("jsonwebtoken");


module.exports = class AuthenticateUserCase{
    static async execute({email, password}, response){
        const userAlreadExists = await User.findOne({
            where: {
                email
            }
        })

        if(!userAlreadExists){
            return response.status(404).json({error: `Email: ${email} does not exists`})
        }

        const passwordMatch = await compare(password, userAlreadExists.password)

        if(!passwordMatch){
            return response.status(401).json({error: 'password invalid'})
        }
        
        const token = sign({id: userAlreadExists.id}, process.env.SECRETE_KEY, {
            subject: toString(userAlreadExists.id),
            expiresIn: "10d",
        })

        return token 

    }
}