const mongoose = require('mongoose');

const CandidatureSchema = mongoose.Schema({
    idCandidat: String,
    idPoste: String,
    cv: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Candidature', CandidatureSchema);
