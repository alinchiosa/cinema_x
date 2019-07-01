module.exports = (sequelize, DataTypes) => {
  const Director = sequelize.define(
    "director",
    {
      // attributes
      directorName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamp: false
    }
  );

  Director.associate = models => {
    Director.belongsToMany(models.Movie, {
      through: "DirectorsOfMovies",
      foreignKey: "directorId",
      as: "movie"
    });
  };

  return Director;
};
