const Sequelize = require('sequelize');

const modelNames = ['User', 'Movie', 'Room', 'Seat', 'Actor', 'Director', 'Genre'];
const models = {};

const sequelize = new Sequelize('cinema', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync({ logging: false });
    console.log('Connection to database OK');
  })
  .catch(err => {
    console.log('Connection to database NOT OK');
    console.log(err);
  });

modelNames.forEach(modelName => {
  models[modelName] = sequelize.import(__dirname + `/models/${modelName}.js`);
});

module.exports = { sequelize, models };
