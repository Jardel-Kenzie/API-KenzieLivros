const AuthenticateUserCase = require("./AuthenticateUserCaseController");


module.exports= class AuthenticateUserControle{
    static async handle(request, response){
        const { email, password } = request.body;

        const token = await AuthenticateUserCase.execute({
            email, password
        }, response)

        return response.status(200).json(token)
    }
}