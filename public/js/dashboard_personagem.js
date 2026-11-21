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

    if (graficoRoscaAtual) {
        graficoRoscaAtual.destroy();
    }

    graficoRoscaAtual = new Chart(ctx, {
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

// function buscarDadosGraficoLinhas() {
//     var idUsuarioLogado = sessionStorage.ID_USUARIO || 1;

//     fetch(`/partidas/grafico-vitorias/${idUsuarioLogado}`)
//         .then(function (respostaBackEnd) {
//             if (respostaBackEnd.ok) {
//                 respostaBackEnd.json().then(function (respostaJson) {
//                     console.log("Dados do gráfico de linhas:", respostaJson);

//                     var mesesUnicos = [];
//                     for (var i = 0; i < respostaJson.length; i++) {
//                         var mes = respostaJson[i].mes_ano;
//                         if (mesesUnicos.indexOf(mes) == -1) {
//                             mesesUnicos.push(mes);
//                         }
//                     }

//                     var personagensUnicos = [];
//                     for (var i = 0; i < respostaJson.length; i++) {
//                         var pers = respostaJson[i].nome_personagem;
//                         if (personagensUnicos.indexOf(pers) == -1) {
//                             personagensUnicos.push(pers);
//                         }
//                     }

//                     var listaDatasets = [];
//                     var coresLinhas = ['#E63946', '#457B9D', '#F4A261', '#2A9D8F', '#8338EC'];

//                     for (var p = 0; p < personagensUnicos.length; p++) {
//                         var nomePersonagem = personagensUnicos[p];
//                         var dadosPorMes = [];

//                         for (var m = 0; m < mesesUnicos.length; m++) {
//                             var mesAtual = mesesUnicos[m];
//                             var qtdVitoriasNoMes = 0;

//                             for (var j = 0; j < respostaJson.length; j++) {
//                                 if (respostaJson[j].mes_ano == mesAtual && respostaJson[j].nome_personagem == nomePersonagem) {
//                                     qtdVitoriasNoMes = respostaJson[j].qtd_vitorias;
//                                 }
//                             }
//                             dadosPorMes.push(qtdVitoriasNoMes);
//                         }

//                         listaDatasets.push({
//                             label: nomePersonagem,
//                             data: dadosPorMes,
//                             borderColor: coresLinhas[p % coresLinhas.length],
//                             backgroundColor: coresLinhas[p % coresLinhas.length],
//                             borderWidth: 3,
//                             tension: 0.1 // Deixa a linha levemente curva (suave)
//                         });
//                     }

//                     desenharGraficoLinhas(mesesUnicos, listaDatasets);

//                 });
//             } else if (respostaBackEnd.status == 204) {
//                 console.log("Nenhum dado encontrado para o termômetro de vitórias.");
//             } else {
//                 console.error('Erro na API do gráfico de linhas');
//             }
//         })
//         .catch(function (erroDeRede) {
//             console.error(`Erro de rede: ${erroDeRede.message}`);
//         });
// }

// var graficoLinhasAtual = null;

// function desenharGraficoLinhas(mesesLabels, datasetsProntos) {
//     var elementoCanvas = document.getElementById('graficoVitorias');
//     var ctx = elementoCanvas.getContext('2d');

//     if (graficoLinhasAtual != null) {
//         graficoLinhasAtual.destroy();
//     }

//     graficoLinhasAtual = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: mesesLabels,
//             datasets: datasetsProntos 
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//                 legend: {
//                     position: 'bottom',
//                     labels: {
//                         color: '#ffffff',
//                         font: { size: 12 }
//                     }
//                 }
//             },
//             scales: {
//                 x: {
//                     ticks: { color: '#b0bac2' },
//                     grid: { color: '#222222' }
//                 },
//                 y: {
//                     ticks: { color: '#b0bac2', precision: 0 },
//                     grid: { color: '#222222' }
//                 }
//             }
//         }
//     });
// }


window.onload = function () {
    carregarKpiPersonagemPreferido();
    carregarKpiWinRate();
    carregarKpiNemesis();
    buscarDadosGraficoRosca();
    buscarDadosGraficoLinhas()
};