const Poste = require('../models/poste.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Poste content can not be empty"
        });
    }

    // Create a Poste
    const poste = new Poste({
        libelle: req.body.libelle , 
        description: req.body.description,
        nombre_annees_experience: req.body.nombre_annees_experience,
        diplome: req.body.diplome,
        date_pub: req.body.date_pub,
        date_expire: req.body.date_expire,
        nombre_poste: req.body.nombre_poste
    });

    // Save Poste in the database
    poste.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Poste."
        });
    });
};

// Retrieve and return all postes from the database.
exports.findAll = (req, res) => {
    Poste.find()
    .then(postes => {
        res.send(postes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving postes."
        });
    });
};

// Find a single poste with a posteId
exports.findOne = (req, res) => {
    Poste.findById(req.params.posteId)
    .then(poste => {
        if(!poste) {
            return res.status(404).send({
                message: "Poste not found with id " + req.params.posteId
            });            
        }
        res.send(poste);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Poste not found with id " + req.params.posteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving poste with id " + req.params.posteId
        });
    });
};


// Delete a poste with the specified posteId in the request
exports.delete = (req, res) => {
    Poste.findByIdAndRemove(req.params.posteId)
    .then(poste => {
        if(!poste) {
            return res.status(404).send({
                message: "Poste not found with id " + req.params.posteId
            });
        }
        res.send({message: "Poste deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Poste not found with id " + req.params.posteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete poste with id " + req.params.posteId
        });
    });
};
