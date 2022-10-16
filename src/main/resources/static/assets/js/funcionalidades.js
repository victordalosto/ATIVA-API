// Atualiza parametros da requisicao com parametros do filtro
function atualizaParamsPeloFiltro(tipoAtual) {
    if (tipoAtual != "" && tipoAtual != null && tipo != undefined) {
        tipo = tipoAtual;
        document.getElementById("filtro-tipo").value = tipoAtual; // atualiza pagina filtro
    } else {
        tipo = document.getElementById("filtro-tipo").value;
    }
    condicao = document.getElementById("filtro-condicao").value;
    uf = document.getElementById("filtro-uf").value;
    br = document.getElementById("filtro-br").value;
    nome = "";
    km = "";
    kmi = document.getElementById("filtro-kmi").value*1000;
    kmf = document.getElementById("filtro-kmf").value*1000;
    maxPontos = document.getElementById("filtro-pontos").value;
}


// Montar a Requisição REST a ser feita para o servidor 
function constroiLinkRequisicao() {
    let path = home.concat(tipo, "/?");
    if (nome != "")
        path = path.concat("nome=", nome, "&");
    if (condicao != "")
        path = path.concat("condicao=", condicao, "&");
    if (uf != "")
        path = path.concat("uf=", uf, "&");
    if (br != "")
        path = path.concat("br=", br, "&");
    if (km != "")
        path = path.concat("km=", km, "&");
    if (kmi != "" && kmi != 0)
        path = path.concat("kmi=", kmi, "&");
    if (kmf != null && kmf != "")
        path = path.concat("kmf=", kmf, "&");
    path = path.slice(0, -1);
    return path
}


// Atualiza o Card de legendas com o titulo e quantitativo dos marcadores
function atualizaCardLegendas(ocorrencias) {
    ocorrencias = ocorrencias.reduce(function (acc, curr) {return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc}, {});
    const keys = Object.keys(ocorrencias);
    const values = Object.values(ocorrencias);
    const qtdElementosNoCard = 9;
    for (var i=0; i<qtdElementosNoCard; i++) {
        if (i < keys.length)
            document.getElementById("card-content-" + i).innerHTML = keys[i][0].toUpperCase() + keys[i].substring(1).toLowerCase() + ":  " + values[i];
        else
            document.getElementById("card-content-" + i).innerHTML = "";
    }
    if (tipo == "defensa" || tipo == "drenagem")
        document.getElementById("card-content-title").innerHTML = tipo.toUpperCase() + " (metros)";
    else
        document.getElementById("card-content-title").innerHTML = tipo.toUpperCase() + " (unid.)";
    document.getElementById("card-content").style.setProperty("--card-altura", 32 + 28*keys.length + "px");
    document.getElementById("card-legenda").style.display = "inline";
}