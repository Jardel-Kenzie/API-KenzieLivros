require("dotenv").config();
const { verify } = require("jsonwebtoken")

module.exports = (request, response, next) => {

    const authToken = request.headers.authorization

    if(!authToken){
        return response.status(401).json({
            message: "Token is missing"
        })
    }

    const [, token] = authToken.split(" ")

    verify(token, process.env.SECRETE_KEY, (err, decoded) => {
        if(err){
            return response.status(401).json({
                message:"Token Invalido"
            })
        }
        request.user_id = decoded.id
        return next()
    })    
}