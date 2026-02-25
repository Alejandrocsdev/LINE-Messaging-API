const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: models.UserGroup,
        foreignKey: { name: 'groupId', field: 'group_id' },
        otherKey: { name: 'userId', field: 'user_id' },
        as: 'users',
      });
    }
  }
  Group.init(
    {
      groupId: {
        allowNull: false,
        type: DataTypes.STRING,
				unique: true,
      },
      groupName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Group',
      tableName: 'groups',
      underscored: true,
    },
  );
  return Group;
};
