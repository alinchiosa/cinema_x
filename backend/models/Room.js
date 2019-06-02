module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define(
      'room',
      {
        // attributes
        roomType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        noOfRows: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
      },
      {
        // options
      }
    );

    Room.associate = (models) => {
      Room.hasMany(models.Screening, {
          foreignKey:"roomId",
          as: 'screening'
      });
      Room.hasMany(models.Seat, {
        foreignKey: "roomId",
        as: 'seat'
      })
  };
  
    return Room;
  };
  