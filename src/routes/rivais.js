var express = require("express");
var router = express.Router();

var rivalController = require("../controllers/rivalController");

router.get("/kpi-maior-fregues/:idUsuario", function (req, res) {
    rivalController.buscarKpiMaiorFregues(req, res);
});

router.get("/kpi-pior-algoz/:idUsuario", function (req, res) {
    rivalController.buscarKpiPiorAlgoz(req, res);
});

router.get("/grafico-rivais-rosca/:idUsuario", function (req, res) {
    rivalController.buscarTop5Rivais(req, res);
});

router.get("/grafico-rivais-barras/:idUsuario", function (req, res) {
    rivalController.buscarTop5RivaisBarras(req, res);
});

module.exports = router;