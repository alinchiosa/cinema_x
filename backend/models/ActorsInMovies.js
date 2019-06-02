module.exports = (sequelize, DataTypes) => {
    const ActorsInMovies = sequelize.define(
      'actorsinmovie',
      {
        // attributes
        actorId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        movieId: {
            type: DataTypes.STRING,
            allowNull: false,
          },
      },
      {
        // options
      }
    );

    return ActorsInMovies;
  };
  