const { where, Op } = require('sequelize')
const { createToken, verifyToken, crypt, compare } = require('../helpers/helper')
const { User, Post, Comment, Category, Follow } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client();
const { CLIENT_ID, ACCESS_KEY } = process.env

const axios = require('axios')

class Controller {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { name: "invalid_email/username/password" }
            }
            let user = await User.findOne({ where: { email: email } })
            if (!user) {
                throw { name: "invalid_email/username/password" }
            }

            const verify = compare(password, user.password)

            if (!verify) {
                throw { name: "invalid_email/username/password" }
            }

            const payload = { id: user.id };
            const access_token = createToken(payload);

            res.status(200).json({ data: { access_token, username: user.username } });

        } catch (error) {
            next(error)
        }
    }
    static async googleLogin(req, res, next) {
        try {
            const { google_token } = req.headers
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: CLIENT_ID
            })

            console.log(">>>>>>", ticket);

            const googlePayload = ticket.getPayload()

            const [user, created] = await User.findOrCreate({
                where: {
                    email: googlePayload.email
                },
                defaults: {
                    username: googlePayload.name,
                    email: googlePayload.email,
                    password: String(Math.random() * 1000)
                }
            })

            const payload = {
                id: user.id
            }

            const access_token = createToken(payload)

            res.status(200).json({
                access_token
            })
        } catch (error) {
            next(error)
        }
    }
    static async register(req, res, next) {
        try {
            console.log(req.body);
            // const {email, password, username} = req.body
            const newUser = await User.create(req.body)
            delete newUser.dataValues.password

            res.status(201).json({ message: "user added", data: newUser })

        } catch (error) {
            next(error)
        }
    }
    static async post(req, res, next) {
        try {
            const allPost = await Post.findAll({ attributes: { exclude: ['UserId'] }, order: [['votes', 'DESC']], include: Category })

            res.status(200).json({
                data: allPost
            })
        } catch (error) {
            next(error)
        }
    }
    static async postByCategory(req, res, next) {
        try {
            let followingId = []
            const { id } = req.user
            const user = await User.findByPk(id, {
                attributes: ['id', 'username'],
                include: [
                    {
                        model: Category,
                        through: 'Follows',
                        attributes: ['id', 'name']
                    }
                ]
            })
            user.Categories.map(el => followingId.push(el.id))

            const allPost = await Post.findAll({
                attributes: { exclude: ['UserId'] },
                where: {
                    CategoryId: {
                        [Op.in]: followingId
                    }
                },
                order: [['votes', 'DESC']], include: Category
            })

            res.status(200).json({
                data: allPost
            })
        } catch (error) {
            next(error)
        }
    }
    static async top5Post(req, res, next) {
        try {
            const allPost = await Post.findAll({ attributes: { exclude: ['UserId'] }, limit: 5, order: [['votes', 'DESC']] })

            res.status(200).json({
                data: allPost
            })
        } catch (error) {
            next(error)
        }
    }
    static async postById(req, res, next) {
        try {
            const postById = await Post.findByPk(req.params.id, { attributes: { exclude: ['UserId'] } })

            res.status(200).json({
                data: postById
            })
        } catch (error) {
            next(error)
        }
    }
    static async addPost(req, res, next) {
        try {
            const { title, CategoryId } = req.body

            const UserId = req.user.id
            const newPost = await Post.create({
                title,
                CategoryId,
                UserId
            })

            res.status(201).json({ data: newPost })
        } catch (error) {
            next(error)
        }
    }
    static async deletePost(req, res, next) {
        try {
            const deleted = await Post.findByPk(req.params.id, { attributes: { exclude: ['UserId'] }, })
            if (!deleted) {
                throw { name: "not found" }
            }
            await Post.destroy({ where: { id: req.params.id } });

            res.status(200).json({ data: deleted })
        } catch (error) {
            next(error)
        }
    }
    static async votePost(req, res, next) {
        try {
            const { id } = req.params
            const { vote } = req.body //accept either -1 or 1
            const checkPost = await Post.findByPk(id)
            if (!checkPost) throw { name: "not found" }

            const data = await Post.increment('votes', { by: vote, where: { id } })

            res.status(200).json({ data })
        } catch (error) {
            next(error)
        }
    }
    static async allCategory(req, res, next) {
        try {
            const category = await Category.findAll()

            res.status(200).json({ data: category })
        } catch (error) {
            next(error)
        }
    }
    static async postCategory(req, res, next) {
        try {
            const postPerCategory = await Post.findAll({ attributes: { exclude: ['UserId'] }, order: [['votes', 'DESC']], where: { CategoryId: req.params.id } })

            res.status(200).json({
                data: postPerCategory
            })
        } catch (error) {
            next(error)
        }
    }
    static async comment(req, res, next) {
        try {
            const PostId = req.params.id
            const comment = await Comment.findAll({
                where: {
                    PostId
                },
                include: [
                    {
                        model: Comment,
                        attributes: ['author', 'content'],
                        as: 'Quote'
                    }
                ]
            })

            res.status(200).json({ data: comment })
        } catch (error) {
            next(error)
        }
    }
    static async addComment(req, res, next) {
        try {
            const { content, CommentId } = req.body
            const id = req.params.id
            const UserId = req.user.id
            let quoteId = CommentId
            if (!quoteId) {
                quoteId = null
            }

            const { username } = await User.findByPk(UserId)

            const comment = await Comment.create({
                content,
                author: username,
                CommentId: quoteId,
                PostId: id
            });
            res.status(201).json({ data: comment })
        } catch (error) {
            next(error)
        }
    }
    static async user(req, res, next) {
        try {
            const { id } = req.user
            const user = await User.findByPk(id, {
                attributes: ['id', 'username'],
                include: [
                    {
                        model: Category,
                        through: 'Follows',
                        attributes: ['id', 'name']
                    }
                ]
            })

            res.status(200).json({ data: user })
        } catch (error) {
            next(error)
        }
    }
    static async editUser(req, res, next) {
        try {
            const checkUser = await User.findByPk(req.params.id)
            if (!checkUser) throw { name: "not found" }
            checkUser.dataValues.username = req.body.username
            const status = await checkUser.save()
            const data = {
                id: status.id,
                username: status.username
            }

            res.status(200).json({ data })
        } catch (error) {
            next(error)
        }
    }
    static async addFollow(req, res, next) {
        try {
            const follow = await Follow.create({
                UserId: req.user.id,
                CategoryId: req.params.id
            })

            res.status(201).json({ data: follow })
        } catch (error) {
            next(error)
        }
    }
    static async deleteFollow(req, res, next) {
        try {
            const deleted = await Follow.findOne({
                where: {
                    UserId: req.user.id,
                    CategoryId: req.params.id
                }
            })
            if (!deleted) {
                throw { name: "not found" }
            }
            await Follow.destroy({
                where: {
                    UserId: req.user.id,
                    CategoryId: req.params.id
                }
            });

            res.status(200).json({ data: deleted })
        } catch (error) {
            next(error)
        }
    }
    static async images(req, res, next) {
        try {
            const { data } = await axios.get(`https://api.unsplash.com/photos/random?count=1&client_id=${ACCESS_KEY}`)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async template(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller