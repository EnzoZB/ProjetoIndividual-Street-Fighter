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


window.onload = function() {
    carregarKpiPersonagemPreferido();
};