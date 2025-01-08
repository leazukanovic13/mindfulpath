document.addEventListener("DOMContentLoaded", function () {
    const entriesList = document.getElementById("entriesList");
    const weekButton = document.getElementById("weekButton");
    const monthButton = document.getElementById("monthButton");
    const yearButton = document.getElementById("yearButton");

    // Path to the folder containing the .csv files
    const folderPath = "../tagebuchFilesTest"; // Replace this with your actual folder path

    // Temporary function to retrieve files from the folder
    function fetchExistingFiles() {
        try {
            const files = fs.readdirSync(folderPath); // Read all files in the directory
            return files.filter((file) => file.endsWith(".csv")); // Return only .csv files
        } catch (err) {
            console.error("Error reading files from directory:", err);
            return [];
        }
    }

    // Helper function to generate file names for the period
    function generateFileNames(period) {
        const files = [];
        const today = new Date();
        const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
        const todayFileName = today.toLocaleDateString("de-DE", dateOptions).replace(/\./g, "-");

        // Add 'Heute' file first
        files.push({ date: "Heute", fileName: `${todayFileName}.csv`, isToday: true });

        // Add other files based on the period
        const days = period === "week" ? 7 : period === "month" ? 30 : 365;
        for (let i = 1; i <= days; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const fileName = date.toLocaleDateString("de-DE", dateOptions).replace(/\./g, "-") + ".csv";
            files.push({ date: date.toLocaleDateString("de-DE"), fileName, isToday: false });
        }
        return files;
    }

    // Render the list of entries
    function renderEntries(period) {
        entriesList.innerHTML = ""; // Clear existing entries
        const existingFiles = fetchExistingFiles(); // Retrieve files from the directory
        const files = generateFileNames(period);

        files.forEach((file) => {
            if (file.isToday || existingFiles.includes(file.fileName)) {
                const entryButton = document.createElement("button");
                entryButton.className = "entry-button";
                entryButton.textContent = file.date;
                entryButton.onclick = () => openTagebuch(file);
                entriesList.appendChild(entryButton);
            }
        });
    }

    // Open Tagebuch based on the file
    function openTagebuch(file) {
        if (file.isToday || file.fileName) {
            // Redirect to tagebuch.html with file name as a query parameter
            window.location.href = `../tagebuchseite/tagebuch.html?file=${file.fileName}`;
        } else {
            // Open an empty tagebuch.html for today's entry if no file exists
            window.location.href = "../tagebuchseite/tagebuch.html";
        }
    }

    // Event listeners for period buttons
    weekButton.addEventListener("click", () => {
        setActivePeriod("week");
        renderEntries("week");
    });

    monthButton.addEventListener("click", () => {
        setActivePeriod("month");
        renderEntries("month");
    });

    yearButton.addEventListener("click", () => {
        setActivePeriod("year");
        renderEntries("year");
    });

    // Set the active button style
    function setActivePeriod(period) {
        [weekButton, monthButton, yearButton].forEach((btn) => btn.classList.remove("active"));
        if (period === "week") weekButton.classList.add("active");
        if (period === "month") monthButton.classList.add("active");
        if (period === "year") yearButton.classList.add("active");
    }

    // Initialize the view with 'Woche'
    setActivePeriod("week");
    renderEntries("week");
});
