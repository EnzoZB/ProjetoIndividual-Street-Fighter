var database = require("../database/config");

function buscarKpiPersonagemPreferido(idUsuarioLogado) {
    var instrucaoSql = `
        SELECT 
            p.nome AS nomePersonagemPreferido, 
            COUNT(l.id) AS qtdPartidasTotal,
            
            -- Conta vitórias e derrotas baseadas na palavra salva na coluna 'resultado'
            SUM(CASE WHEN l.resultado = 'Vitória' THEN 1 ELSE 0 END) AS qtdVitorias,
            SUM(CASE WHEN l.resultado != 'Vitória' THEN 1 ELSE 0 END) AS qtdDerrotas
            
        FROM luta l
        JOIN personagem p ON l.fkPersonagem_seu = p.id
        WHERE l.fkUsuario = ${idUsuarioLogado}
        GROUP BY p.nome
        ORDER BY qtdPartidasTotal DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function buscarKpiWinRate(idUsuarioLogado) {
    var instrucaoSql = `
        SELECT COUNT(l.id) AS qtdPartidasTotal,
        SUM(CASE 
            WHEN l.resultado = 'Vitória' THEN 1 
            ELSE 0 
            END) AS qtdVitorias,
        SUM(CASE 
            WHEN l.resultado != 'Vitória' THEN 1 
            ELSE 0 
            END) AS qtdDerrotas
        FROM luta l
            JOIN personagem p 
                ON l.fkPersonagem_seu = p.id
                WHERE l.fkUsuario = ${idUsuarioLogado}; `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function buscarKpiNemesis(idUsuarioLogado) {
    var instrucaoSql = `
        SELECT p.nome AS nemesis, 
        COUNT(l.id) AS total_derrotas
        FROM luta l
            JOIN personagem p 
                ON l.fkPersonagem_rival = p.id
        WHERE 
            l.fkUsuario = ${idUsuarioLogado} AND l.resultado = 'Derrota' 
        GROUP BY p.nome
        ORDER BY total_derrotas DESC
        LIMIT 1;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKpiPersonagemPreferido,
    buscarKpiWinRate,
    buscarKpiNemesis
};

