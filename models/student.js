'use strict';
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
  return Student;
};