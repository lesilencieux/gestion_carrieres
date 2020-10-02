const Candidature = require('../models/candidature.model.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// Create and Save a new Candidature
// Create and Save a new Candidature
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Candidature content can not be empty"
        });
    }

    // Create a Candidature
    const candidature = new Candidature({
        idCandidat: req.body.idCandidat, 
        idPoste: req.body.idPoste,
        cv: req.body.cv
    });

    // Save Candidature in the database
    candidature.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Candidature."
        });
    });
};


exports.candidatsListe = (req, res) => {
    Candidature.find({ "poste": req.query.idPoste })
        .then(candidatures => {
            candidatures.forEach(element => {
                Candidat.findById(element.candidat, function (err, candidat) {
                    toreturn.push({"nom":candidat.nom,"prenom":candidat.prenom,
                    "telephone":candidat.telephone,"cv":element.cv})

                    res.send(toreturn);
                });
               
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving candidat."
            });
        });
};