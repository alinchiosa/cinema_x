module.exports = (sequelize, DataTypes) => {
  const DirectorsOfMovies = sequelize.define(
    "directorsofmovie",
    {
      // attributes
      directorId: {
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

  return DirectorsOfMovies;
};
