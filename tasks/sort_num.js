console.log("sort_num.js je načten");

var container = document.getElementById('task-container');

if (container) {
    container.innerHTML = '';
} else {
    container = document.createElement('div');
    container.id = 'task-container';
    document.querySelector('.main-content').appendChild(container);
}

container.innerHTML = `
    <h3>Seřadit čísla</h3>
    <div class="input-section">
        <input type="text" id="input-numbers" placeholder="Vložte seznam čísel oddělených čárkami">
    </div>
    <div class="output-section">
        <h3>Výstup</h3>
        <div id="output-box">Zde se zobrazí seřazený seznam</div>
    </div>
    <button id="sort-button">Spustit</button>
`;

function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

window.sortNumbers = function() {
    console.log("Funkce sortNumbers byla volána");
    const input = document.getElementById('input-numbers').value;
    const numbers = input.split(',').map(Number);
    const sortedNumbers = bubbleSort(numbers);
    document.getElementById('output-box').innerText = sortedNumbers.join(', ');
};

document.getElementById('sort-button').addEventListener('click', window.sortNumbers);
