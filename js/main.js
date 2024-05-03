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
    // Obtiene todos los elementos de enlace del navbar
    const links = document.querySelectorAll('nav a');

    // Obtiene la ruta actual del navegador
    const currentPath = window.location.pathname;

    // Itera sobre cada enlace para ajustar las clases según si está activo o no
    links.forEach(function (link) {
        // Extrae la ruta del atributo href del enlace
        const linkPath = link.getAttribute('href');

        if (linkPath === currentPath) {
            // Si el enlace coincide con la URL actual, configura las clases para el estado activo
            link.classList.add('text-white', 'bg-blue-700'); // Clases para el estado activo en modo claro
            link.classList.add('md:bg-transparent', 'md:text-blue-700', 'md:dark:text-blue-500'); // Clases para el estado activo en responsive y modo oscuro
            link.classList.remove('text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'md:hover:bg-transparent', 'md:hover:text-blue-700', 'md:dark:hover:text-blue-500', 'dark:hover:bg-gray-700', 'dark:hover:text-white', 'dark:border-gray-700'); // Elimina las clases para el estado inactivo
        } else {
            // Si no coincide, remueve las clases de estado activo y asegura que las de inactivo estén presentes
            link.classList.remove('text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700', 'md:dark:text-blue-500');
            link.classList.add('text-gray-900', 'hover:bg-gray-100', 'md:hover:bg-transparent', 'md:hover:text-blue-700', 'md:dark:hover:text-blue-500', 'dark:text-white', 'dark:hover:bg-gray-700', 'dark:hover:text-white', 'dark:border-gray-700'); // Añade las clases para el estado inactivo
        }
    });

    var checkboxes = document.querySelectorAll('.product-checkbox');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            var total = 0;

            document.querySelectorAll('.product-checkbox:checked').forEach(function (checkedBox) {
                var priceText = checkedBox.closest('tr').querySelector('.product-price').innerText;
                var price = parseInt(priceText.replace('$', '').replace(/\./g, ''), 10);
                total += price;
            });

            document.getElementById('total-price').innerText = '$' + total.toLocaleString('es-CL');
        });
    });
});
