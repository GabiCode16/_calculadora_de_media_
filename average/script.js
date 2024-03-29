// Inicialização de variáveis

var divText = document.getElementById("container");
var type;
var type2;
var pesosQtd;
var pesoClick = false;
var pesoTotal = 0;
var pesoList = [];
var table = false;
var materias = [];
var subjects = false;
var matriz = [];
var ready = true;
var tableBuilt = false;
var nameFinal = '';

// Carregar a página de seleção de média

function start() { 
    var page2 = "<h1>Calculadora de Média</h1>\n" +
    "<select id='media'>\n" +
        "<option value='' selected disabled>Selecione a Média\n" +
        "<option value='01'>Média Aritmética\n" +
        "<option value='02'>Média Ponderada\n" +
        "<option value='03'>Média Harmônica\n" +
    "</select><br><br><br>\n" +
    "<button onclick='select()'>Continuar</button>";

    divText.innerHTML = page2;
}

// Carregar a página de seleção do modo de avaliação

function select() {
    var page3 = "<h1>Calculadora de Média</h1>\n\
    <select id='media'>\n\
    <option value='' selected disabled>Selecione o modo de avaliação\n\
    <option value='b'>Bimestre\n\
    <option value='t'>Trimestre\n\
    <option value='s'>Semestre\n\
    </select><br><br><br>\n\
    <button onclick='select2()'>Prosseguir</button>";

    type = document.getElementById('media').value;

    if (type != '') {
        divText.innerHTML = page3;
    }
    else {
        alert('Selecione a média!');
    }

}

// carregar a página de pesos SE a Média for Ponderada
// SENÃO carregar direto a página de inserção do nome 

function select2() {
    type2 = document.getElementById('media').value;
    var page3;

    if (type2 != '') {

        // Carregar página de pesos SE a condição for verdadeira

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
            <button onclick="Peso()">Continuar</button>';

            divText.innerHTML = page3;

            // Adição de loop assincrono para a contagem total dos pesos

            const intervalId = setInterval(loopAssincrono, 10);

            function loopAssincrono() {
                pesoTotal = 0;
                pesoList = [];
                next = false;
                countNotNull = 0;
                for (var i = 0; i < pesosQtd; i++) {
                    if (document.getElementById("i" + (i + 1).toString()).value != '') {
                        pesoTotal += parseFloat(document.getElementById("i" + (i + 1).toString()).value);
                        pesoList.push(parseFloat(document.getElementById("i" + (i + 1).toString()).value));
                        countNotNull++;
                    }
                }

                if (countNotNull == pesosQtd) {
                    next = true;
                }

                document.getElementById('i' + (pesosQtd + 1).toString()).value = pesoTotal.toString();

                if (pesoClick && next) {
                    clearInterval(intervalId);
                    nameFunc();
                }
                else {
                    pesoClick = false;
                }
            }
        } 

        // Carregar direto a página de inserção do nome caso a condição anterior seja falsa

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
            nameFunc();
            }

    } else {
        alert('Selecione o modo de avaliação!');
    }
}

// Verificar se todos os pesos foram inseridos

function Peso() {
    pesoClick = true;
    if (countNotNull < pesosQtd) {
        alert('Insira todos os pesos!');
    }
}

// Carregar página de adição ou edição de matérias

