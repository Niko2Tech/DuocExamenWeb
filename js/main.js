document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    const themeIconDark = document.getElementById('theme-toggle-dark-icon');
    const themeIconLight = document.getElementById('theme-toggle-light-icon');

    function updateIcon() {
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeIconDark.style.display = 'block';
            themeIconLight.style.display = 'none';
        } else {
            themeIconDark.style.display = 'none';
            themeIconLight.style.display = 'block';
        }
    }

    btn.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('color-theme');
        if (currentTheme === 'dark') {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
        updateIcon();
    });

    updateIcon(); // Actualiza el icono según el tema actual al cargar la página
});
