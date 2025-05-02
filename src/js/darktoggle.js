document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.querySelector(
    '.darkmode-label input[type="checkbox"]'
    );
    toggleSwitch.checked = localStorage.getItem('darkmode') === 'true';

    function switchTheme(dark) {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem('darkmode', dark);
    }

    function switchThemeListener(e) {
        switchTheme(e.target.checked)
    }

    switchTheme(toggleSwitch.checked);
    toggleSwitch.addEventListener("change", switchThemeListener, false);
});

