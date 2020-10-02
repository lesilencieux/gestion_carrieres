const mongoose = require('mongoose');

const PosteSchema = mongoose.Schema({
    libelle: String,
    description: String,
    nombre_annees_experience: Number,
    diplome: String,
    date_pub: Date,
    date_expire: Date,
    nombre_poste: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Poste', PosteSchema);
