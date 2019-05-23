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
  
    return Genre;
  };
  