module.exports = (sequelize, DataTypes) => {
  const ActorsInMovies = sequelize.define(
    "actorsinmovie",
    {
      // attributes
      actorId: {
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

  return ActorsInMovies;
};
