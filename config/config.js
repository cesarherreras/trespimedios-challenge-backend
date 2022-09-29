require('dotenv').config();

const config = {
    dbUrl: process.env.DATABASE_URL,
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production'
};

module.exports = { config };