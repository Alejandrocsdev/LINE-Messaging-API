const process = require('process');

let registered = false;

const crashHandlers = () => {
  if (registered) return;
  registered = true;
	
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:');
		console.error(error);
    process.exit(1);
  });
	// console.log(x);

  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Promise Rejection:');
		console.error(reason);
    process.exit(1);
  });
	// Promise.reject(new Error('Test unhandled rejection'));
};

module.exports = crashHandlers;
