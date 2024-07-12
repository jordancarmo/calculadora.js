// Aguarda até que o DOM esteja completamente carregado
document.addEventListener('DOMContentLoaded', function () {

    // Seleciona todos os botões da calculadora
    const keys = document.querySelectorAll('.calculator__button');

    // Seleciona os elementos de exibição principal e histórico
    const displayMain = document.querySelector('.display__main');
    const displayHistory = document.querySelector('.display__history');

    // Seleciona botões específicos e containers para funcionalidades
    const historyButton = document.querySelector('.action__history');
    const clearDisplayButton = document.querySelector('.action__clear-display');
    const clearAllButton = document.querySelector('.calculator__sec-operator');
    const historyContainer = document.querySelector('.action__container');
    const actionResult = document.querySelector('.action__result');

    // Variáveis de estado para a calculadora
    let input = "";  // Armazena a entrada atual
    let history = []; // Armazena o histórico de operações

    // Adiciona evento de clique para cada botão da calculadora
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const value = key.textContent; // Obtém o texto do botão clicado
            handleInput(value); // Chama a função para lidar com a entrada
        });
    });

    // Adiciona eventos para botões específicos e interações via teclado
    clearDisplayButton.addEventListener('click', deleteLast);
    clearAllButton.addEventListener('click', clearDisplay);
    historyButton.addEventListener('click', showHistory);

    // Captura eventos de teclado para interação com a calculadora
    document.addEventListener('keydown', (event) => {
        const key = event.key; // Obtém a tecla pressionada
        if (key >= '0' && key <= '9' || key === '.' || key === '/' || key === '*' || key === '-' || key === '+') {
            handleInput(key); // Adiciona números e operadores à entrada
        } else if (key === 'Enter' || key === '=') {
            calculateResult();}
          else if (key === 'Delete') {
            deleteLast(); // Calcula o resultado quando Enter ou = é pressionado
        } else if (key === 'Backspace') {
            deleteLast(); // Deleta o último caractere da entrada
        } else if (key.toLowerCase() === 'c') {
            clearDisplay(); // Limpa a tela quando 'c' é pressionado
        }
    });

    // Função para manipular a entrada de botões da calculadora
    function handleInput(value) {
        if (value === 'C') {
            clearDisplay(); // Limpa a tela se o botão C for pressionado
        } else if (value === '()') {
            handleBrackets(); // Manipula a adição de parênteses
        } else if (value === '%') {
            input += '/100'; // Adiciona % para calcular porcentagem
            updateDisplay(); // Atualiza a exibição na tela
        } else if (value === '=') {
            calculateResult(); // Calcula o resultado se = for pressionado
        } else {
            input += value; // Adiciona o valor do botão à entrada atual
            updateDisplay(); // Atualiza a exibição na tela
        }
    }

    // Função para manipular a adição de parênteses na entrada
    function handleBrackets() {
        if (input.indexOf("(") === -1 ||
            (input.indexOf("(") !== -1 && input.indexOf(")") !== -1 && input.lastIndexOf("(") < input.lastIndexOf(")"))) {
            input += "("; // Adiciona parêntese aberto se não estiver presente
        } else if (input.indexOf("(") !== -1 && (input.indexOf(")") === -1 || input.lastIndexOf("(") > input.lastIndexOf(")"))) {
            input += ")"; // Adiciona parêntese fechado se necessário
        }
        updateDisplay(); // Atualiza a exibição na tela
    }

    // Função para atualizar a exibição principal da calculadora
    function updateDisplay() {
        displayMain.textContent = input || "0"; // Atualiza o texto principal ou exibe 0 se vazio
    }

    // Função para calcular o resultado da expressão
    function calculateResult() {
        try {
            const result = eval(input); // Avalia a expressão matemática
            if (result !== undefined) {
                displayHistory.textContent = input + ' ='; // Exibe a expressão completa no histórico
                displayMain.textContent = result; // Exibe o resultado na tela principal
                history.push({ input, result }); // Adiciona a operação ao histórico
                input = result.toString(); // Atualiza a entrada com o resultado
                updateActionResult(); // Atualiza o resultado adicional
            }
        } catch (error) {
            displayMain.textContent = 'Error'; // Exibe "Error" se houver um erro na expressão
            input = ''; // Limpa a entrada
        }
    }

    // Função para limpar a entrada da calculadora
    function clearDisplay() {
        input = ""; // Limpa a entrada
        displayMain.textContent = "0"; // Exibe 0 na tela principal
        actionResult.textContent = "0"; // Zera o indicador de resultado
        history = []; // Limpa o histórico
        showHistory(); // Atualiza visualmente o histórico
    }

    // Função para deletar o último caractere da entrada
    function deleteLast() {
        input = input.slice(0, -1); // Remove o último caractere da entrada
        updateDisplay(); // Atualiza a exibição na tela
    }

    // Função para exibir ou ocultar o histórico de operações
    function showHistory() {
        historyContainer.classList.toggle('show-history'); // Alterna a classe para mostrar ou ocultar o histórico
        if (historyContainer.classList.contains('show-history')) {
            let historyHtml = history.map(entry => `<div>${entry.input} = ${entry.result}</div>`).join('');
            displayHistory.innerHTML = historyHtml; // Exibe o histórico de operações na tela
        } else {
            displayHistory.innerHTML = ''; // Limpa o histórico de operações
        }
    }

    // Função para atualizar o resultado adicional exibido
    function updateActionResult() {
        if (history.length > 0) {
            actionResult.textContent = history[history.length - 1].result; // Exibe o último resultado no elemento específico
        } else {
            actionResult.textContent = "0"; // Se não houver histórico, exibe 0
        }
    }
});
