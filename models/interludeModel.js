const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InterludeSchema = new Schema({
    partyName: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    acts: {
        type: [Object],
        required: true,
        default: []
    },
    
});

const Interlude = mongoose.model('interludes', InterludeSchema);

module.exports = Interlude;