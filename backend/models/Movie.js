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
  
    return Movie;
  };
  