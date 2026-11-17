var database = require("../database/config");

function cadastrar(resultado, rival, personagem1, personagem2, dataPartida, idUsuario) {
    
    var instrucao = `
        INSERT INTO luta (resultado, fkPersonagem_seu, fkPersonagem_rival, data_partida, fkUsuario) 
        VALUES ('${resultado}', '${personagem1}', '${personagem2}', '${dataPartida}', '${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};