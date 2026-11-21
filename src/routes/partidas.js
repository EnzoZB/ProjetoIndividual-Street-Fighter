var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

// O ":idUsuario" é para sabermos de qual jogador puxar os dados
router.get("/kpi-personagem-preferido/:idUsuario", function (req, res) { 
    // Repassa a requisição para a função específica da Controller
    partidaController.buscarKpiPersonagemPreferido(req, res); 
});

router.get("/kpi-winrate/:idUsuario", function (req, res) {
    partidaController.buscarKpiWinRate(req,res);
});

router.get("/kpi-nemesis/:idUsuario", function (req, res) {
    partidaController.buscarKpiNemesis(req, res);
});

router.get("/grafico-rosca-pers/:idUsuario", function (req, res) {
    partidaController.buscarTop5Rosca(req, res);
});

router.get("/grafico-vitorias/:idUsuario", function (req, res) {
    partidaController.buscarVitoriasPorMes(req, res);
});

module.exports = router;