module.exports = (sequelize, DataTypes) => {
    const GenresOfMovies = sequelize.define(
      'genresofmovie',
      {
        // attributes
        genreId: {
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

    return GenresOfMovies;
  };
  