'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('StudentSubjects', [{
      SubjectId :10,
      StudentId : 6
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StudentSubjects', null, {})
  }
};
