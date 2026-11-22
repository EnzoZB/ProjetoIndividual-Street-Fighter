function carregarKpiMaiorFregues() {
    var idUsuarioLogado = sessionStorage.ID_USUARIO || 1;

    fetch(`/rivais/kpi-maior-fregues/${idUsuarioLogado}`)
        .then(function (respostaBackEnd) {
            if (respostaBackEnd.ok) {
                respostaBackEnd.json().then(function (dadosKpi) {

                    var nomeFregues = dadosKpi.nomeFregues;
                    var totalPartidas = dadosKpi.totalPartidasRival;
                    var totalVitorias = dadosKpi.totalVitoriasRival;

                    var porcentagemWinRate = 0;
                    if (totalPartidas > 0) {
                        var calculo = (totalVitorias / totalPartidas) * 100;
                        porcentagemWinRate = calculo.toFixed(0);
                    }

                    document.getElementById('kpi-fregues-nome').innerText = nomeFregues;
                    document.getElementById('kpi-fregues-vitorias').innerText = totalVitorias;
                    document.getElementById('kpi-fregues-aproveitamento').innerText = porcentagemWinRate + '%';
                });
            } else if (respostaBackEnd.status == 204) {
                document.getElementById('kpi-fregues-nome').innerText = "NENHUM";
                document.getElementById('kpi-fregues-vitorias').innerText = "0";
                document.getElementById('kpi-fregues-aproveitamento').innerText = "0%";
            }
        })
        .catch(function (erroDeRede) {
            console.error(`Erro na requisição: ${erroDeRede.message}`);
        });
}

function carregarKpiPiorAlgoz() {
    var idUsuarioLogado = sessionStorage.ID_USUARIO || 1;

    fetch(`/rivais/kpi-pior-algoz/${idUsuarioLogado}`)
        .then(function (respostaBackEnd) {
            if (respostaBackEnd.status == 204) {
                document.getElementById('kpi-pior-algoz').innerText = "NENHUM";
                document.getElementById('kpi-algoz-derrotas').innerText = "0";
                document.getElementById('kpi-algoz-aproveitamento').innerText = "0%";
            } else if (respostaBackEnd.ok) {
                respostaBackEnd.json().then(function (dadosKpi) {

                    var nomeAlgoz = dadosKpi.nomeAlgoz;
                    var totalPartidas = dadosKpi.totalPartidasRival;
                    var totalDerrotasRival = dadosKpi.totalDerrotasRival;

                    var porcentagemWinRate = 0;
                    if (totalPartidas > 0) {
                        var totalVitoriasContraAlgoz = totalPartidas - totalDerrotasRival;
                        var calculo = (totalVitoriasContraAlgoz / totalPartidas) * 100;
                        porcentagemWinRate = calculo.toFixed(0);
                    }

                    document.getElementById('kpi-pior-algoz').innerText = nomeAlgoz;
                    document.getElementById('kpi-algoz-derrotas').innerText = totalDerrotasRival;
                    document.getElementById('kpi-algoz-aproveitamento').innerText = porcentagemWinRate + '%';
                });
            }
        })
        .catch(function (erroDeRede) {
            console.error(`Erro na requisição: ${erroDeRede.message}`);
        });
}

function buscarDadosGraficoRosca() {
    var idUsuarioLogado = sessionStorage.ID_USUARIO || 1;

    fetch(`/rivais/grafico-rivais-rosca/${idUsuarioLogado}`)
        .then(function (respostaBackEnd) {
            if (respostaBackEnd.ok) {

                respostaBackEnd.json().then(function (dadosGrafico) {
                    
                    var labelsRivais = [];
                    var dadosQuantidade = [];

                    for (var i = 0; i < dadosGrafico.length; i++) {
                        var registro = dadosGrafico[i];
                        
                        labelsRivais.push(registro.nomeRivais);
                        dadosQuantidade.push(registro.totalPartidasRival);
                    }

                    desenharGraficoRoscaRival(labelsRivais, dadosQuantidade);

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

var graficoRoscaAtual = null;

function desenharGraficoRoscaRival(labelsRivais, dadosQuantidade) {

    var elementoCanvas = document.getElementById('graficoFrequenciaPartidas');
    var ctx = elementoCanvas.getContext('2d');

    if (graficoRoscaAtual) {
        graficoRoscaAtual.destroy();
    }

    graficoRoscaAtual = new Chart(ctx, {
        type: 'doughnut', 
        data: {
            labels: labelsRivais,
            datasets: [{
                label: 'Top 5 Rivais',
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

function buscarDadosGraficoBarras() {
    var idUsuarioLogado = sessionStorage.ID_USUARIO || 1;

    fetch(`/rivais/grafico-rivais-barras/${idUsuarioLogado}`)
        .then(function (respostaBackEnd) {
            if (respostaBackEnd.status == 204) {
                console.log("Nenhuma partida encontrada para o gráfico de barras.");
            } else if (respostaBackEnd.ok) {
                respostaBackEnd.json().then(function (dadosGrafico) {

                    var labelsRivais = [];
                    var dadosVitorias = [];
                    var dadosDerrotas = [];

                    for (var i = 0; i < dadosGrafico.length; i++) {
                        var registro = dadosGrafico[i];

                        labelsRivais.push(registro.nomeRivais);
                        dadosVitorias.push(registro.totalVitoriasRival);
                        dadosDerrotas.push(registro.totalDerrotasRival);
                    }

                    desenharGraficoBarras(labelsRivais, dadosVitorias, dadosDerrotas);
                });
            } else {
                console.error('Erro na API do gráfico de barras');
            }
        })
        .catch(function (erroDeRede) {
            console.error(`Erro na requisição do Gráfico de Barras: ${erroDeRede.message}`);
        });
}

var graficoBarrasAtual = null;

function desenharGraficoBarras(labelsRivais, dadosVitorias, dadosDerrotas) {
    var elementoCanvas = document.getElementById('graficoConfrontoDireto');
    var ctx = elementoCanvas.getContext('2d');

    if (graficoBarrasAtual) {
        graficoBarrasAtual.destroy();
    }

    graficoBarrasAtual = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelsRivais,
            datasets: [
                {
                    label: 'Minhas Vitórias',
                    data: dadosVitorias,
                    backgroundColor: '#3B82F6', 
                    borderWidth: 0
                },
                {
                    label: 'Derrotas',
                    data: dadosDerrotas,
                    backgroundColor: '#E63946', 
                    borderWidth: 0
                }
            ]
        },
        options: {
            indexAxis: 'y', 
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
            },
            scales: {
                x: {
                    ticks: {
                        color: '#b0bac2',
                        precision: 0 
                    },
                    grid: {
                        color: '#222222'
                    }
                },
                y: {
                    ticks: {
                        color: '#ffffff',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: '#222222'
                    }
                }
            }
        }
    });
}

window.onload = function () {
    carregarKpiMaiorFregues();
    carregarKpiPiorAlgoz();
    buscarDadosGraficoRosca();
    buscarDadosGraficoBarras();
};