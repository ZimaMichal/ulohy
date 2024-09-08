(function() {
    // Získání kontejneru pro úlohu
    var container = document.getElementById('task-container');

    // Pokud kontejner již existuje, vyčistit jeho obsah
    if (container) {
        container.innerHTML = ''; // Vyčistí existující obsah
    } else {
        // Pokud kontejner neexistuje, vytvořte nový
        container = document.createElement('div');
        container.id = 'task-container';
        document.body.appendChild(container);
    }

// Vytvoříme uživatelské rozhraní pro úlohu pivko
container.innerHTML = `
    <div class="task-title">Pivnice Mlýkárna tě láká na pivo...</div>
    <div id="map" style="width: 100%; height: 400px;"></div>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
`;

// Inicializace mapy s výchozím bodem na Mlykárně
var mlykoLatLng = [50.229469, 14.0778747]; // Souřadnice Mlykárny
var map = L.map('map').setView(mlykoLatLng, 18);

// Přidání OpenStreetMap dlaždicové vrstvy
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Vytvoření vlastní ikony pro Mlykárnu s emotikonem piva
var beerIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='font-size: 24px;'>🍺</div>",
    iconSize: [50, 50],
    iconAnchor: [10, 10] // Nastavení kotvy ikony (střed ikony bude na pozici markeru)
});

// Přidání markeru na Mlykárně s vlastní ikonou piva
var mlykoMarker = L.marker(mlykoLatLng, { icon: beerIcon }).addTo(map);
mlykoMarker.bindPopup("<b>Pivko?</b>").openPopup();

// Funkce pro zjištění polohy uživatele po malé prodlevě
function locateUserAfterDelay() {
    setTimeout(function() {
        map.locate({setView: false, maxZoom: 16}); // Požadavek na zjištění polohy uživatele
    }, 2000); // Prodleva 2 sekundy
}

// Funkce pro výpočet dynamického zoomu na základě vzdálenosti
function getZoomLevel(distance) {
    if (distance < 1) return 15; // < 1 km -> velmi detailní
    if (distance < 5) return 14; // 1 - 5 km -> detailní
    if (distance < 20) return 13; // 5 - 20 km -> střední zoom
    if (distance < 50) return 12; // 20 - 50 km -> více oddáleno
    if (distance < 100) return 10; // 50 - 100 km -> velká oblast
    return 8; // > 100 km -> velmi oddáleno
}

// Zjištění polohy uživatele a přidání markeru na mapu
function onLocationFound(e) {
    var userLatLng = e.latlng;

    // Vypočítání vzdálenosti mezi Mlykárnou a polohou uživatele (v km)
    var distance = (map.distance(mlykoLatLng, userLatLng) / 1000).toFixed(2); // Zaokrouhlení na 2 desetinná místa

    // Přidání markeru pro polohu uživatele s popupem včetně vzdálenosti
    var userMarker = L.marker(userLatLng).addTo(map);
    userMarker.bindPopup(`Dám si! Mám to jen ${distance} km.`).openPopup();

    // Vypočítání středního bodu mezi Mlykárnou a polohou uživatele
    var middleLat = (mlykoLatLng[0] + userLatLng.lat) / 2;
    var middleLng = (mlykoLatLng[1] + userLatLng.lng) / 2;
    var middleLatLng = [middleLat, middleLng];

    // Získání dynamického zoomu na základě vzdálenosti
    var zoomLevel = getZoomLevel(distance);

    // Centrovat mapu na střední bod s dynamickým zoomem
    map.setView(middleLatLng, zoomLevel);

    // Zobrazení popupu u markeru uživatele
    userMarker.openPopup();
}

// Zpracování chyby při získávání polohy
function onLocationError(e) {
    alert("Nelze zjistit vaši polohu: " + e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// Volání funkce pro zjištění polohy uživatele po prodlevě
locateUserAfterDelay();
})();