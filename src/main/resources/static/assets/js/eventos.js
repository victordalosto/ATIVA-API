
// Adiciona Eventos de open-close nos menus-laterais
document.querySelector("#menu-botao-toggler").addEventListener("click", ()=>{
    document.querySelector("#menu-barra-lateral").classList.toggle("open");
    document.querySelector("#menu-botao-toggler").classList.toggle("open");
});


// Adiciona Eventos de open-close nos cards de legenda
document.querySelector("#card").addEventListener("click", ()=>{
    document.querySelector("#card").classList.toggle("open");
    document.querySelector("#card-header").classList.toggle("open");
    document.querySelector("#card-content").classList.toggle("open");
});


// Adiciona onClick Events nos botoes do menu da esquerda
const tiposBotoesComEvent = ['sinalizacao', 'defensa', 'defeito', 'posto', 'gasolina', 'semaforo', 'pardal', 'iluminacao', 'drenagem'];
for (var i=0; i<tiposBotoesComEvent.length; i++) {
    const tipo = tiposBotoesComEvent[i];
    var botao = document.getElementById('menu-botao-evento-' + tipo);
    botao.addEventListener("click", ()=>{
        atualizaCardLegenda(tipo);
        limpaMarcadores();
        const path = constroiLinkRequisicao(tipo);
        getJsonAndPlot(path);
    });
}


// Limpa o Card de Legenda e atualizar o seu titulo
function atualizaCardLegenda(log) {
    let title = log.toUpperCase();
    if (log == 'defensa' || log == 'drenagem')
        title += ' (metros)'
    else
        title += ' (unid.)'
    document.getElementById('card-content-title').innerHTML = title;
    for (var i=0; i<9; i++)
        document.getElementById('card-content-' + i).innerHTML = "";
}


// Montar a Requisição REST a ser feita para o servidor 
function constroiLinkRequisicao(tipo) {
    let path = home + tipo + "/?";
    if (nome != null)
        path += "nome=" + nome + "&";
    if (condicao != null)
        path += "condicao=" + condicao + "&";
    if (uf != null)
        path += "uf=" + uf + "&";
    if (br != null)
        path += "br=" + br + "&";
    if (km != null)
        path += "km=" + km + "&";
    if (kmi != null)
        path += "kmi=" + kmi + "&";
    if (kmf != null)
        path += "kmf=" + kmf;
    return path
}