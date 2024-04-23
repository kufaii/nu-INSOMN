// const {Post} = require('../models')

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

module.exports = {godOnly}