module.exports = (app) => {
  const postes = require("../controllers/poste.controller.js");
  const candidatures = require("../controllers/candidature.controller.js");
  const candidats = require("../controllers/candidat.controller.js");

  // Create a new Poste
  app.post("/postes", postes.create);

  // Retrieve all Postes
  app.get("/postes", postes.findAll);

  // Retrieve a single Poste with posteId
  app.get("/postes/:posteId", postes.findOne);

  // Create a new candidatures
  app.post("/candidatures", candidatures.create);

  // get list candidatures
  app.get("/candidatures/list", candidatures.candidatsListe);

  // Create a new candidats
  app.post("/candidats", candidats.create);

  // Retrieve all candidats
  app.get("/candidats", candidats.findAll);

  // Identification candidat
  app.post("/login", candidats.login);

  // Retrieve all candidats
  app.delete("/candidats/:idCandidat", candidats.delete);
};
