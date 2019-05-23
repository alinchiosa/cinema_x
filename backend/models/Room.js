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
  
    return Room;
  };
  