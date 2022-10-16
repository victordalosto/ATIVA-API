// Adiciona Evento de open-close no menu-lateral
document.getElementById("menu-botao-toggler").addEventListener("click", ()=>{
    document.getElementById("menu-barra-lateral").classList.toggle("open");
    document.getElementById("filtro-barra-lateral").classList.remove("open");
});


// Adiciona evento de abrir filtros com o botao do filtro
document.getElementById("menu-botao-evento-filtro").addEventListener("click", () => {
    document.getElementById("menu-barra-lateral").classList.remove("open");
    document.getElementById("filtro-barra-lateral").classList.toggle("open");
});


// Adiciona evento de fechar filtro
document.getElementById("filtro-campo-logo").addEventListener("click", () => {
    document.getElementById("filtro-barra-lateral").classList.remove("open");
});


// Adiciona Evento de open-close no cards de legenda
document.getElementById("card").addEventListener("click", ()=>{
    document.getElementById("card").classList.toggle("open");
});


// Adiciona OnClick Event no botao de Filtro para rodar plotagem
document.getElementById("filtro-botao").addEventListener("click", ()=>{
    rotinaPlotarPontos(null);
});


// Adiciona onClick Events nos botoes do menu da esquerda para rodar plotagem
(function() {
    const tiposBotoesComEvent = ["sinalizacao", "defensa", "defeito", "posto", 
                                 "gasolina", "semaforo", "pardal", "iluminacao", 
                                 "drenagem"];
    for (var i=0; i<tiposBotoesComEvent.length; i++) {
        const tipoAtual = tiposBotoesComEvent[i];
        const botao = document.getElementById("menu-botao-evento-" + tipoAtual);
        botao.addEventListener("click", ()=>{
            rotinaPlotarPontos(tipoAtual);
        });
    }
})()