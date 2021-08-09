require('dotenv').config();
const mongoose = require('mongoose')

const trotService = require('./services/trot.service')
const { raceEventModel } = require('./models')
const config = require('./config')

const start = async () => {
    try {
        const { data } = await trotService.getRaceStatus();
        // if (!raceEventModel.findOne({ "event": data.event, "horse.id": data.horse.id, time: data.time })) {
        //     await raceEventModel.create(data);
        // } else {
        //     console.log('Exist Event:%s, id: %d, name:%s, time:%d ', data.event, data.horse.id, data.horse.name, data.time)
        // }
        console.log('Inserted Event:%s, id: %d, name:%s, time:%d ', data.event, data.horse.id, data.horse.name, data.time)
        await raceEventModel.create(data);
    } catch (error) {
        console.error(`Error: ${error.response ? error.response.data.error : error.code}`)
    }
}

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => { setInterval(() => { start(); }, 60000); })
    .catch((err) => { console.error(err) });


