const Sequelize = require('sequelize');

const modelNames = ['User', 'Movie', 'Room', 'Booking', 'Actor', 'Director', 'Genre', 'Seat', 'Screening', 'DirectorsOfMovies', 'GenresOfMovies', 'ActorsInMovies'];
const models = {};

const sequelize = new Sequelize('cinema', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync({ logging: false});
    
    console.log('Connection to database OK');
  })
  .catch(err => {
    console.log('Connection to database NOT OK');
    console.log(err);
  });

modelNames.forEach(modelName => {
  models[modelName] = sequelize.import(__dirname + `/models/${modelName}.js`);
});

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) models[modelName].associate(models);
});


module.exports = { sequelize, models };

