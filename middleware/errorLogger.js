const conn = require('../services/dbService')

const log = async (request, response) => {
    if (response.statusCode >= 400 && response.statusCode < 600) {
        const db = await conn.connectToDB()
        const errorCollection = db.collection('errors')
        errorCollection.insertOne({
            ip: request.ip,
            url: request.originalUrl,
            statusCode: response.statusCode,
            time: new Date()
        })
    }
}

module.exports = log