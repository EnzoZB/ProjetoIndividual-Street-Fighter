var express = require("express");
var router = express.Router();

var rivalController = require("../controllers/rivalController");

router.get("/kpi-maior-fregues/:idUsuario", function (req, res) {
    rivalController.buscarKpiMaiorFregues(req, res);
});

module.exports = router;