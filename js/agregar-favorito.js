document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todos los botones que permiten agregar a favoritos
    const botones = document.querySelectorAll(".agregar-favorito");

    // Por cada botón...
    botones.forEach(btn => {
        // Se añade un evento cuando se hace clic
        btn.addEventListener("click", function () {
            const receta = this.dataset.receta; // Obtiene el nombre de la receta desde el atributo data-receta
            const sesion = JSON.parse(localStorage.getItem("sesion")); // Obtiene la sesión activa

            // Si no hay sesión activa o no es un usuario "normal", se redirige al login
            if (!sesion || sesion.tipo !== "normal") {
                localStorage.setItem("redirigirDespues", location.pathname); // Guarda la ruta actual para redirigir después del login
                alert("Debes iniciar sesión como usuario normal para agregar recetas a favoritos.");
                window.location.href = "login.html";
                return;
            }

            let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; // Carga los favortios del localStorage

            //Verifica si la receta ya fue agregada previamente por ese usuario
            const index = favoritos.findIndex(item => item.email === sesion.email && item.receta === receta);

            if (index !== -1) {
                //Si ya existe, se elimina de favoritos
                favoritos.splice(index, 1);
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
                alert(`"${receta}" fue eliminada de tus favoritos.`);
            } else {
                //Si no existe, se agrega
                favoritos.push({ receta, email: sesion.email });
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
                alert(`"${receta}" fue agregada a tus favoritos.`);
            }
        });
    });
});
