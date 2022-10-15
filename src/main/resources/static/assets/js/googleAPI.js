
// Variaveis de inicializacao
let map;
let nome = condicao = uf = br = km = kmi = kmf = null;
let maxPontos = 25;
const marcadores = [];
const informacoesMarcadores = [];
const home = "http://localhost/api/";

uf='DF';

// Chama a API do Google Maps
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {zoom: 4.3, center: {lat: -15.789, lng: -60.8751}});
}


// Busca os pontos da requisicao REST e plota no mapa
function getJsonAndPlot(requisicaoRest) {
    (async () => {
        const lista = await getJson()
        atualizaMarcadoresELegenda(lista);
    })()
    async function getJson() {
        return await (await fetch(requisicaoRest)).json();
    }
}


//Adiciona os marcadores no mapa
function atualizaMarcadoresELegenda(lista) {
    let ocorrencias = []
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
                    "<p>Condicao: ", ((item.condicao === null || item.condicao === undefined) ? "N/A" : item.condicao),
                    "<p>KM: ", (item.km / 1000), "</p>",
                    "<p>UF: ", item.uf, "</p>",
                    "<p>BR: ", item.br, "</p>")
            });

            marker.addListener('click', function () {
                fechaInformacaoMarcador();
                infowindow.open(marker.get('map'), marker);
                informacoesMarcadores[0] = infowindow;
            });

            marcadores.push(marker);
        }
        lista.splice(i, 1); // Remove ultimo item do array
    }
    atualizaCardLegendas(ocorrencias);
}


// Atualiza o Card de legendas com o quantitativo dos marcadores
document.getElementById('card-content').style.setProperty('--card-altura', '10px');
function atualizaCardLegendas(ocorrencias) {
    ocorrencias = ocorrencias.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
      }, {});
    const keys = Object.keys(ocorrencias);
    const values = Object.values(ocorrencias);
    // 9 = 285
    for (var i=0; i<keys.length; i++) {
        const tipo =  keys[i][0].toUpperCase() + keys[i].substring(1).toLowerCase();
        document.getElementById('card-content-' + i).innerHTML = tipo + ":  " + values[i];
    }
    document.getElementById('card-content').style.setProperty('--card-altura', 32 + 28*keys.length + "px");
}


// Fecha o Pop-up criado ao clicar em um marcador
function fechaInformacaoMarcador() {
    if (informacoesMarcadores.length > 0) {
        informacoesMarcadores[0].set("marker", null);
        informacoesMarcadores[0].close();
        informacoesMarcadores.length = 0;
    }
}


// Limpar os marcadores do mapa
function limpaMarcadores() {
    for (var i = 0; i < marcadores.length; i++) {
        marcadores[i].setMap(null);
    }
    marcadores.length = 0;
}


window.initMap = initMap;
