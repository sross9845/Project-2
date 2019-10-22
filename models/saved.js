'use strict';
module.exports = (sequelize, DataTypes) => {
  const saved = sequelize.define('saved', {
    name: DataTypes.STRING,
    time: DataTypes.STRING,
    venue: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  saved.associate = function(models) {
    // associations can be defined here
    models.saved.belongsTo(models.user);
  };
  return saved;
};