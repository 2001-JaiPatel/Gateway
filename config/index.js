module.exports = {
    mongoURI: process.env.MONGODB_URL,
    apiBaseUrl: process.env.API_BASE_URL,
    authBody: {
        "email": process.env.AUTH_EMAIL,
        "password": process.env.AUTH_PASS
    }
}