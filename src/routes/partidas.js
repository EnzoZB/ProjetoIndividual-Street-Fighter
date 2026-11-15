var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

// O ":idUsuario" é para sabermos de qual jogador puxar os dados
router.get("/kpi-personagem-preferido/:idUsuario", function (req, res) { 
    // Repassa a requisição para a função específica da Controller
    partidaController.buscarKpiPersonagemPreferido(req, res); 
});

module.exports = router;