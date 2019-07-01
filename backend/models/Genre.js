module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "genre",
    {
      // attributes
      genreType: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamp: false
    }
  );

  Genre.associate = models => {
    Genre.belongsToMany(models.Movie, {
      through: "GenresOfMovies",
      foreignKey: "genreId",
      as: "movie"
    });
  };

  return Genre;
};
