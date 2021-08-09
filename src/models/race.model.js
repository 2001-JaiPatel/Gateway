const mongoose = require('mongoose')

const RaceEventSchema = new mongoose.Schema({
    event: { type: String ,required:true },
    time: { type: Number  ,required:true},
    horse: {
        id: { type: Number  ,required:true},
        name: { type: String  ,required:true}
    }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('raceEvent', RaceEventSchema);