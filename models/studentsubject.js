'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    score: DataTypes.INTEGER
  })
  StudentSubject.associate = model => {
    StudentSubject.belongsTo(model.Subject);
    StudentSubject.belongsTo(model.Student);
  }
  return StudentSubject;
};