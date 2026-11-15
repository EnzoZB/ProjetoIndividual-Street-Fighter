var partidaModel = require("../models/partidaModel");

function buscarKpiPersonagemPreferido(req, res) {

    var idUsuarioLogado = req.params.idUsuario;

    partidaModel.buscarKpiPersonagemPreferido(idUsuarioLogado)
        .then(function(resultadoBancoDados) { 

            // Validamos se veio algo do banco.
            if (resultadoBancoDados.length > 0) {
                res.status(200).json(resultadoBancoDados[0]);
            } else {
                res.status(204).send("Nenhuma partida encontrada para este usuário.");
            }
        }).catch(function(erroBancoDados) { 
            console.log(erroBancoDados);
            res.status(500).json(erroBancoDados.sqlMessage); 
        });
}


module.exports = { 
    buscarKpiPersonagemPreferido
}