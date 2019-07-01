module.exports = (sequelize, DataTypes) => {
  const Screening = sequelize.define(
    "screening",
    {
      // attributes
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      startTime: {
        type: DataTypes.STRING,
        allowNull: false
      },
      endTime: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamp: false
    }
  );

  Screening.associate = models => {
    // Screening.belongsTo(models.Room, {
    //     foreignKey:"screeningId",
    //     as: 'room'
    // });

    Screening.belongsTo(models.Movie),
      {
        foreignKey: "screeningId",
        as: "movie"
      };

    // Screening.hasMany(models.Booking), {
    //     foreignKey:'screeningId',
    //     as: "booking"
    // }
  };

  return Screening;
};
