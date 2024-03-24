// Import config.js
import config from "../JavaScript/config.js";

// Proměnné
const accesKey = config.accesKey;
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

// Defaultní hodnoty
let keyword = "";
let page = 0;

// Funkce searchImages()
async function searchImages() {
    // Hodnota zadaná do inputu
    keyword = searchBox.value; 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesKey}&per_page=12`;
    
    // Připojení k API serveru (funkce fetch() zahájí asynchronní HTTP požadavek)
    const response = await fetch(url);
    const data = await response.json(); 

    // Podmínka zajišťuje, že předchozí výsledky vyhledávání jsou smazány, aby bylo možné zobrazit nové výsledky.
    if (page === 1) {
        searchResult.innerHTML = "";
    }

    const result = data.results;
    // console.log(result);

    result.map((result) => {
        // Vytvoření <img> elementu + přidání URL adresy
        const image = document.createElement("img");
        image.src = result.urls.small;
        // Vytvořeni elementu <a> + přidání URL adresy
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        // Přidání image k vytvořenému odkazu imageLink
        imageLink.appendChild(image);
        // Přidání imageLink do searchResult (zde budou výsledky vyhledávání)
        searchResult.appendChild(imageLink);
    });
    // Po načtení obrázku se zobrazí tlačítko showMoreBtn
    showMoreBtn.style.display = "block";
}

// Po odeslání formuláře se nastaví page na 1 a zavolá se funkce searchImages()
searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Zabrání aktualizování stránky
    page = 1;
    searchImages();
});

// Po stisknutí showMoreBtn se navýší počet stránek (počet obrázků)
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

// Metoda .map() v JavaScriptu projde každý prvek v poli a aplikuje definovanou funkci na každý prvek, vytvářejíc nové pole obsahující výsledky aplikace této funkce na každém prvku.