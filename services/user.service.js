const { User } = require('../db/mysql/models');

exports.findAll = () => {
  return User.findAll();
};

exports.findByUserId = (userId) => {
  return User.findOne({ where: { userId } });
};

exports.create = (payload = {}) => {
  return User.create(payload);
};
