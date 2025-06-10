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

    // ✅ Funcionalidad 2: Mostrar carrito solo si estamos en carrito.html
    if (location.pathname.includes("carrito.html")) {
        const contenedor = document.getElementById("contenedor-carrito");
        const btnComprar = document.getElementById("btn-comprar");
        const sesion = JSON.parse(localStorage.getItem("sesion"));
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        // Si no hay sesión válida o no es un usuario normal, se redirige
        if (!sesion || sesion.tipo !== "normal") {
            window.location.href = "index.html";
            return;
        }

        // Filtra los juegos que pertenecen al usuario logueado
        const juegosUsuario = carrito.filter(j => j.usuario === sesion.usuario);

        // Si no hay juegos, se muestra un mensaje
        if (juegosUsuario.length === 0) {
            contenedor.innerHTML = "<p>No hay juegos en tu carrito.</p>";
        } else {
            // Si hay juegos, se crea una lista visual
            const lista = document.createElement("ul");
            lista.classList.add("list-group", "mb-3");

            // Por cada juego, se crea un ítem con botón de eliminar
            juegosUsuario.forEach((j, i) => {
                const item = document.createElement("li");
                item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                item.innerHTML = `
          ${j.juego}
          <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${i})">Eliminar</button>
        `;
                lista.appendChild(item);
            });

            contenedor.appendChild(lista);
            btnComprar.classList.remove("d-none"); // Muestra botón de compra
        }

        // ✅ Evento de botón "Finalizar compra"
        btnComprar.addEventListener("click", () => {
            // Elimina solo los juegos del usuario actual
            const nuevoCarrito = carrito.filter(j => j.usuario !== sesion.usuario);
            localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
            alert("¡Compra realizada con éxito! 🎉");
            location.reload(); // Refresca la página para actualizar vista
        });
    }
});
