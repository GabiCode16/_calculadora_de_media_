var divText = document.getElementById("container");
var type;
var type2;
var pesosQtd;
var pesoClick = false;
var pesoTotal = 0;

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

    type = document.getElementById('media').value;

    if (type != '') {
        divText.innerHTML = page3;
    }
    else {
        alert('Selecione a média!');
    }

}

function select2() {
    type2 = document.getElementById('media').value;
    var page3;

    if (type2 != '') {
        if (type == '02') {
            switch (type2) {
                case 'b':
                    pesosQtd = 4;
                    break;
                case 't':
                    pesosQtd = 3;
                    break;
                case 's':
                    pesosQtd = 2;
                    break;
            }

            page3 = '<h1>Calculadora de Média</h1>\n\
            <h2>Defina os pesos:</h2>\n\
            <div class="pesos">\n\
            ';

            for (var i = 0; i < pesosQtd; i++) {
                if (i < pesosQtd - 1) {
                page3 += '<input type="number" class="inPeso" id="i' + (i + 1).toString() + '">\n\
                <h3>+</h3>';
                } else {
                    page3 += '<input type="number" class="inPeso" id="i' + (i + 1).toString() + '">\n\
                    <h3>=</h3>';
                }
            }
            page3 += '<input type="number" class="inPeso" id="i' + (pesosQtd + 1).toString() + ' disabled">\n';

            page3 += ' </div><br><br>\n\
            <button onclick="Peso()">Começar</button>';

            divText.innerHTML = page3;

            function loopAssincrono() {
                pesoTotal = 0;
                for (var i = 0; i < pesosQtd; i++) {
                    pesoTotal += document.getElementById("i" + (i + 1).toString());
                }
                document.getElementById('i' + (pesosQtd + 1).toString()).value = pesoTotal.toString();
            }

            const intervalId = setInterval(loopAssincrono, 1000);

            if (pesoClick) {
                clearInterval(intervalId);
            }
        }
    }
    else {
        alert('Selecione o modo de avaliação!');
    }
}

function Peso() {
    pesoClick = true;
}