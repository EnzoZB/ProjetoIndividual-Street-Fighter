var database = require("../database/config");

function cadastrar(resultado, rival, personagem1, personagem2, dataPartida, idUsuario) {
    
    var instrucao = `
        INSERT INTO luta (resultado, nomeRival, fkPersonagem1, fkPersonagem2, data_partida, fkUsuario) 
        VALUES ('${resultado}', '${rival}', '${personagem1}', '${personagem2}', '${dataPartida}', '${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};