function toggleCheck(element) {
    const spinner = element.querySelector('.spinner');
    const checkmark = element.querySelector('.checkmark');

    // Reiniciar el estado
    spinner.style.display = 'none';
    checkmark.style.display = 'none';

    // Mostrar el spinner
    spinner.style.display = 'block';

    setTimeout(() => {
        // Ocultar el spinner y mostrar el checkmark
        spinner.style.display = 'none';
        checkmark.style.display = 'block';
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const button = document.getElementById('register-button');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir que el formulario se envíe

        // Verificar si todos los inputs están llenos
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="number"]');
        let allFilled = true;
        inputs.forEach((input) => {
            if (input.value.trim() === '') {
                allFilled = false;
            }
        });

        if (allFilled) {
            // Si todos los campos están llenos, agregar la clase de éxito
            button.classList.add('success');
            button.innerText = '¡Registro Exitoso!';

            // Esperar 2 segundos para que se vea la animación
            setTimeout(() => {
                // Redirigir a la página de login (asegúrate de que el nombre y la ruta del archivo sean correctos)
                window.location.href = 'home.html';
            }, 2000); // 2000 milisegundos (2 segundos)
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Detenemos el envío por defecto del formulario

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    console.log("Email:", email);  // Verifica que el valor del email se obtiene
    console.log("Password:", password);  // Verifica que el valor de la contraseña se obtiene

    // Verifica si ambos campos no están vacíos
    if (email !== "" && password !== "") {
        console.log("Campos completos, redirigiendo...");
        // Redirige a la página "Index.html"
        window.location.href = "home.html";
    } else {
        console.log("Campos incompletos");
        alert("Por favor, completa ambos campos.");
    }
});
