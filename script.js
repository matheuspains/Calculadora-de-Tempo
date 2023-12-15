// Array para armazenar as datas inseridas
var datasInseridas = [];

function adicionarFeriados() {
    // Lista de feriados em 2024
    var feriados2024 = [
        { nome: 'Ano-Novo', data: new Date('2024-01-01') },
        { nome: 'Carnaval', data: new Date('2024-02-12') },
        { nome: 'Quarta-feira de Cinzas', data: new Date('2024-02-14') },
        { nome: 'Sexta-feira Santa', data: new Date('2024-03-29') },
        { nome: 'Páscoa', data: new Date('2024-03-31') },
        { nome: 'Dia do Trabalho', data: new Date('2024-05-01') },
        { nome: 'Corpus Christi', data: new Date('2024-06-20') },
        { nome: 'Independência do Brasil', data: new Date('2024-09-07') },
        { nome: 'Nossa Senhora Aparecida', data: new Date('2024-10-12') },
        { nome: 'Finados', data: new Date('2024-11-02') },
        { nome: 'Proclamação da República', data: new Date('2024-11-15') },
        { nome: 'Natal', data: new Date('2024-12-25') }
    ];

    // Obter a lista de feriados
    var feriadosList = document.getElementById('feriados');

    // Limpar a lista de feriados
    feriadosList.innerHTML = '';

    // Adicionar cada feriado à lista
    feriados2024.forEach(function (feriado) {
        // Adiciona um dia à data para evitar a subtração que estava acontecendo
        var dataFormatada = new Date(feriado.data.getTime() + (24 * 60 * 60 * 1000));
        
        var item = document.createElement('li');
        item.innerHTML = `${feriado.nome}: ${dataFormatada.toDateString()}`;
        feriadosList.appendChild(item);
    });
}

// Função para adicionar data
function adicionarData() {
    var nomeInput = document.getElementById('nomeInput');
    var dataInput = document.getElementById('dataInput');

    // Obter os valores dos campos
    var nome = nomeInput.value;
    var dataString = dataInput.value;

    // Validar se ambos os campos estão preenchidos
    if (nome.trim() === '' || dataString.trim() === '') {
        alert('Por favor, preencha ambos os campos.');
        return;
    }

    // Converter a string da data para um objeto Date
    var dataEscolhida = new Date(dataString);

    // Verificar se a data inserida é válida
    if (isNaN(dataEscolhida.getTime())) {
        alert('Por favor, insira uma data válida.');
        return;
    }

    // Adicionar a data ao array com um ID único
    var dataInserida = {
        id: Date.now(), // Usando timestamp como ID único
        nome: nome,
        data: dataEscolhida
    };
    datasInseridas.push(dataInserida);

    // Limpar os campos de entrada
    nomeInput.value = '';
    dataInput.value = '';

    // Atualizar a exibição das datas inseridas
    exibirDatasInseridas();
}

function exibirDatasInseridas() {
    var resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    // Iterar sobre as datas inseridas e exibir
    datasInseridas.forEach(function (item, index) {
        // Calcular a diferença de tempo para cada data inserida
        var diferencaTempo = item.data.getTime() - new Date().getTime();
        var dias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
        var horas = Math.floor((diferencaTempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutos = Math.floor((diferencaTempo % (1000 * 60 * 60)) / (1000 * 60));
        var segundos = Math.floor((diferencaTempo % (1000 * 60)) / 1000);

        // Criar um elemento resultado-item
        var resultadoItem = document.createElement('div');
        resultadoItem.className = 'resultado-item';

        // Exibir o resultado
        resultadoItem.innerHTML = `Faltam ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos para ${item.nome}.`;

        // Adicionar a linha horizontal
        var linhaHorizontal = document.createElement('hr');
        linhaHorizontal.style.borderTop = '2px solid #cd8a39';
        resultadoItem.appendChild(linhaHorizontal);

        // Adicionar o botão de remover
        var botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = function () {
            removerData(item.id); // Corrigido para passar o ID correto
        };
        resultadoItem.appendChild(botaoRemover);

        // Append resultado
        resultado.appendChild(resultadoItem);

        // Adicionar espaçamento entre os elementos
        var espacamento = document.createElement('div');
        espacamento.style.height = '10px';
        resultado.appendChild(espacamento);
    });
}

// Função para remover data
function removerData(id) {
    // Encontrar o índice da data pelo id
    var index = datasInseridas.findIndex(function (item) {
        return item.id === id;
    });

    // Verificar se o id foi encontrado
    if (index !== -1) {
        // Remover a data do array pelo índice
        datasInseridas.splice(index, 1);
        // Atualizar a exibição das datas inseridas
        exibirDatasInseridas();
    }
}

function exportarDatas() {
    // Verifica se há datas a serem exportadas
    if (datasInseridas.length === 0) {
        alert('Não há datas para exportar.');
        return;
    }

    // Mapeia as datas para um formato exportável
    var dadosExportados = datasInseridas.map(function (item) {
        var diferencaTempo = item.data.getTime() - new Date().getTime();
        var diasFaltando = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));

        return {
            nome: item.nome,
            data: item.data.toISOString(), // Exporta a data no formato ISO
            diasFaltando: diasFaltando
        };
    });

    // Converte os dados para o formato JSON
    var dadosExportadosJSON = JSON.stringify(dadosExportados, null, 2);

    // Cria um link de download para o usuário
    var linkDownload = document.createElement('a');
    linkDownload.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(dadosExportadosJSON);
    linkDownload.download = 'datas_exportadas.json';

    // Adiciona o link ao corpo do documento e simula um clique
    document.body.appendChild(linkDownload);
    linkDownload.click();
    document.body.removeChild(linkDownload);
}

// Chamar a função para adicionar feriados
adicionarFeriados();
