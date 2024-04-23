'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Post, {foreignKey: "PostId"})
      Comment.belongsTo(Comment, {foreignKey: "CommentId", as: 'Quote'})
      Comment.hasOne(Comment,{foreignKey: "CommentId", as: 'Quotes'})

    }
  }
  Comment.init({
    content:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "The content, thou witless fool, must not remain vacant"
        },
        notEmpty: {
          msg: "The content, thou witless fool, must not remain vacant"
        },
        len:{
          args: [5, 225],
          msg: "The content, thou simpleton, must span betwixt five and two hundred fifty-five characters in length"
        }
      }
    },
    author: DataTypes.STRING,
    CommentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};