module.exports = {
    PORT: process.env.PORT || 8080,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://jordan:password1@ds113693.mlab.com:13693/spaced-repetition',
    // TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost/noteful-test',
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
    API_BASE_URL: process.env.API_URL || 'https://spaced-repitetition-server.herokuapp.com/'
    // API_BASE_URL: 'http://localhost:8080/api'
  }; 