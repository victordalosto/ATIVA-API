# ATIVA - API
Essa API utiliza o Google maps API para localizar e imprimir no mapa os dados produzidos pela API [ATIVA-REST](https://github.com/victordalosto/ATIVA-REST/), disponibilizando de maneira visual os dados dos ativos rodoviários do DNIT. <br/><br/>

## O programa
A interface web do programa foi desenvolvida para plotar os ativos baseando-se em sua categoria, bem como os seus respectivos filtros. <br/>
A imagem a seguir mostra a tela do programa printando os dados de sinalização vertical do Brasil:

![tela-inicial](https://github.com/victordalosto/ATIVA-API/blob/master/documentation/assets/figura1-TelaPrincipal.PNG?raw=true)

Os ativos podem ser filtrados considerando as informações rodoviárias ou dados relacionadas a própria categoria, conforme mostra a figura a seguir:

![tela-filtro](https://github.com/victordalosto/ATIVA-API/blob/master/documentation/assets/figura2-TelaFiltro.PNG?raw=true)

Todo o design da página foi carinhosamente desenvolvida pela maravilhosa [Rebeca maria](https://www.linkedin.com/in/rebeca-maria-b977951a6/) :heart:

![tela-menu](https://github.com/victordalosto/ATIVA-API/blob/master/documentation/assets/figura3-TelaMenu.PNG?raw=true)



## Para saber mais
A [API REST](https://github.com/victordalosto/ATIVA-REST/) desse programa foi desenvolvida em JAVA usando as frameworks do **SPRING**, como a *SPRING DATA JPA* para fazer as comunicações com os banco de dados. <br/>
As páginas web foram inicialmente desenvolvidas para rodar no lado do servidor utilizando **Thymeleaf**, no entanto, por razões técnicas, foi adaptada para rodar no lado do cliente fazendo-se as migrações do código para **JavaScript**.

### Sobre
Duvidas ou sugestões podem ser encaminhadas para: `victordalosto@gmail.com`
