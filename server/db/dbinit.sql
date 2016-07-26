-- Currently not using since sequelize creates database but this can be used 
-- as a reference of how the database will be created or if you do not want to 
-- use ORM

CREATE TABLE IF NOT EXISTS users ( 
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  url TEXT,
  facebookId TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now() 
);

CREATE TABLE IF NOT EXISTS types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS challenges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  url TEXT,
  challengers INTEGER,
  successes INTEGER,
  creatorId INTEGER,
  typeId INTEGER,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  endTime TIMESTAMP WITH TIME ZONE,
  CONSTRAINT challenges_creator_fk FOREIGN KEY (creatorId) REFERENCES users(id),
  CONSTRAINT challenges_type_fk FOREIGN KEY (typeId) REFERENCES types(id) 
);
 
CREATE TABLE IF NOT EXISTS users_challenges (
  id SERIAL PRIMARY KEY,
  userId INTEGER,
  challengeId INTEGER,
  timeAccepted TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT join_user_fk FOREIGN KEY (userId) REFERENCES users(id),
  CONSTRAINT join_challenge_fk FOREIGN KEY (challengeId) REFERENCES challenges(id) 
);

CREATE TABLE IF NOT EXISTS proof (
  id SERIAL PRIMARY KEY,
  userChallengeId INTEGER,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  creatorAccepted BOOLEAN,
  CONSTRAINT userChallenge_fk FOREIGN KEY (userChallengeId) REFERENCES users_challenges(id)
);
