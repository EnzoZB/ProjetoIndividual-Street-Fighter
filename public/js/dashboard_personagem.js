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

function buscarDadosGraficoRosca() {
    var idUsuarioLogado = sessionStorage.ID_USUARIO || 1;

    fetch(`/partidas/grafico-rosca-pers/${idUsuarioLogado}`)
        .then(function (respostaBackEnd) {
            if (respostaBackEnd.ok) {

                respostaBackEnd.json().then(function (dadosGrafico) {
                    
                    var labelsPersonagens = [];
                    var dadosQuantidade = [];

                    for (var i = 0; i < dadosGrafico.length; i++) {
                        var registro = dadosGrafico[i];
                        
                        labelsPersonagens.push(registro.nome_personagem);
                        dadosQuantidade.push(registro.qtd_lutas);
                    }

                    desenharGraficoRosca(labelsPersonagens, dadosQuantidade);

                });
            } else if (respostaBackEnd.status == 204) {
                console.log("Nenhuma partida encontrada para montar o gráfico de rosca.");
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (erroDeRede) {
            console.error(`Erro na requisição do Gráfico de Rosca: ${erroDeRede.message}`);
        });
}

// Variável global para guardar a instância do gráfico e evitar sobreposição
var graficoRoscaAtual = null;

function desenharGraficoRosca(labelsPersonagens, dadosQuantidade) {

    var elementoCanvas = document.getElementById('graficoElenco');
    var ctx = elementoCanvas.getContext('2d');

    graficoRosca = new Chart(ctx, {
        type: 'doughnut', 
        data: {
            labels: labelsPersonagens,
            datasets: [{
                label: 'Total de Lutas',
                data: dadosQuantidade,
                
                backgroundColor: [
                    '#E63946',
                    '#457B9D', 
                    '#F4A261', 
                    '#2A9D8F',
                    '#8338EC'  
                ],

                borderColor: '#121212', 
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff', 
                        padding: 20,
                        font: {
                            family: "'Arial', sans-serif",
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

window.onload = function () {
    carregarKpiPersonagemPreferido();
    carregarKpiWinRate();
    carregarKpiNemesis();
    buscarDadosGraficoRosca();
};