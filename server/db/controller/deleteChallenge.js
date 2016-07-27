const model = require('../sequelize.js');
const Promise = require('bluebird');

module.exports = function(req, res) {
  console.log('lets destroy this challenge with', req.params.challengeId);
  model.Challenge.destroy({
    where: {
      id: req.params.challengeId
    }
  })
  .then((destroyed) => {
    res.redirect('/');
  })
};
