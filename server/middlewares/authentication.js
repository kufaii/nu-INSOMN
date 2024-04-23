const {verifyToken} = require('../helpers/helper')
const {User} = require('../models')

async function authentication(req, res, next){
    try {
        if(!req.headers.authorization) throw { name: "unauthenticated" }

        const token = req.headers.authorization.split(" ")[1]

        const payload = verifyToken(token)

        const findUser = await User.findByPk(payload.id)
        if(!findUser) throw { name: "unauthenticated" }

        req.user = {
            id: payload.id,
            role: findUser.role,
            CategoryId: findUser.CategoryId
        };

        next();
    } catch (error) {
        next(error)
    }
}

module.exports = {authentication}