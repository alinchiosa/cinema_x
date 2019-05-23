module.exports = (sequelize, DataTypes) => {
    const Actor = sequelize.define(
      'actor',
      {
        // attributes
        actorName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        // options
      }
    );
  
    return Actor;
  };
  