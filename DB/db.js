const mongoose = require('mongoose')

const {MONGO_FULL_CONNECTION_STRING} = process.env


const connectToDb = async () => {
    mongoose.set('strictQuery', false)

    await mongoose.connect(
        MONGO_FULL_CONNECTION_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err) => {
            if (err) {
                console.error('Error connecting to DB.', err)
            } else {
                console.log('Connected to DB.')
            }
        }
    )
}


module.exports = {
    connectToDb
}
