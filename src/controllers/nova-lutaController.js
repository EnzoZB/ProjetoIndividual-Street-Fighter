var nova_lutaModel = require("../models/nova-lutaModel");

function cadastrar(req, res) {

    var resultado = req.body.resultadoServer;
    var rival = req.body.rivalServer;
    var personagem1 = req.body.personagem1Server;
    var personagem2 = req.body.personagem2Server;
    var dataPartida = req.body.dataServer;
    
   
    var idUsuario = req.body.idUsuarioServer; 

    // Verificando se algum campo essencial está vazio
    if (resultado == undefined || rival == undefined || personagem1 == undefined || personagem2 == undefined || dataPartida == undefined) {
        res.status(400).send("Preencha todos os campos da luta!");
    } else {

        nova_lutaModel.cadastrar(resultado, rival, personagem1, personagem2, dataPartida, idUsuario)
            .then(function(resposta){
                res.status(200).send("Luta registrada com sucesso!");
            }).catch(function(erro){
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrar
}