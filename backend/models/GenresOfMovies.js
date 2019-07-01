module.exports = (sequelize, DataTypes) => {
  const GenresOfMovies = sequelize.define(
    "genresofmovie",
    {
      // attributes
      genreId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      movieId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      }
    },
    {
      timestamps: true
    }
  );

  return GenresOfMovies;
};
