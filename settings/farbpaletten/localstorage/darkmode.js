document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('dark-mode-toggle'); // The toggle switch (if present)
    const darkModeCssLinkId = 'dark-mode-css'; // Unique ID for the Dark Mode CSS link
    const darkModeCssPath = '../darkmode.css'; // Path to your darkmode.css file

    // Function to add Dark Mode CSS dynamically
    const addDarkModeCss = () => {
        if (!document.getElementById(darkModeCssLinkId)) {
            const link = document.createElement('link');
            link.id = darkModeCssLinkId;
            link.rel = 'stylesheet';
            link.href = darkModeCssPath;
            document.head.appendChild(link);
        }
    };

    // Function to remove Dark Mode CSS
    const removeDarkModeCss = () => {
        const link = document.getElementById(darkModeCssLinkId);
        if (link) {
            link.parentNode.removeChild(link);
        }
    };

    // Check for saved Dark Mode state in localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode'); // Apply Dark Mode
        addDarkModeCss(); // Dynamically load Dark Mode CSS
        if (toggle) toggle.checked = true; // Set toggle to checked if present
    }

    // Add event listener to the toggle (only if it exists on the page)
    if (toggle) {
        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true'); // Save state to localStorage
                addDarkModeCss();
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false'); // Save state to localStorage
                removeDarkModeCss();
            }
        });
    }
});


