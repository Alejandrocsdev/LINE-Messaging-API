const fs = require('fs').promises;

const read = async (file) => {
  const data = await fs.readFile(file, 'utf8');
  return JSON.parse(data);
};

const write = async (file, data) => {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
};

module.exports = { read, write };
