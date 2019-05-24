module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define(
      'genre',
      {
        // attributes
        genreType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        // options
      }
    );
  
    Genre.associate = (models) => {
      Genre.belongsToMany(models.Movie, {
        through: 'GenresOfMovie',
          foreignKey:"genreId",
          as: 'movie'
      });
    };

    return Genre;
  };
  