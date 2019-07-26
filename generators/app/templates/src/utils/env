module.exports = {
  /**
   * Checks if all the passed in environment variables exist and throws an error if not.
   *
   * @param {string[]} variables
   * @returns {void}
   */
  checkEnvironmentVariables(variables) {
    variables.forEach(variable => {
      if (!process.env[variable]) throw new Error(`Missing environment variable '${variable}'.`);
    });
  },
};
