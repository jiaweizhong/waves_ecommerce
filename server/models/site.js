const mongoose = require('mongoose');

// site schema
const siteSchema = mongoose.Schema({
    featured: {
        require: true,
        type:Array,
        default: []
    },
    siteInfo: {
        required: true,
        type: Array,
        default: []
    }
});

// create site model
const Site = mongoose.model('Site', siteSchema);

module.exports = { Site }