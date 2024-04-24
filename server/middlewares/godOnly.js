const {Post} = require('../models')

async function godOnly(req, res, next){
    try {
        if(req.user.role != "god"){
            throw { name: "unauthorized" }
        }

        // const post = Post.findByPk(req.params.id)
        // if(post.UserId != req.user.id){
        //     throw { name: "unauthorized" }
        // }

        next();
    } catch (error) {
        next(error)
    }
}

async function authUserForAdmin(req,res,next){
    try {
        if(req.user.role == "god"){
            return next()
        }else{
            const {id} = req.params
            const post = await Post.findByPk(id)
            console.log(post)

            if(post.userId == req.user.id){
                return next()
            }else{
                throw {name: "unauthorized"}
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {godOnly,authUserForAdmin}