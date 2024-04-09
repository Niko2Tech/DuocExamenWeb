document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    const themeIconDark = document.getElementById('theme-toggle-dark-icon');
    const themeIconLight = document.getElementById('theme-toggle-light-icon');

    function updateIcon() {
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeIconDark.style.display = 'block';
            themeIconLight.style.display = 'none';
            // cambiamos el fondo del body
            document.body.style.backgroundColor = '#1a202c';
        } else {
            themeIconDark.style.display = 'none';
            themeIconLight.style.display = 'block';
            // cambiamos el fondo del body
            document.body.style.backgroundColor = '#f7fafc';
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
    // Obtener la URL actual sin el dominio
    var currentPath = window.location.pathname;

    // Seleccionar todos los enlaces dentro del contenedor ul
    var links = document.querySelectorAll('ul.flex a');

    // Iterar sobre cada enlace para verificar si su atributo href coincide con la URL actual
    links.forEach(function (link) {
        console.log(link.getAttribute('href'));
        if (link.getAttribute('href') == currentPath) {
            // Si el enlace coincide con la URL actual, agregar clases para cambiar el color
            // Agrega o modifica las clases según tus necesidades
            link.classList.add('text-white', 'bg-blue-700'); // Para el modo claro
            link.classList.add('dark:bg-blue-600'); // Para el modo oscuro
            // Elimina las clases que ya no son necesarias
            link.classList.remove('text-gray-900', 'dark:text-gray-400', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'dark:hover:text-white');
        } else {
            // Si no coincide, asegúrate de que el enlace no tenga las clases de color activo
            // Esto es útil si reutilizas este script para una SPA o aplicas cambios dinámicos en la página
            link.classList.remove('text-white', 'bg-blue-700', 'dark:bg-blue-600');
            // Asegúrate de que las clases para el estado no activo estén presentes
            link.classList.add('text-gray-900', 'dark:text-gray-400', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'dark:hover:text-white');
        }
    });
});
