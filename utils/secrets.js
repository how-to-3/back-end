module.exports = {
    jwtSECRET: process.env.JWT_SECRET || 'Secret',
    DB_ENV: process.env.DB_ENV || 'development',
    PORT: process.env.PORT || 5000
};