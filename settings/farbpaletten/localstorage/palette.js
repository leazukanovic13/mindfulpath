document.addEventListener("DOMContentLoaded", () => {
    const paletteItems = document.querySelectorAll(".palette-item");
    const paletteLinkId = "palette-css"; // ID for the dynamically added palette link
    const defaultPalette = "standard"; // Default palette name

    // Function to load a palette CSS file dynamically
    const loadPalette = (palette) => {
        const palettePath = `/settings/farbpaletten/palette-${palette}.css`;

        // Debug: Log palette path
        console.log(`Loading palette from path: ${palettePath}`);

        // Check if the palette CSS link exists, if not create it
        let link = document.getElementById(paletteLinkId);
        if (!link) {
            link = document.createElement("link");
            link.id = paletteLinkId;
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }

        // Set the href to the selected palette
        link.href = palettePath;

        // Save the selected palette in localStorage
        localStorage.setItem("selectedPalette", palette);
        console.log(`Palette set to: ${palette}`);
    };

    // Apply the saved palette or the default palette on load
    const savedPalette = localStorage.getItem("selectedPalette") || defaultPalette;
    loadPalette(savedPalette);

    // Update active state for the buttons
    const updateActiveState = (selectedPalette) => {
        paletteItems.forEach((item) => {
            item.classList.toggle("active", item.dataset.palette === selectedPalette);
        });
    };
    updateActiveState(savedPalette);

    // Add click event listeners to each palette item
    paletteItems.forEach((item) => {
        item.addEventListener("click", () => {
            const selectedPalette = item.dataset.palette;

            // Update active state
            updateActiveState(selectedPalette);

            // Load the selected palette
            loadPalette(selectedPalette);
        });
    });

    // Add event listener to the toggle (only if it exists on the page)
    if (toggle) {
        toggle.addEventListener("change", () => {
            if (toggle.checked) {
                const selectedPalette = "dark";

            // Update active state
                updateActiveState(selectedPalette);

                // Load the selected palette
                loadPalette(selectedPalette);
            } else {
                const selectedPalette = "standard";

                // Update active state
                updateActiveState(selectedPalette);

                // Load the selected palette
                loadPalette(selectedPalette);
            }
        });
    }
});
