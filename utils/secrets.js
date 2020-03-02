module.exports = {
    jwtSECRET: process.env.JWT_KEY,
    DB_ENV: process.env.DB_ENV || 'development',
    PORT: process.env.PORT
};