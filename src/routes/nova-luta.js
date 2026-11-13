var express = require("express");
var router = express.Router();

var nova_lutaController = require("../controllers/nova-lutaController");


router.post("/cadastrar", function (req, res) {

    nova_lutaController.cadastrar(req, res);
});

module.exports = router;