
// Adiciona Eventos de open-close nos menus-laterais
document.querySelector("#menu-botao-toggler").addEventListener("click", ()=>{
    document.querySelector("#menu-barra-lateral").classList.toggle("open");
    document.querySelector("#menu-botao-toggler").classList.toggle("open");
    document.querySelector("#filtro-barra-lateral").classList.remove("open");
});


// Adiciona Eventos de open-close nos cards de legenda
document.querySelector("#card").addEventListener("click", ()=>{
    document.querySelector("#card").classList.toggle("open");
    document.querySelector("#card-header").classList.toggle("open");
    document.querySelector("#card-content").classList.toggle("open");
});

// Adiciona eventos de abrir filtros com o botao do filtro
document.getElementById("menu-botao-evento-filtro").addEventListener("click", () => {
    document.querySelector("#menu-barra-lateral").classList.remove("open");
    document.querySelector("#menu-botao-toggler").classList.remove("open");
    document.querySelector("#filtro-barra-lateral").classList.toggle("open");
});


// Adiciona eventos de fechar filtros
document.querySelector("#filtro-campo-logo").addEventListener("click", () => {
    document.querySelector("#filtro-barra-lateral").classList.remove("open");
});


// Adiciona onClick Events nos botoes do menu da esquerda
const tiposBotoesComEvent = ['sinalizacao', 'defensa', 'defeito', 'posto', 'gasolina', 'semaforo', 'pardal', 'iluminacao', 'drenagem'];
for (var i=0; i<tiposBotoesComEvent.length; i++) {
    const tipoAtual = tiposBotoesComEvent[i];
    const botao = document.getElementById('menu-botao-evento-' + tipoAtual);
    botao.addEventListener("click", ()=>{
        document.querySelector("#filtro-tipo").value = tipoAtual;
        atualizaCardLegenda();
        limpaMarcadores();
        buscaValoresFiltros();
        const path = constroiLinkRequisicao(tipoAtual);
        getJsonAndPlot(path);
    });
}

// Adiciona OnClick Event no botao de Filtro
document.getElementById('filtro-botao').addEventListener("click", ()=>{
    atualizaCardLegenda();
    limpaMarcadores();
    buscaValoresFiltros();
    const path = constroiLinkRequisicao(tipo);
    getJsonAndPlot(path);
});

// Limpa o Card de Legenda e atualizar o seu titulo
function atualizaCardLegenda() {
    let title = tipo.toUpperCase();
    if (tipo == 'defensa' || tipo == 'drenagem')
        title += ' (metros)';
    else
        title += ' (unid.)';
    document.getElementById('card-content-title').innerHTML = title;
    for (var i=0; i<9; i++)
        document.getElementById('card-content-' + i).innerHTML = "";
    document.getElementById('card-legenda').style.display = "inline";
}


// Atualiza parametros da requisicao com parametros do filtro
function buscaValoresFiltros() {
    tipo = document.querySelector("#filtro-tipo").value;
    condicao = document.querySelector("#filtro-condicao").value;
    uf = document.querySelector("#filtro-uf").value;
    br = document.querySelector("#filtro-br").value;
    kmi = document.querySelector("#filtro-kmi").value*1000;
    kmf = document.querySelector("#filtro-kmf").value*1000;
    maxPontos = document.querySelector("#filtro-pontos").value;
}


// Montar a Requisição REST a ser feita para o servidor 
function constroiLinkRequisicao(tipo) {
    let path = home + tipo + "/?";
    if (nome != null && nome != '')
        path += "nome=" + nome + "&";
    if (condicao != null && condicao != '')
        path += "condicao=" + condicao + "&";
    if (uf != null && uf != '')
        path += "uf=" + uf + "&";
    if (br != null && br != '')
        path += "br=" + br + "&";
    if (km != null && km != '')
        path += "km=" + km + "&";
    if (kmi != null && kmi != '')
        path += "kmi=" + kmi + "&";
    if (kmf != null && kmf != '')
        path += "kmf=" + kmf + "&";
    path = path.slice(0, -1);
    console.log(path)
    return path
}