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

window.onload = function () {
    carregarKpiMaiorFregues();
    carregarKpiPiorAlgoz();
};