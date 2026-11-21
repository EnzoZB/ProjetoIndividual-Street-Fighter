var partidaModel = require("../models/partidaModel");

function buscarKpiPersonagemPreferido(req, res) {

    var idUsuarioLogado = req.params.idUsuario;

    partidaModel.buscarKpiPersonagemPreferido(idUsuarioLogado)
        .then(function (resultadoBancoDados) {

            // Validamos se veio algo do banco.
            if (resultadoBancoDados.length > 0) {
                res.status(200).json(resultadoBancoDados[0]);
            } else {
                res.status(204).send("Nenhuma partida encontrada para este usuário.");
            }
        }).catch(function (erroBancoDados) {
            console.log(erroBancoDados);
            res.status(500).json(erroBancoDados.sqlMessage);
        });
}

function buscarKpiWinRate(req, res) {

    var idUsuarioLogado = req.params.idUsuario;

    partidaModel.buscarKpiWinRate(idUsuarioLogado)
        .then(function (resultadoBancoDados) {

            if (resultadoBancoDados.length > 0) {
                res.status(200).json(resultadoBancoDados[0]);
            } else {
                res.status(204).send("Nenhuma partida encontrada para este usuário.");
            }
        }).catch(function (erroBancoDados) {
            console.log(erroBancoDados);
            res.status(500).json(erroBancoDados.sqlMessage);
        });
}

function buscarKpiNemesis(req, res) {

    var idUsuarioLogado = req.params.idUsuario;

    partidaModel.buscarKpiNemesis(idUsuarioLogado)
        .then(function (resultadoBancoDados) {

            if (resultadoBancoDados.length > 0) {
                res.status(200).json(resultadoBancoDados[0]);
            } else {
                res.status(204).send("Nenhuma partida encontrada para este usuário.");
            }
        }).catch(function (erroBancoDados) {
            console.log(erroBancoDados);
            res.status(500).json(erroBancoDados.sqlMessage);
        });
}

function buscarTop5Rosca(req, res) {

    var idUsuarioLogado = req.params.idUsuario;

    partidaModel.buscarTop5Rosca(idUsuarioLogado)
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

function buscarVitoriasPorMes(req, res) {
    var idUsuarioLogado = req.params.idUsuario;

    partidaModel.buscarVitoriasPorMes(idUsuarioLogado)
        .then(function (resultadoBancoDados) {
            if (resultadoBancoDados.length > 0) {
                res.status(200).json(resultadoBancoDados);
            } else {
                res.status(204).send("Nenhuma vitória encontrada.");
            }
        }).catch(function (erroBancoDados) {
            console.log(erroBancoDados);
            res.status(500).json(erroBancoDados.sqlMessage);
        });
}


module.exports = {
    buscarKpiPersonagemPreferido,
    buscarKpiWinRate,
    buscarKpiNemesis,
    buscarTop5Rosca,
    buscarVitoriasPorMes
}