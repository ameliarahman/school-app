'use strict';
const fullName = require('../helper/fullname')

module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is incorrect'
        }
      }
    }
  })
  Student.associate = model => {
    Student.belongsToMany(model.Subject, { through: 'StudentSubject' });
    Student.hasMany(model.StudentSubject)
  }
  Student.prototype.getFullName= function(){
    return fullName(this.first_name, this.last_name)
  }
  return Student;
};