const { hash } = require("bcryptjs");

const User = require("../models/User");

module.exports = class CreateUserCase{
    static async execute({name, email, password}, response){
        const userAlreadExists = await User.findOne({
            where: {
                email
            }
        })
        
        if(userAlreadExists){
            return response.status(409).json('User Already Exists!')
        }

        const passwordHash = await hash(password, 8)

        const user = await User.create({
            name,
            email,
            password: passwordHash
          });

        return user
    }
}