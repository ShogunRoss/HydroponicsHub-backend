const authResolver = require('./auth');
const deviceResolver = require('./device');

const rootResolver = {
  ...authResolver,
	...deviceResolver,
}

module.exports = rootResolver;