document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const shoppingList = document.getElementById('shopping-list');

    // Carrega a lista do localStorage ao iniciar
    loadShoppingList();

    // Adiciona um item quando o botão é clicado
    addButton.addEventListener('click', addItem);

    // Adiciona um item quando a tecla "Enter" é pressionada no campo de input
    itemInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addItem();
        }
    });

    function addItem() {
        const itemText = itemInput.value.trim(); // Pega o valor e remove espaços em branco
        if (itemText !== '') {
            createListItem(itemText, false); // Cria o item na lista (não comprado por padrão)
            itemInput.value = ''; // Limpa o campo de entrada
            saveShoppingList(); // Salva a lista após adicionar
        }
    }

    function createListItem(text, isPurchased) {
        const listItem = document.createElement('li'); // Cria um novo elemento <li>
        listItem.classList.add('list-item'); // Adiciona uma classe para estilização

        if (isPurchased) {
            listItem.classList.add('purchased'); // Adiciona a classe 'purchased' se o item já foi comprado
        }

        const itemSpan = document.createElement('span');
        itemSpan.classList.add('item-text');
        itemSpan.textContent = text;
        itemSpan.addEventListener('click', () => {
            listItem.classList.toggle('purchased'); // Alterna a classe 'purchased'
            saveShoppingList(); // Salva a lista após alterar o status
        });

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('item-actions');

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remover'; // Você pode usar um ícone aqui, como 'X' ou um SVG
        removeButton.addEventListener('click', () => {
            shoppingList.removeChild(listItem); // Remove o item da lista
            saveShoppingList(); // Salva a lista após remover
        });

        // Adiciona os elementos ao <li>
        listItem.appendChild(itemSpan);
        actionsDiv.appendChild(removeButton);
        listItem.appendChild(actionsDiv);

        // Adiciona o <li> à lista <ul>
        shoppingList.appendChild(listItem);
    }

    function saveShoppingList() {
        const items = [];
        shoppingList.querySelectorAll('li').forEach(item => {
            items.push({
                text: item.querySelector('.item-text').textContent,
                purchased: item.classList.contains('purchased')
            });
        });
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    function loadShoppingList() {
        const storedList = localStorage.getItem('shoppingList');
        if (storedList) {
            const items = JSON.parse(storedList);
            items.forEach(item => {
                createListItem(item.text, item.purchased);
            });
        }
    }
});
