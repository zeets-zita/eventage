const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

let event = mongoose.model('event', EventSchema);
module.exports = event;

