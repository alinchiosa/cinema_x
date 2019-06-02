module.exports = (sequelize, DataTypes) => {
    const Seat = sequelize.define(
      'seat',
      {
        // attributes
        seatNo: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        seatRow: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        seatType: {
            type: DataTypes.STRING,
            allowNull: false,
        }
      },
      {
        // options
      }
    );

    Seat.associate = (models) => {
        Seat.hasOne(models.Booking, {
            foreignKey:"seatId",
            as: 'seat',
        });
        
    };

  
    return Seat;
  };
  