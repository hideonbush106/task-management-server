export default () => ({
  mongodbConnectionString: process.env.MONGODB_CONNECTION_STRING,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME
})
