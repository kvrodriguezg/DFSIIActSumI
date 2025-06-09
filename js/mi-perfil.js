document.addEventListener("DOMContentLoaded", () => {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //Se valida sesión
    if (!sesion) {
        window.location.href = "index.html";
        return;
    }

    const usuarioLogueado = usuarios.find(
        u => u.email === sesion.email
    );
    console.log(usuarioLogueado)
    //Se autocompletan los campos
    if (usuarioLogueado) {
        document.getElementById("nombre").value = usuarioLogueado.nombre || "";
        document.getElementById("email").value = usuarioLogueado.email || "";
        document.getElementById("fechaNacimiento").value = usuarioLogueado.fechaNacimiento || "";
        document.getElementById("rut").value = usuarioLogueado.rut || "";
        document.getElementById("telefono").value = usuarioLogueado.telefono || "";
    
    }

    const form = document.getElementById("form-perfil");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreValido = validarCampoVacio("nombre");
        const emailValido = validarEmail("email");
        const fechaValida = validarFechaNacimiento("fechaNacimiento");
        const telefonoValido = validarCampoVacio("telefono");

        if (!nombreValido || !emailValido || !fechaValida || !telefonoValido) {
            return;
        }

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const telefono = document.getElementById("telefono").value;


        const index = usuarios.findIndex(u => u.email === usuarioLogueado.email);
        if (index !== -1) {
            usuarios[index].nombre = nombre;
            usuarios[index].email = email;
            usuarios[index].fechaNacimiento = fechaNacimiento;
            usuarios[index].telefono = telefono;

            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            sesion.email = email; 
            localStorage.setItem("sesion", JSON.stringify(sesion));

            alert("Datos actualizados correctamente.");
        }
    });
});