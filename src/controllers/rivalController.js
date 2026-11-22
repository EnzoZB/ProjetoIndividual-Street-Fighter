var rivalModel = require("../models/rivalModel");

function buscarKpiMaiorFregues(req, res) {
    var idUsuarioLogado = req.params.idUsuario;

    rivalModel.buscarKpiMaiorFregues(idUsuarioLogado)
        .then(function (resultadoBancoDados) {
            if (resultadoBancoDados.length > 0) {
                res.status(200).json(resultadoBancoDados[0]);
            } else {
                res.status(204).send("Nenhuma partida encontrada.");
            }
        }).catch(function (erroBancoDados) {
            console.log(erroBancoDados);
            res.status(500).json(erroBancoDados.sqlMessage);
        });
}

function buscarKpiPiorAlgoz(req, res) {
    var idUsuarioLogado = req.params.idUsuario;

    rivalModel.buscarKpiPiorAlgoz(idUsuarioLogado)
        .then(function (resultadoBancoDados) {
            if (resultadoBancoDados.length > 0) {
                res.status(200).json(resultadoBancoDados[0]);
            } else {
                res.status(204).send("Nenhuma partida encontrada.");
            }
        }).catch(function (erroBancoDados) {
            console.log(erroBancoDados);
            res.status(500).json(erroBancoDados.sqlMessage);
        });
}

function buscarTop5Rivais(req, res) {

    var idUsuarioLogado = req.params.idUsuario;

    rivalModel.buscarTop5Rivais(idUsuarioLogado)
        .then(function (resultadoBancoDados) {

            if (resultadoBancoDados.length > 0) {
                res.status(200).json(resultadoBancoDados);
            } else {
                res.status(204).send("Nenhuma partida encontrada para este usuário.");
            }
        }).catch(function (erroBancoDados) {
            console.log(erroBancoDados);
            res.status(500).json(erroBancoDados.sqlMessage);
        });
}

function buscarTop5RivaisBarras(req, res) {

    var idUsuarioLogado = req.params.idUsuario;

    rivalModel.buscarTop5RivaisBarras(idUsuarioLogado)
        .then(function (resultadoBancoDados) {

            if (resultadoBancoDados.length > 0) {
                res.status(200).json(resultadoBancoDados);
            } else {
                res.status(204).send("Nenhuma partida encontrada para este usuário.");
            }
        }).catch(function (erroBancoDados) {
            console.log(erroBancoDados);
            res.status(500).json(erroBancoDados.sqlMessage);
        });
}



module.exports = {
    buscarKpiMaiorFregues,
    buscarKpiPiorAlgoz,
    buscarTop5Rivais,
    buscarTop5RivaisBarras
}