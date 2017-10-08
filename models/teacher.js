'use strict';
const fullName = require('../helper/fullname')

module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    SubjectId : DataTypes.INTEGER
  })
  Teacher.associate = model => {
    Teacher.belongsTo(model.Subject)
  }
  Teacher.prototype.getFullName= function(){
    return fullName(this.first_name, this.last_name)
  }
  return Teacher;
};