const model = require('../sequelize.js');
const Promise = require('bluebird');

module.exports = function getSubmissionData() {
  return model.Proof.find({
    where: {
      usersChallengeId: usersChallengeId
    }
  })
}
