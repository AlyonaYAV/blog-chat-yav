module.exports = {
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  JWT: process.env.JWT,
  EMAIL:{
    service: '', // Choose your email service like google gmail for example
    host: "", // Specify your host or some SMTP
    user: "", // User as login of an email
    pass: "", // Password of an email
  }
}
