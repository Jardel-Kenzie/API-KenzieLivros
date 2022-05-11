const CreateUserCase = require('./CreateUserCaseController') 

module.exports = class CreateUser{
    static async handle(request, response){
       
    const { name, email, password } = request.body;
    
    const user = await CreateUserCase.execute({name, email, password}, response)

    return response.status(201).json(user)

    }
}