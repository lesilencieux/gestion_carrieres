const mongoose = require('mongoose');

const CandidatSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    telephone: String,
    email: String,
    profession: String,
    pwd: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Candidat', CandidatSchema);
