const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    static associate(models) {
      UserGroup.belongsTo(models.User, {
        foreignKey: { name: 'userId', field: 'user_id' },
      });
      UserGroup.belongsTo(models.Group, {
        foreignKey: { name: 'groupId', field: 'group_id' },
      });
    }
  }

  UserGroup.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'UserGroup',
      tableName: 'user_groups',
      timestamps: false,
      underscored: true,
    },
  );

  return UserGroup;
};
