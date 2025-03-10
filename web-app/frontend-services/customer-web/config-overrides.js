// config-overrides.js
module.exports = function override(config) {
  // Prevent console clearing
  config.infrastructureLogging = { level: 'none' };
  
  // Additional options to reduce noise
  if (config.devServer) {
    config.devServer.client = {
      ...config.devServer.client,
      logging: 'none',
      overlay: true,
      progress: false,
    };
  }
  
  return config;
};
