document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("form-registro");

    if (formulario) {
        formulario.addEventListener("submit", function (e) {
            e.preventDefault();

            if (validarFormulario()) {
                const nombre = document.getElementById("nombre").value.trim();
                const rut = document.getElementById("rut").value.trim();
                const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
                const email = document.getElementById("email").value.trim();
                const telefono = document.getElementById("telefono").value.trim();
                const password = document.getElementById("password").value;

                const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

                const existe = usuarios.some(u => u.email === email);

                if (existe) {
                    alert("Ya existe una cuenta con ese correo.");
                    return;
                }

                const nuevoUsuario = {
                    nombre,
                    rut,
                    fechaNacimiento,
                    email,
                    telefono,
                    password,
                    tipo: "normal"
                };

                usuarios.push(nuevoUsuario);
                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                alert("¡Usuario registrado con éxito!");
                formulario.reset();
                window.location.href = "login.html";
            }
        });
    }
});
