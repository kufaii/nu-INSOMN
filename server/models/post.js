'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Category, {foreignKey: "CategoryId"})
      Post.hasMany(models.Comment, {foreignKey: "PostId"})
    }
  }
  Post.init({
    title:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "The title, thou simpleton, cannot be left void"
        },
        notEmpty: {
          msg: "The title, thou simpleton, cannot be left void"
        },
        len:{
          args: [5, 100],
          msg: "The title, thou ignoramus, must range between five and one hundred characters"
        }

      }
    },
    votes:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};