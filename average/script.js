function start() {
    var divText = document.getElementById("container");

var page2 = "<h1>Calculadora de Média</h1>\n" +
    "<select id='media'>\n" +
        "<option value='' selected>Selecione a Média\n" +
        "<option value='01'>Média Aritmética\n" +
        "<option value='02'>Média Ponderada\n" +
        "<option value='03'>Média Harmônica\n" +
    "</select><br><br><br>\n" +
    "<button onclick='start()'>Começar</button>";

    divText.innerHTML = page2;
}