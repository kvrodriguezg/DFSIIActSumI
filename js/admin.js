// Espera que el documento HTML esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    // Recupera la sesión activa desde localStorage
    const sesion = JSON.parse(localStorage.getItem("sesion"));

    // Recupera todos los usuarios almacenados desde localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Validación: si no hay sesión activa o el tipo de usuario no es "admin", bloquea el acceso
    if (!sesion || sesion.tipo !== "admin") {
        alert("Acceso denegado. Solo para administradores."); // Muestra mensaje de error
        window.location.href = "index.html"; // Redirige a la página de inicio
        return; // Detiene la ejecución del resto del código
    }

    // Si el usuario es admin, se cargan los usuarios en la tabla
    cargarUsuarios();
});

// Función para cargar y mostrar todos los usuarios en la tabla del panel admin
function cargarUsuarios() {
    // Obtiene de nuevo los usuarios actualizados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Selecciona el cuerpo de la tabla donde se mostrarán los usuarios
    const tabla = document.getElementById("tabla-usuarios");
    tabla.innerHTML = ""; // Limpia cualquier contenido previo en la tabla

    // Itera sobre cada usuario y crea una fila con sus datos
    usuarios.forEach((user, index) => {
        const fila = document.createElement("tr"); // Crea una nueva fila de tabla

        // Inserta los datos del usuario en celdas, incluyendo botones de acción
        fila.innerHTML = `
      <td>${index + 1}</td> <!-- Número de fila -->
      <td>${user.nombre || "-"}</td> <!-- Nombre del usuario -->
      <td>${user.rut || "-"}</td> <!-- Rut del usuario -->
      <td>${user.email || "-"}</td> <!-- Nombre de usuario -->
      <td>${user.telefono}</td> <!-- Email del usuario -->
      <td>${user.fechaNacimiento || "-"}</td> <!-- Fecha de nacimiento -->
      <td>${user.tipo || "normal"}</td> <!-- Tipo de usuario: normal/admin -->
      <td>
        <!-- Botón para editar el usuario -->
        <button class="btn btn-warning btn-sm me-2" onclick="editarUsuario(${index})"><i class="ti ti-edit"></i></button>
        <!-- Botón para eliminar el usuario -->
        <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})"><i class="ti ti-trash"></i></button>
      </td>
    `;

        tabla.appendChild(fila); // Agrega la fila a la tabla
    });
}

// Función para editar un usuario
function editarUsuario(index) {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")); // Obtiene usuarios
    const usuario = usuarios[index]; // Selecciona el usuario a editar

    // Pide nuevos valores al admin mediante prompts
    const nuevoNombre = prompt("Nuevo nombre:", usuario.nombre);
    const nuevoCorreo = prompt("Nuevo correo:", usuario.email);
    const nuevoTelefono = prompt("Nuevo teléfono:", usuario.telefono);

    let nombreValido = true;
    let telefonoValido = true;

    //Validación de nombre
    if (nuevoNombre.trim() === "") {
        alert("Nombre no puede ser vacío");
        nombreValido = false;
    }

    //Validación de correo
    const emailValido = validarEmail(nuevoCorreo); // Asumo que ya tienes esta función

    //Validación de teléfono (solo 9 dígitos, solo números)
    const telefonoRegex = /^[0-9]{9}$/;
    if (!telefonoRegex.test(nuevoTelefono)) {
        alert("El teléfono debe contener exactamente 9 dígitos (solo números).");
        telefonoValido = false;
    }

    // Si se completan los tres campos, se actualiza el usuario
    if (nombreValido && emailValido && telefonoValido) {

        //Si el usuario se edita a si mismo se actualiza el correo
        if (usuario.email === sesion.email) {
            sesion.email = nuevoCorreo;
            localStorage.setItem("sesion", JSON.stringify(sesion));
        };

        usuarios[index].nombre = nuevoNombre;
        usuarios[index].email = nuevoCorreo;
        usuarios[index].telefono = nuevoTelefono;

        localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Guarda cambios
        alert("Usuario actualizado ✅"); // Confirmación
        location.reload(); // Recarga la página para mostrar cambios
    }
}

// Función para eliminar un usuario
function eliminarUsuario(index) {
    const sesion = JSON.parse(localStorage.getItem("sesion")); // Sesión activa
    const usuarios = JSON.parse(localStorage.getItem("usuarios")); // Lista de usuarios

    // Previene que el admin se elimine a sí mismo
    if (usuarios[index].email === sesion.email) {
        alert("No puedes eliminar tu propio usuario.");
        return;
    }

    // Confirma si realmente desea eliminar
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
        usuarios.splice(index, 1); // Elimina al usuario del array
        localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Actualiza localStorage
        alert("Usuario eliminado ❌");
        location.reload(); // Recarga la vista
    }
}


function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Expresión regular básica de email

    if (!regexEmail.test(email.trim())) {
        alert("Formato de Email no válido")
        return false;
    } else {
        return true;
    }
}

