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
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '',
        
    },
    prompt: {
        type: String,
        default: '',
        
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    acts: {
        type: [Object],
        default: []
    },
    
});

const Interlude = mongoose.model('interludes', InterludeSchema);

module.exports = Interlude;