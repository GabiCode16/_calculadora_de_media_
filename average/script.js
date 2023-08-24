var divText = document.getElementById("container");

function start() { 
    var page2 = "<h1>Calculadora de Média</h1>\n" +
    "<select id='media'>\n" +
        "<option value='' selected disabled>Selecione a Média\n" +
        "<option value='01'>Média Aritmética\n" +
        "<option value='02'>Média Ponderada\n" +
        "<option value='03'>Média Harmônica\n" +
    "</select><br><br><br>\n" +
    "<button onclick='select()'>Começar</button>";

    divText.innerHTML = page2;
}

function select() {
    var page3 = "<h1>Calculadora de Média</h1>\n\
    <select id='media'>\n\
    <option value='' selected disabled>Selecione o modo de avaliação\n\
    <option value='b'>Bimestre\n\
    <option value='t'>Trimestre\n\
    <option value='s'>Semestre\n\
    </select><br><br><br>\n\
    <button onclick='select2()'>Começar</button>";

    divText.innerHTML = page3;
}