function start_table() {
    var page3_4 = '<h1>Adicionar Matérias</h1>\n\
    <input type="text" id="sub"><br><br>\n\
    <button onclick="add_remove()" id="ar">+ Adicionar Matéria</button><br><br>\n\
    <button onclick="finish()">Concluir</button>';

    // Se a tabela já foi feita, mudar o título para "Editar Matérias"

    if (tableBuilt) {
        page3_4 = '<h1>Editar Matérias</h1>\n\
    <input type="text" id="sub"><br><br>\n\
    <button onclick="add_remove()" id="ar">+ Adicionar Matéria</button><br><br>\n\
    <button onclick="finish()">Concluir</button>';
    }

    divText.innerHTML = page3_4;

    // Adição de loop assincrono para mudar o nome do botão

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

// Adição e/ou remoção de matérias

function add_remove() {
    var materia = document.getElementById('sub').value;
    var existance = false;
    document.getElementById('sub').value = '';

    for (var i = 0; i < materias.length; i++) {
        if (materia == materias[i])
            existance = true;
    }

    if (materia != '' && !existance) 
        materias.push(materia);

    if (existance)
        materias.splice(materias.indexOf(materia), 1);

    if (tableBuilt) {
        if (materia != '' && !existance) {
            matriz.push([]);
            for (var i = 0; i <= pesosQtd; i++)
                matriz[materias.indexOf(materia)].push('');
        }
        if (existance) {
            matriz.splice(materias.indexOf(materia), 1);
        }
    }

}

// Carregar a página da tabela para edição

function finish2() {

    var page4_5 = '<h1 id="h1">Boletim de ' + nameFinal + '</h1>\n\
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

    if (tableBuilt) {
        for (var i = 0; i < materias.length; i++) {
            for (var j = 0; j <= pesosQtd; j++) {
                document.getElementById(i.toString() + j.toString()).value = matriz[i][j];
            }
        }
        document.getElementById('h1').textContent = 'Editar Boletim';
    }

}

// Verficar se existe pelo menos uma matéria na lista

function finish() {
    if (materias.length > 0)
        subjects = true;
    else
        alert('Adicione pelo menos uma matéria');
}

// Construção da matriz da tabela

function valueTable() {

    if (!tableBuilt) {

        var pos = '';

        for (var i = 0; i < materias.length; i++) {
            matriz.push([]);
            for (var j = 0; j <= pesosQtd; j++) {
                pos = i.toString() + j.toString();
                matriz[i].push(document.getElementById(pos).value);
            }
        }

        tableBuilt = true;
    }

    else {

        var pos = '';
        for (var i = 0; i < materias.length; i++) {
            for (var j = 0; j <= pesosQtd; j++) {
                pos = i.toString() + j.toString();
                matriz[i][j] = document.getElementById(pos).value;
            }
        }
    }
    
    ready = true;

    var count;

    for (var i = 0; i < materias.length; i++) {
        count = 0;
        for (var j = 0; j <= pesosQtd; j++) {
            if (matriz[i][j] == '') {
                count++;
            }
        }
        if (count > 1) {
            ready = false;
        }
    }

    if (!ready) {
        alert("Insira pelo menos " + pesosQtd.toString() + " notas por disciplina");
    }
    else {
        boletim();
    }

}

// Função para o cálculo da média

function boletim() {

    switch (type) {

        case '01':

            var complete;

            for (var i = 0; i < materias.length; i++) {
                complete = 0;
                for (var j = 0; j <= pesosQtd; j++) {
                    if (matriz[i][j] != '')
                        complete++
                if (complete == pesosQtd + 1)
                    matriz[i][pesosQtd] = '';
                }
            }

            var a;
            var b = 0;

            for (var i = 0; i < materias.length; i++) {

                b = 0;

                if (matriz[i][pesosQtd] == '')
                    a = -1 * pesosQtd;
                else
                    a = 1;

                var bCount = 0;

                for (var j = 0; j < pesosQtd; j++) {
                    if (matriz[i][j] != '') {
                        b += parseFloat(matriz[i][j]);
                        bCount++;
                    }
                }

                if (bCount < pesosQtd)
                    b -= pesosQtd * parseFloat(matriz[i][pesosQtd]);

                var x = (Math.round(-b / a * 10) / 10).toString();

                for (var j = 0; j <= pesosQtd; j++) {
                    if (matriz[i][j] == '')
                        matriz[i][j] = x;
                }
            }

            table_finished();
            
            break;

        case '02':

            var complete;

            for (var i = 0; i < materias.length; i++) {
                complete = 0;
                for (var j = 0; j <= pesosQtd; j++) {
                    if (matriz[i][j] != '')
                        complete++
                if (complete == pesosQtd + 1)
                    matriz[i][pesosQtd] = '';
                }
            }

            var a;
            var b = 0;

            for (var i = 0; i < materias.length; i++) {

                b = 0;

                if (matriz[i][pesosQtd] == '')
                    a = -1 * pesoTotal;
                else {
                    for (var j = 0; j < pesosQtd; j++) {
                        if (matriz[i][j] == '') {
                            a = pesoList[j];
                        }
                    }
                }

                var bCount = 0;

                for (var j = 0; j < pesosQtd; j++) {
                    if (matriz[i][j] != '') {
                        b += parseFloat(matriz[i][j]) * pesoList[j];
                        bCount++;
                    }
                }

                if (bCount < pesosQtd)
                    b -= pesoTotal * parseFloat(matriz[i][pesosQtd]);

                var x = (Math.round(-b / a * 10) / 10).toString();

                for (var j = 0; j <= pesosQtd; j++) {
                    if (matriz[i][j] == '')
                        matriz[i][j] = x;
                }
            }

            table_finished();

            break;

        case '03':

            var complete;
            var sum = 0;

            for (var i = 0; i < materias.length; i++) {
                complete = 0;
                for (var j = 0; j <= pesosQtd; j++) {
                    if (matriz[i][j] != '')
                        complete++
                if (complete == pesosQtd + 1)
                    matriz[i][pesosQtd] = '';
                }
            }

            for (var i = 0; i < materias.length; i++) {
                sum = 0;
                for (var j = 0; j < pesosQtd; j++) {
                    if (matriz[i][j] != '') {
                        sum += parseFloat(matriz[i][j]) ** (-1);
                    }
                }
                if (matriz[i][pesosQtd] == '') {
                    matriz[i][pesosQtd] = (Math.round(pesosQtd / sum * 10) / 10).toString();
                }
                else {
                    for (var j = 0; j < pesosQtd; j++) {
                        if (matriz[i][j] == '') {
                            matriz[i][j] = (Math.round(parseFloat(matriz[i][pesosQtd]) / (pesosQtd - parseFloat(matriz[i][pesosQtd]) * sum)*10)/10).toString();
                        }
                    }
                }
            }

            table_finished();

            break;

    }

}

// Carregar a página com a tabela completa

function table_finished() {

    var page4_5 = '<h1>Boletim de ' + nameFinal + '</h1>\n\
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
                    page4_5 += '<th>' + matriz[materias.length - g][4 - e] + '</th>\n';
                    break;
                case 3:
                    page4_5 += '<th>' + matriz[materias.length - g][3 - e] + '</th>\n';
                    break;
                case 2:
                    page4_5 += '<th>' + matriz[materias.length - g][2 - e] + '</th>\n';
                    break;
            }
        }

        page4_5 += '<th>' + matriz[materias.length - g][pesosQtd] + '</th>\n';

        page4_5 += '</tr>\n';
    }

    page4_5 += '</tbody>\n\
    </table><br><br><br><br>\n\
    <button onclick="start_table()">Editar</button>\n\
    <button onclick="download()">Download</button>';

    divText.innerHTML = page4_5;

    subjects = false;

}

// Baixar a tabela em Pdf

function download() {
    
    var html = document.getElementById('html');

    var options = {
        margin:       0,
        filename:     'boletim.pdf',
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' },
        background: 'transparent'
      };

    html2pdf().set(options).from(html).save();

}

// Chamar a página de inserção do nome

function nameFunc() {
    var pageADD = '<h1>Adicione seu nome</h1>\n\
    <input id="name"></input><br><br>\n\
    <button onclick="nameADDicted()">Enviar</button>';

    divText.innerHTML = pageADD;
}

// Verificar se o nome é válido

function nameADDicted() {
    if (document.getElementById('name').value == '') {
        alert('Adicione um nome');
    }
    else {
        nameFinal = document.getElementById('name').value;
        start_table();
    }
}
