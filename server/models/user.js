'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Category, {through:'Follow', foreignKey: "UserId"})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Thine electronic missive, thou dullard, cannot remain empty"
        },
        notEmpty: {
          msg: "Thine electronic missive, thou dullard, cannot remain empty"
        },
        len:{
          args: [5, 50],
          msg: "The email, thou imbecile, must span betwixt five and fifty characters"
        },
        isEmailFormat(value) {
          if (!value.includes('@')) {
            throw new Error('Art thou certain thou hath entered an electronic missive, knave? Wherefore is the @ sign?');
          }
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "The password, thou fool, cannot be left vacant"
        },
        notEmpty: {
          msg: "The password, thou fool, cannot be left vacant"
        },
        len:{
          args: [5, 25],
          msg: "The password, thou witless wretch, must range between five and twenty-five characters"
        }
      }
    },
    username:{
      type: DataTypes.STRING,
      allowNull: true
    },
    role:{
      type:DataTypes.STRING,
      defaultValue: "plebeian",
      allowNull: false,
      validate:{
        notEmpty:true,
        notNull: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  const { faker } = require('@faker-js/faker');
  const {crypt} = require('../helpers/helper')
  User.beforeCreate((x,options) =>{
    const hash = crypt(x.dataValues.password);
    let kebab = ''
    x.password = hash;
    switch (x.dataValues.username) {
      case 'cat':

        x.username = faker.animal.cat().replace(/\s+|_+/g, '-')
        break;
      case 'dog':
        x.username = faker.animal.dog().replace(/\s+|_+/g, '-')
        break;
      default:
        x.username = faker.animal.insect().replace(/\s+|_+/g, '-')
        break;
    }
  })
  User.beforeUpdate((x,options) =>{
    switch (x.dataValues.username) {
      case 'cat':
        x.username = faker.animal.cat().replace(/\s+|_+/g, '-')
        break;
      case 'dog':
        x.username = faker.animal.dog().replace(/\s+|_+/g, '-')
        break;
      default:
        x.username = faker.animal.insect().replace(/\s+|_+/g, '-')
        break;
    }
  })
  return User;
};