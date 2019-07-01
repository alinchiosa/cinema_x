module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      // attributes
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamp: false
    }
  );

  User.associate = models => {
    User.hasMany(models.Booking, {
      foreignKey: "userId",
      as: "bookings"
    });
  };

  return User;
};
