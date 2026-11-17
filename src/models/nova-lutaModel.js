var database = require("../database/config");

function cadastrar(resultado, fkRival, personagem1, personagem2, dataPartida, idUsuario) {
    
    var instrucao = `
        INSERT INTO luta (resultado, fkRival, fkPersonagem_seu, fkPersonagem_rival, data_partida, fkUsuario) 
        VALUES ('${resultado}', ${fkRival}, ${personagem1}, ${personagem2}, '${dataPartida}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};