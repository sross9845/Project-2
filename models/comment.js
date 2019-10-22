'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    name: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    content: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args: [1,200],
          msg: 'Name must be between 1 and 200 characters'
        }
      }
    },
    postId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    models.comment.belongsTo(models.event);
  };
  return comment;
};