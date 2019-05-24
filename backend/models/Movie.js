module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define(
      'movie',
      {
        // attributes
        movieTitle: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        runtime: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        esrb: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        trailer: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        // options
      }
    );
  

    Movie.associate = (models) => {
      Movie.hasMany(models.Screening, {
          foreignKey:"movieId",
          as: 'movie',
      });

      Movie.associate = (models) => {
        Movie.belongsToMany(models.Actor, {
          through: 'ActorsInMovie',
          foreignKey:"movieId",
          as: 'actor'
        });  
      };

      Movie.associate = (models) => {
        Movie.belongsToMany(models.Director, {
          through: 'DirectorsOfMovie',
          foreignKey:"movieId",
          as: 'director'
        });
      };

      Movie.associate = (models) => {
        Movie.belongsToMany(models.Genre, {
          through: 'GenresOfMovie',
            foreignKey:"movieId",
            as: 'genre'
        });
      };
  };


    return Movie;
  };
  