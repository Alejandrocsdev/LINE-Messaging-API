const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Group, {
        through: models.UserGroup,
        foreignKey: { name: 'userId', field: 'user_id' },
        otherKey: { name: 'groupId', field: 'group_id' },
        as: 'groups',
      });
    }
  }
  User.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
				unique: true,
      },
      displayName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
    },
  );
  return User;
};
