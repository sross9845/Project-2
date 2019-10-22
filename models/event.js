'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    name: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    time: DataTypes.STRING,
    venue: DataTypes.STRING,
    description: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args: [1,500],
          msg: 'Description must be between 1 and 500 characters'
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {});
  event.associate = function(models) {
    // associations can be defined here
    models.event.belongsTo(models.user);
    models.event.hasMany(models.comment);
  };
  return event;
};