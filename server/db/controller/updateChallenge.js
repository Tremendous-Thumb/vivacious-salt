const model = require('../sequelize.js');
const Promise = require('bluebird');

module.exports = function(req, res) {
  console.log('lets update this challenge with', req.body);
  model.Challenge.update({
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    endTime: req.body.endTime,
    reward: req.body.reward
  }, {
  where: {
    id: req.params.challengeId
  }
  })
  .then((updated) => {
    res.json(updated);
  })
};
