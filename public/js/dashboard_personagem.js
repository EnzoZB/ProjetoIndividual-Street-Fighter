function carregarKpiPersonagemPreferido() {

    var idUsuarioLogado = sessionStorage.ID_USUARIO || 1;

    fetch(`/partidas/kpi-personagem-preferido/${idUsuarioLogado}`)
        .then(function (respostaBackEnd) {
            if (respostaBackEnd.ok) {

                respostaBackEnd.json().then(function (dadosKpi) {

                    var nomePreferido = dadosKpi.nomePersonagemPreferido;
                    var totalPartidas = dadosKpi.qtdPartidasTotal;
                    var totalVitorias = dadosKpi.qtdVitorias;
                    var totalDerrotas = dadosKpi.qtdDerrotas;


                    document.getElementById('kpi-preferido-nome').innerText = nomePreferido;
                    document.getElementById('kpi-preferido-partidas').innerText = totalPartidas;


                    var textoVitoriasDerrotas = `${totalVitorias}/${totalDerrotas}`;
                    document.getElementById('kpi-preferido-vd').innerText = textoVitoriasDerrotas;

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (erroDeRede) {
            console.error(`Erro na requisição: ${erroDeRede.message}`);
        });
}

function carregarKpiWinRate() {

    var idUsuarioLogado = sessionStorage.ID_USUARIO || 1;

    fetch(`/partidas/kpi-winrate/${idUsuarioLogado}`)
        .then(function (respostaBackEnd) {
            if (respostaBackEnd.ok) {

                respostaBackEnd.json().then(function (dadosKpi) {

                    var totalPartidas = dadosKpi.qtdPartidasTotal;
                    var totalVitorias = dadosKpi.qtdVitorias;
                    var totalDerrotas = dadosKpi.qtdDerrotas;

                    var calculo = (totalVitorias / totalPartidas) * 100;

                    var porcentagemWinRate = 0;
                    if (totalPartidas > 0) {
                        porcentagemWinRate = calculo.toFixed(0);
                    }

                    document.getElementById('kpi-winrate-valor').innerText = porcentagemWinRate + '%';
                    document.getElementById('kpi-winrate-vitorias').innerText = totalVitorias;
                    document.getElementById('kpi-winrate-derrotas').innerText = totalDerrotas;

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (erroDeRede) {
            console.error(`Erro na requisição do Win Rate: ${erroDeRede.message}`);
        });
}

function carregarKpiNemesis() {
    var idUsuarioLogado = sessionStorage.ID_USUARIO || 1;

    fetch(`/partidas/kpi-nemesis/${idUsuarioLogado}`)
        .then(function (respostaBackEnd) {
            if (respostaBackEnd.ok) {
            
                respostaBackEnd.json().then(function (dadosKpi) {
    
                    var nomeNemesis = dadosKpi.nemesis;
                    var totalDerrotas = dadosKpi.total_derrotas;

                    document.getElementById('kpi-nemesis-nome').innerText = nomeNemesis;
                    document.getElementById('kpi-nemesis-derrotas').innerText = totalDerrotas;
                });
            } else if (respostaBackEnd.status == 204) {

                document.getElementById('kpi-nemesis-nome').innerText = "NENHUM";
                document.getElementById('kpi-nemesis-derrotas').innerText = "0";
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (erroDeRede) {
            console.error(`Erro na requisição do Nêmesis: ${erroDeRede.message}`);
        });
}

window.onload = function () {
    carregarKpiPersonagemPreferido();
    carregarKpiWinRate();
    carregarKpiNemesis();
};