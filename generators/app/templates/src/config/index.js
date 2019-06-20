const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
const isDevelopment = !isProduction;

module.exports = {
  // Server options
  host: '0.0.0.0',
  port: 8080,

  // Application environment
  env,
  isProduction,
  isDevelopment
};
