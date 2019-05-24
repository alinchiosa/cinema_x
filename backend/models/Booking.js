module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define(
      'booking',
      {
        // attributes
      },
      {
        // options
      }
    );

    Booking.associate = (models) => {
      // Booking.hasMany(models.Seat, {
      //     foreignKey:"bookingId",
      //     as: 'seats'
      // });

      // Booking.belongsTo(models.User, {
      //   foreignKey:"bookingId",
      //   as: 'user'
      //   });

      Booking.belongsTo(models.Screening, {
        foreignKey:"screeningId",
        as: 'screening'
      });
    };


    
    return Booking;
  };
  