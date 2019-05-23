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
  
    return Director;
  };
  