document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-reset");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const nueva = document.getElementById("new-password").value.trim();
        const confirmar = document.getElementById("confirm-password").value.trim();

        if (!validarEmail("email") || !validarPasswords("new-password", "confirm-password")) {
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const index = usuarios.findIndex(u => u.email === email);

        if (index === -1) {
            alert("No se encontró un usuario con ese correo.");
            return;
        }

        usuarios[index].password = nueva;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Contraseña actualizada exitosamente");
        window.location.href = "login.html";
    });
});