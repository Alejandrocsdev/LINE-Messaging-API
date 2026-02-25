const { User } = require('../db/mysql/models');

exports.findAll = async () => {
  return User.findAll();
};

exports.findByUserId = async (userId) => {
  return User.findOne({ where: { userId } });
};

exports.create = async (payload = {}) => {
  return User.create(payload);
};
