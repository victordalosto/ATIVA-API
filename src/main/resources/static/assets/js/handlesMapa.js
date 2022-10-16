// Variaveis de inicializacao
let map;
let tipo, nome, condicao, uf, br, km, kmi, kmf, maxPontos;
var threadSinaleira = 0;
const marcadores = [];
const informacoesMarcadores = [];
const home = "http://localhost/api/";


// Chama a API do Google Maps
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {zoom: 4.3, center: {lat: -15.789, lng: -60.8751}});
}


// Rotina usada para plotar pontos no Mapa - Thread Safe
function rotinaPlotarPontos(tipoAtual) {
    if (++threadSinaleira == 1) {
        atualizaParamsPeloFiltro(tipoAtual);
        const requisicaoRest = constroiLinkRequisicao();
        limpaMarcadores();
        (async () => {
            const lista = await getJson();
            const ocorrencias = atualizaMarcadores(lista);
            atualizaCardLegendas(ocorrencias);
            threadSinaleira = 0;
        })()
        async function getJson() {
            return await (await fetch(requisicaoRest)).json();
        }
    }
}


// Limpar os marcadores do mapa
function limpaMarcadores() {
    for (var i = 0; i < marcadores.length; i++) {
        marcadores[i].setMap(null);
    }
    marcadores.length = 0;
}


// Adiciona os marcadores no mapa
function atualizaMarcadores(lista) {
    const ocorrencias = []
    for (let i = lista.length - 1; i >= 0; i--) {
        item = lista[i];
        ocorrencias.push(item.nome);
        if (i<maxPontos) {
            const marker = new google.maps.Marker({
                position: { lat: item.y, lng: item.x },
                map: map,
            });

            const infowindow = new google.maps.InfoWindow({
                content: "".concat("<h4>", item.nome, "</h4>",
                         "<p>KM: ", (item.km / 1000), "</p>",
                         "<p>UF: ", item.uf, "</p>",
                         "<p>BR: ", item.br, "</p>",
                         "<p>Condicao: ", ((item.condicao === null || item.condicao === undefined) ? "N/A" : item.condicao))
            });

            marker.addListener("click", function () {
                fechaInformacaoMarcador();
                infowindow.open(marker.get("map"), marker);
                informacoesMarcadores[0] = infowindow;
            });

            marcadores.push(marker);
        }
        lista.splice(i, 1); // Remove ultimo item do array
    }
    return ocorrencias;
}


// Fecha o Pop-up criado ao clicar em um marcador
function fechaInformacaoMarcador() {
    if (informacoesMarcadores.length > 0) {
        informacoesMarcadores[0].set("marker", null);
        informacoesMarcadores[0].close();
        informacoesMarcadores.length = 0;
    }
}

window.initMap = initMap;