module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "event",
    {
      // attributes
      date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamp: false
    }
  );

  return Event;
};
