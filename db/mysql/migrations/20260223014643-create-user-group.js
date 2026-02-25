module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_groups', {
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
				primaryKey: true,
        // Matches the 'users' table in the User model
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      group_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
				primaryKey: true,
        // Matches the 'groups' table in the Group model
        references: { model: 'groups', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_groups');
  },
};
