const Candidat = require('../models/candidat.model.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Candidat content can not be empty"
        });
    }

    bcrypt.hash(req.body.pwd, 16, (err, hash) => {
        // Create a Candidat
        const candidat = new Candidat({
            nom: req.body.nom,
            prenom: req.body.prenom,
            telephone: req.body.telephone,
            email: req.body.email,
            pwd: hash,
            profession: req.body.profession
        });

        // Save Candidat in the database
        candidat.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Candidat."
                });
            });

    });


};

// Retrieve and return all candidats from the database.
exports.findAll = (req, res) => {
    Candidat.find()
        .then(candidats => {
            res.send(candidats);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving candidat."
            });
        });
};

// Find a single candidat with a candidatId
exports.findOne = (req, res) => {
    Candidat.findById(req.params.candidatId)
        .then(candidat => {
            if (!candidat) {
                return res.status(404).send({
                    message: "Candidat not found with id " + req.params.candidatId
                });
            }
            res.send(candidat);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Candidat not found with id " + req.params.candidatId
                });
            }
            return res.status(500).send({
                message: "Error retrieving candidat with id " + req.params.candidatId
            });
        });
};


// Delete a candidat with the specified candidatId in the request
exports.delete = (req, res) => {
    Candidat.findByIdAndRemove(req.params.candidatId)
        .then(candidat => {
            if (!candidat) {
                return res.status(404).send({
                    message: "Candidat not found with id " + req.params.candidatId
                });
            }
            res.send({ message: "Candidat deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Candidat not found with id " + req.params.candidatId
                });
            }
            return res.status(500).send({
                message: "Could not delete candidat with id " + req.params.candidatId
            });
        });
};


// Login candidat.
exports.login= (req, res) =>  {
    Candidat.findOne({ telephone: req.body.telephone }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      bcrypt.compare(req.body.pwd, user.pwd, function(err, isCheck) {
        if (err) {
          throw err
        } else if (!isCheck) {
          return res.status(401).send({ auth: false, token: null });
        } else {
            var token = jwt.sign({ id: user._id }, "mysecrete", {
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(200).send({ auth: true, token: token });
        }
      })
    });
}



// Delete a candidat with the specified posteId in the request
exports.delete = (req, res) => {
    Candidat.findByIdAndRemove(req.params.idCandidat)
    .then(candidat => {
        if(!candidat) {
            return res.status(404).send({
                message: "Candidat not found with id " + req.params.idCandidat
            });
        }
        res.send({message: "Candidat deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Candidat not found with id " + req.params.idCandidat
            });                
        }
        return res.status(500).send({
            message: "Could not delete poste with id " + req.params.idCandidat
        });
    });
};