function loadTask(taskName) {
    // Vyčistíme obsah hlavní oblasti
    document.getElementById('task-container').innerHTML = '';

    // Odstranit případný již existující skript
    const existingScript = document.querySelector(`script#${taskName}-script`);
    if (existingScript) {
        document.head.removeChild(existingScript);
    }

    // Dynamicky načteme JavaScriptový soubor s konkrétní úlohou
    const script = document.createElement('script');
    script.src = `tasks/${taskName}.js`;
    script.id = `${taskName}-script`;

    // Zpracování načtení skriptu
    script.onload = function() {
        console.log(`${taskName}.js načteno`);
    };

    // Zpracování chyby při načítání skriptu
    script.onerror = function() {
        console.error(`Chyba při načítání ${taskName}.js`);
    };

    // Přidání skriptu do dokumentu
    document.head.appendChild(script);
}
