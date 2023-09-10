var divText = document.getElementById("container");
var type;
var type2;
var pesosQtd;
var pesoClick = false;
var pesoTotal = 0;
var table = false;
var materias = [];
var subjects = false;

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
            page3 += '<input type="number" class="inPeso" id="i' + (pesosQtd + 1).toString() + '"\
            value="0">\n';

            page3 += ' </div><br><br>\n\
            <button onclick="Peso()">Começar</button>';

            divText.innerHTML = page3;

            const intervalId = setInterval(loopAssincrono, 500);

            function loopAssincrono() {
                pesoTotal = 0;
                next = false;
                countNotNull = 0;
                for (var i = 0; i < pesosQtd; i++) {
                    if (document.getElementById("i" + (i + 1).toString()).value != '') {
                        pesoTotal += parseInt(document.getElementById("i" + (i + 1).toString()).value);
                        countNotNull++;
                    }
                }

                if (countNotNull == pesosQtd) {
                    next = true;
                }

                document.getElementById('i' + (pesosQtd + 1).toString()).value = pesoTotal.toString();

                if (pesoClick && next) {
                    clearInterval(intervalId);
                    start_table();
                }
                else {
                    pesoClick = false;
                }
            }
        } 
        else {
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
            start_table();
            }

    } else {
        alert('Selecione o modo de avaliação!');
    }
}

function Peso() {
    pesoClick = true;
    if (countNotNull < pesosQtd) {
        alert('Insira todos os pesos!');
    }
}

function start_table() {
    var page3_4 = '<h1>Criação da Tabela</h1>\n\
    <input type="text" id="sub"><br><br>\n\
    <button onclick="add_remove()" id="ar">+ Adicionar Matéria</button><br><br>\n\
    <button onclick="finish()">Concluir</button>';

    divText.innerHTML = page3_4;

    const intervalId2 = setInterval(loopAssincrono2, 10);

    function loopAssincrono2() {
        var materia = document.getElementById('sub').value;
        var existance = false;
    
        for (i = 0; i < materias.length; i++) {
            if (materia == materias[i])
                existance = true;
        }
    
        if (existance)
            document.getElementById('ar').textContent = "- Remover Matéria";
        else
            document.getElementById('ar').textContent = "+ Adicionar Matéria";

        if (subjects) {
            clearInterval(intervalId2);
            finish2();
        }
    }

}

function add_remove() {
    var materia = document.getElementById('sub').value;
    var existance = false;

    for (var i = 0; i < materias.length; i++) {
        if (materia == materias[i])
            existance = true;
    }

    if (materia != '' && !existance)
        materias.push(materia);

    if (existance)
        materias.splice(materias.indexOf(materia), 1);

    console.log(materias);
}

function finish2() {

    var page4_5 = '<h1>Calculadora de Média</h1>\n\
    <table style="width:100%">\n\
    <thead>\n\
    <tr>\n\
    <th>Disciplina</th>\n';

    for (var i = pesosQtd; i > 0; i--) {
        switch (pesosQtd) {
            case 4:
                page4_5 += '<th>' + (5 - i).toString() + 'º bimestre</th>\n';
                break;
            case 3:
                page4_5 += '<th>' + (4 - i).toString() + 'º trimestre</th>\n';
                break;
            case 2:
                page4_5 += '<th>' + (3 - i).toString() + 'º semestre</th>\n';
                break;
        }
    }

    page4_5 += '<th>Média Final</th>\n\
    </tr>\n\
    </thead>\n\
    <tbody>\n';

    for (var g = materias.length; g > 0; g--) {
        page4_5 += '<tr>\n\
        <th>' + materias[materias.length - g] + '</th>\n';

        for (var e = pesosQtd; e > 0; e--) {

            switch (pesosQtd) {
                case 4:
                    page4_5 += '<th><input type="number"\
             id="' + (materias.length - g).toString() + (4 - e).toString() + '"\
             ></th>\n';
                    break;
                case 3:
                    page4_5 += '<th><input type="number"\
             id="' + (materias.length - g).toString() + (3 - e).toString() + '"\
             ></th>\n';
                    break;
                case 2:
                    page4_5 += '<th><input type="number"\
             id="' + (materias.length - g).toString() + (2 - e).toString() + '"\
             ></th>\n';
                    break;
            }
        }

        page4_5 += '<th><input type="number"\
        id="' + (materias.length - g).toString() + (pesosQtd).toString() + '"\
        ></th>\n';

        page4_5 += '</tr>\n';
    }

    page4_5 += '</tbody>\n\
    </table><br><br><br><br>\n\
    <button onclick="valueTable()">Finalizar</button>\n';

    divText.innerHTML = page4_5;

}

function finish() {
    if (materias.length > 0)
        subjects = true;
    else
        alert('Adicione pelo menos uma matéria');
}

function valueTable() {

    var matriz = [];

    var pos = '';

    for (var i = 0; i < materias.length; i++) {
        matriz.push([]);
        for (var j = 0; j <= pesosQtd; j++) {
            pos = i.toString() + j.toString();
            matriz[i].push(document.getElementById(pos).value);
        }
    }
}