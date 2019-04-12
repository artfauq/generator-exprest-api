const env = process.env.NODE_ENV || 'development';

const isProduction = env === 'production';
const isDevelopment = !isProduction;

module.exports = { env, isProduction, isDevelopment };
