//Crear el usuario admin si no existe
document.addEventListener("DOMContentLoaded", () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existeAdmin = usuarios.some(user => user.email === "admin@mesadigital.com");

    if (!existeAdmin) {
        const admin = {
            nombre: "Administrador",
            rut: "11111111-1",
            email: "admin@mesadigital.com",
            telefono: "999999999",
            password: "Admin123*",
            tipo: "admin"
        };
        usuarios.push(admin);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log("Usuario admin creado por defecto.");
    }
});


//Función para iniciar sesión con email y contraseña
function login(email, password) {
    if (!validarEmail("email") || !validarPasswordFormato("password")) {
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
        localStorage.setItem("sesion", JSON.stringify({
            logueado: true,
            email: usuario.email,
            tipo: usuario.tipo
        }));

        const destino = localStorage.getItem("redirigirDespues") || "index.html";
        localStorage.removeItem("redirigirDespues");
        window.location.href = destino;
    } else {
        alert("Correo o contraseña incorrectos.");
    }
}

//Conectar el formulario de login con la función de login
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");

    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (email && password) {
                login(email, password);
            } else {
                alert("Completa todos los campos.");
            }
        });
    }
});