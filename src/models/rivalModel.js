var database = require("../database/config");

function buscarKpiMaiorFregues(idUsuarioLogado) {
    var instrucaoSql = `
        SELECT u.nickname AS nomeFregues, COUNT(l.id) AS totalPartidasRival,
           SUM(CASE 
           WHEN l.resultado = 'Vitória' THEN 1 
           ELSE 0 
           END) AS totalVitoriasRival
        FROM luta l
             JOIN usuario u 
                  ON l.fkRival = u.id 
        WHERE l.fkUsuario = ${idUsuarioLogado}
        GROUP BY u.nickname
        ORDER BY totalVitoriasRival DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKpiMaiorFregues
};