module.exports = (sequelize, DataTypes) => {
    const DirectorsOfMovies = sequelize.define(
      'directorsofmovie',
      {
        // attributes
        directorId: {
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

    return DirectorsOfMovies;
  };
  