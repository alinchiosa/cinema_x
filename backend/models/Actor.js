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

    Actor.associate = (models) => {
      Actor.belongsToMany(models.Movie, {
        through: 'ActorsInMovie',
        foreignKey:"actorId",
        as: 'movie'
      });
    };
  
  
    return Actor;
  };
  