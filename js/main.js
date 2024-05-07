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

    updateIcon();
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

    const checkboxes = document.querySelectorAll('.product-checkbox');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            let total = 0;

            document.querySelectorAll('.product-checkbox:checked').forEach(function (checkedBox) {
                let priceText = checkedBox.closest('tr').querySelector('.product-price').innerText;
                let price = parseInt(priceText.replace('$', '').replace(/\./g, ''), 10);
                total += price;
            });

            document.getElementById('total-price').innerText = '$' + total.toLocaleString('es-CL');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const fileInput = document.getElementById('file_user');
    const submitButton = document.getElementById('submit-button');
    const formSuccess = document.getElementById('form-submit');

    function toggleSubmitButtonState(isValid) {
        if (isValid) {
            submitButton.disabled = false;
            submitButton.classList.remove('bg-gray-500', 'cursor-not-allowed');
            submitButton.classList.add('bg-blue-700', 'hover:bg-blue-800', 'dark:bg-blue-600', 'dark:hover:bg-blue-700');
        } else {
            submitButton.disabled = true;
            submitButton.classList.remove('bg-blue-700', 'hover:bg-blue-800', 'dark:bg-blue-600', 'dark:hover:bg-blue-700');
            submitButton.classList.add('bg-gray-500', 'cursor-not-allowed');
        }
    }

    function validateEmail() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailError = document.getElementById('email-error');
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Por favor, ingrese un correo válido';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    function validateSubject() {
        const subjectError = document.getElementById('subject-error');
        if (subjectInput.value.length < 5) {
            subjectError.textContent = 'El asunto debe tener al menos 5 caracteres';
            return false;
        } else {
            subjectError.textContent = '';
            return true;
        }
    }

    function validatePhone() {
        const phonePattern = /^\+569\d{8}$/;
        const phoneError = document.getElementById('phone-error');
        if (!phonePattern.test(phoneInput.value)) {
            phoneError.textContent = 'El teléfono debe comenzar con +569 y tener 9 dígitos en total';
            return false;
        } else {
            phoneError.textContent = '';
            return true;
        }
    }

    function validateMessage() {
        const messageError = document.getElementById('message-error');
        if (messageInput.value.length < 40) {
            messageError.textContent = 'El mensaje debe tener al menos 40 caracteres';
            return false;
        } else {
            messageError.textContent = '';
            return true;
        }
    }

    function validateFile() {
        const file = fileInput.files[0];
        const allowedExtensions = ['pdf', 'png', 'jpg', 'jpeg'];
        const fileError = document.getElementById('file-user-error');
        const maxSizeInBytes = 5 * 1024 * 1024;
        const fileExtension = file ? file.name.split('.').pop().toLowerCase() : '';

        if (!file) {
            return true;
        } else if (!allowedExtensions.includes(fileExtension)) {
            fileError.textContent = 'El archivo debe ser un PDF, PNG, JPG o JPEG';
            return false;
        } else if (file.size > maxSizeInBytes) {
            fileError.textContent = 'El archivo no debe superar los 5 MB';
            return false;
        } else {
            fileError.textContent = '';
            return true;
        }
    }

    function validateForm() {
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();
        const isFileValid = validateFile();

        const isFormValid = isEmailValid && isSubjectValid && isPhoneValid && isMessageValid && isFileValid;
        toggleSubmitButtonState(isFormValid);

        return isFormValid;
    }

    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    phoneInput.addEventListener('blur', validatePhone);
    messageInput.addEventListener('blur', validateMessage);
    fileInput.addEventListener('change', validateFile);

    document.getElementById('contactForm').addEventListener('input', validateForm);

    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            formSuccess.classList.remove('hidden');
        } else {
            formSuccess.classList.add('hidden');
        }
    });
});