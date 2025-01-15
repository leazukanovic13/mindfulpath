document.addEventListener("DOMContentLoaded", function () {
    const languageItems = document.querySelectorAll(".language-item");
    const currentLanguageText = document.querySelector(".current-language p");

    languageItems.forEach((item) => {
        item.addEventListener("click", function () {
            // Entferne die aktive Klasse und das Häkchen von allen Elementen
            languageItems.forEach((i) => {
                i.classList.remove("active");
                const checkIcon = i.querySelector("i");
                if (checkIcon) {
                    checkIcon.style.color = "transparent"; // Versteckt das Häkchen
                }
            });

            // Füge die aktive Klasse und das Häkchen zum geklickten Element hinzu
            item.classList.add("active");
            const checkIcon = item.querySelector("i");
            if (checkIcon) {
                checkIcon.style.color = "#468151"; // Zeigt das Häkchen
            }

            // Aktualisiere den Text der aktuellen Sprache
            const selectedLanguageText = item.querySelector("span").textContent;
            currentLanguageText.textContent = selectedLanguageText;
        });
    });
});



