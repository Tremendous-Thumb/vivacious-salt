const Sequelize = require('sequelize');
const config = require('../config/config.js');

// setup connection with postgresdb
const sequelize = new Sequelize(config.herokuPostgresAuth, {
  dialect: 'postgres',
  protocol: 'postgres',
  port: 5432,
  host: 'ec2-54-225-243-220.compute-1.amazonaws.com',
  dialectOptions: {
    ssl: true,
  },
  logging: false,
  define: {
    timestamps: false
  }
});
// FOR LOCAL use
// const sequelize = new Sequelize('postgres://localhost:5432/challenges')

// user model
const User = sequelize.define('user', {
  name: Sequelize.STRING(100),
  email: Sequelize.STRING(100),
  url: Sequelize.TEXT,
  facebookId: Sequelize.TEXT,
});

// Type model
const Type = sequelize.define('type', {
  name: Sequelize.STRING(50),
});

// Challenge model
const Challenge = sequelize.define('challenge', {
  name: Sequelize.STRING(100),
  description: Sequelize.TEXT,
  url: Sequelize.TEXT,
  challengers: Sequelize.INTEGER,
  successes: Sequelize.INTEGER,
  endTime: Sequelize.DATE,
});

// Users_challenge model
const Users_challenge = sequelize.define('users_challenges', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  timeAccepted: Sequelize.DATE,
});

// proof model
const Proof = sequelize.define('proof', { creatorAccepted: Sequelize.BOOLEAN }
  , { freezeTableName: true });

// create foreign key contraints within challenge table
User.hasMany(Challenge);
Type.hasMany(Challenge);

// create foreign key contraints in join table Users_challenge
User.belongsToMany(Challenge, { through: Users_challenge });
Challenge.belongsToMany(User, { through: Users_challenge });

// create foreign key contraint for Proof table
Users_challenge.hasMany(Proof);

Users_challenge.sync();
User.sync();
Type.sync();
Challenge.sync();
Proof.sync();

exports.User = User;
exports.Type = Type;
exports.Challenge = Challenge;
exports.Users_challenge = Users_challenge;
exports.Proof = Proof;
exports.sequelize = sequelize;
