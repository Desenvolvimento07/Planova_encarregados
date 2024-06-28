// Função para validar o input e limitar a 3 dígitos
 function validarInput(input) {
    if (input.value.length > 3) {
        input.value = input.value.slice(0, 3); // Mantém apenas os 3 primeiros caracteres
    }

    // Se o valor é maior que 999, limitar a 999
    if (input.value > 999) {
        input.value = 999;
    }
}
// Função para salvar os dados no Local Storage
        function salvarDados() {
            var dadosCelulares = []; // Array para armazenar os dados dos celulares

            // Obtém os valores dos inputs e salva no array dadosCelulares
            var lista = document.getElementById('listaNomesTextos');
            var itens = lista.getElementsByTagName('li');
            
            for (var i = 0; i < itens.length; i++) {
                var nome = itens[i].querySelector('.nome').textContent;
                var texto = itens[i].querySelector('.texto').textContent;
                var inputId = itens[i].querySelector('.idInput');
                var idCelular = inputId.value;

                // Cria um objeto com os dados e adiciona ao array
                var dado = {
                    Nome: nome,
                    Texto: texto,
                    "ID Celular": idCelular
                };
                dadosCelulares.push(dado);
            }

            // Salva os dados no Local Storage
            localStorage.setItem('dadosCelulares', JSON.stringify(dadosCelulares));

            alert('Dados salvos no Local Storage!');
        }

        // Função para gerar e baixar o PDF
        function baixarPDF() {
            // Recupera os dados do Local Storage
            var dadosSalvos = localStorage.getItem('dadosCelulares');
            if (!dadosSalvos) {
                alert('Não há dados salvos para gerar o PDF.');
                return;
            }

            // Converte os dados de volta para um array de objetos
            var dados = JSON.parse(dadosSalvos);

            // Cria um novo documento PDF
            var { jsPDF } = window.jspdf;
            var doc = new jsPDF();

            // Configuração para o título
            doc.setFontSize(18);
            doc.text('Lista de Dados de Celulares', 14, 22);

            // Adiciona os dados ao PDF
            var y = 30;
            dados.forEach(function(dado) {
                var texto = `Nome: ${dado.Nome}\nAtividade: ${dado.Texto}\nID Pulsus: ${dado["ID Celular"]}\n\n`;
                doc.setFontSize(12);
                doc.text(20, y, texto);
                y += 20; // Espaçamento entre os itens
            });

            // Salva o PDF com o nome especificado
            doc.save('dados_celulares.pdf');
        }


 // Função para carregar os dados salvos do Local Storage e preencher os inputs
 function carregarDadosSalvos() {
    var dadosSalvos = localStorage.getItem('dadosCelulares');
    if (dadosSalvos) {
        var dados = JSON.parse(dadosSalvos);

        var lista = document.getElementById('listaNomesTextos');
        var itens = lista.getElementsByTagName('li');

        // Preenche os inputs com os dados carregados do Local Storage
        for (var i = 0; i < itens.length; i++) {
            var inputId = itens[i].querySelector('.idInput');
            inputId.value = dados[i]["ID Celular"];
        }
    }
}

// Ao carregar a página, carrega os dados salvos
window.onload = function() {
    carregarDadosSalvos();
};
