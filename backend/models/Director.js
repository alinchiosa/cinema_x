module.exports = (sequelize, DataTypes) => {
    const Director = sequelize.define(
      'director',
      {
        // attributes
        directorName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        // options
      }
    );

    Director.associate = (models) => {
      Director.belongsToMany(models.Movie, {
        through: 'DirectorsOfMovie',
          foreignKey:"directorId",
          as: 'movie'
      });
    };
  
    return Director;
  };
  