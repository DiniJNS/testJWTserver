require('dotenv').config()

const db = {
    uri: process.env.db_uri
}

module.exports = db