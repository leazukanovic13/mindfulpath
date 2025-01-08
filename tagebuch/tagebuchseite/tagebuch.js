document.addEventListener("DOMContentLoaded", function () {
    const moodButton = document.getElementById("moodButton");
    const moodSlider = document.getElementById("moodSlider");
    const closeSlider = document.getElementById("closeSlider");
    const moodRange = document.getElementById("moodRange");
    const moodLabel = document.getElementById("moodLabel");
    const moodImage = document.getElementById("moodImage");
    const moodDisplay = document.getElementById("moodDisplay");
    const saveButton = document.getElementById("saveButton");
    const form = document.getElementById("tagebuchForm");

    const moodImages = ["../Images/sehrschlecht.png", "../Images/schlecht.png", "../Images/mittel.png", "../Images/gut.png", "../Images/ausgezeichnet.png"];
    const moodTexts = ["Schlimm", "Schlecht", "Neutral", "Gut", "Super Gut"];

    // Show mood slider
    moodButton.addEventListener("click", () => {
        moodSlider.classList.remove("hidden");
        
    });

    // Update mood slider values
    moodRange.addEventListener("input", () => {
        const moodIndex = moodRange.value - 1;
        sliderEmoji.src = moodImages[moodIndex];
        sliderEmoji.alt = `Deine Stimmung: ${moodTexts[moodIndex]}`;
        sliderEmojiText.textContent = moodTexts[moodIndex];
    });

    // Close mood slider and update display
    closeSlider.addEventListener("click", () => {
        moodSlider.classList.add("hidden");
        moodDisplay.classList.remove("hidden");
        moodImage.classList.remove("hidden");
        const moodIndex = moodRange.value - 1;
        moodImage.src = moodImages[moodIndex];
        moodDisplay.classList.remove("hidden");
        moodButton.textContent = "Stimmung geändert";
    });
    

    saveButton.addEventListener("click", (e) => {
        e.preventDefault();
    
        try {
            // Prepare data
            const date = new Date().toISOString().split("T")[0];
            const dayEntry = document.getElementById("dayEntry").value;
            const highlight = document.getElementById("highlight").value;
            const challenges = document.getElementById("challenges").value;
            const solutions = document.getElementById("solutions").value;
            const moodIndex = moodRange.value - 1;
    
            const csvContent =
                `Datum,Eintrag,Highlight,Herausforderungen,Lösungen,Stimmung\n` +
                `${date},"${dayEntry}","${highlight}","${challenges}","${solutions}","${moodTexts[moodIndex]}"`;
    
            // Create a Blob for the CSV file
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
            // Create a temporary link element
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `tagebuch_${date}.csv`;
    
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
            // Show success popup
            showPopup("Erfolgreich gespeichert!", "Die Datei wurde erfolgreich gespeichert.");
            
            // Reset form
            form.reset();
            moodDisplay.classList.add("hidden");
        } catch (error) {
            console.error("Fehler beim Speichern der Datei:", error);
            alert("Fehler beim Speichern des Eintrags. Bitte versuchen Sie es erneut.");
        }
    });
    
    // Function to display a success popup
    function showPopup(title, message) {
        // Create popup container
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.zIndex = "1000";
        popup.style.backgroundColor = "#ffffff";
        popup.style.padding = "20px";
        popup.style.border = "1px solid #ccc";
        popup.style.borderRadius = "10px";
        popup.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
        popup.style.textAlign = "center";
    
        // Add title
        const popupTitle = document.createElement("h2");
        popupTitle.textContent = title;
        popupTitle.style.color = "#468151";
        popupTitle.style.marginBottom = "10px";
        popup.appendChild(popupTitle);
    
        // Add message
        const popupMessage = document.createElement("p");
        popupMessage.textContent = message;
        popupMessage.style.color = "#333";
        popup.appendChild(popupMessage);
    
        // Add close button
        const closeButton = document.createElement("button");
        closeButton.textContent = "OK";
        closeButton.style.marginTop = "10px";
        closeButton.style.padding = "5px 10px";
        closeButton.style.border = "none";
        closeButton.style.borderRadius = "5px";
        closeButton.style.backgroundColor = "#468151";
        closeButton.style.color = "#ffffff";
        closeButton.style.cursor = "pointer";
        closeButton.addEventListener("click", () => {
            document.body.removeChild(popup);
        });
        popup.appendChild(closeButton);
    
        // Append popup to body
        document.body.appendChild(popup);
    }
});
