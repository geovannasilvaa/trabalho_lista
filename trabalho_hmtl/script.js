document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const shoppingList = document.getElementById('shopping-list');

    
    loadShoppingList();

    
    addButton.addEventListener('click', addItem);

    itemInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addItem();
        }
    });

    function addItem() {
        const itemText = itemInput.value.trim();
        if (itemText !== '') {
            createListItem(itemText, false); 
            itemInput.value = ''; 
            saveShoppingList();
        }
    }

    function createListItem(text, isPurchased) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-item'); 

        if (isPurchased) {
            listItem.classList.add('purchased');
        }

        const itemSpan = document.createElement('span');
        itemSpan.classList.add('item-text');
        itemSpan.textContent = text;
        itemSpan.addEventListener('click', () => {
            listItem.classList.toggle('purchased'); 
            saveShoppingList();
        });

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('item-actions');

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remover'; 
        removeButton.addEventListener('click', () => {
            shoppingList.removeChild(listItem); 
            saveShoppingList(); 
        });


        listItem.appendChild(itemSpan);
        actionsDiv.appendChild(removeButton);
        listItem.appendChild(
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
