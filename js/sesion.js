document.addEventListener("DOMContentLoaded", () => {
    const sesion = JSON.parse(localStorage.getItem("sesion"));

    //Se obtienen los nav
    const navLinksComunes = document.getElementById("nav-links-comunes");
    const navLinksSesion = document.getElementById("nav-links-sesion");

    if (!navLinksComunes || !navLinksSesion) return;

    //HTML base para las categorías
    navLinksComunes.innerHTML = `
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="categoriasDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Categorías
            </a>
            <ul class="dropdown-menu" aria-labelledby="categoriasDropdown">
                <li><a class="dropdown-item" href="categoria-desayunos.html">Desayunos</a></li>
                <li><a class="dropdown-item" href="categoria-almuerzos.html">Almuerzos</a></li>
                <li><a class="dropdown-item" href="categoria-veganas.html">Veganas</a></li>
                <li><a class="dropdown-item" href="categoria-postres.html">Postres</a></li>
            </ul>
        </li>
    `;

    //Enlaces según el tipo de sesión
    if (sesion?.logueado) {
        let linksSesion = `
            <li class="nav-item"><a class="nav-link" href="mi-perfil.html">Mi Perfil</a></li>
        `;

        //Enlace para admin
        if (sesion.tipo === "admin") {
            linksSesion += `<li class="nav-item"><a class="nav-link" href="admin.html">Panel Admin</a></li>`;
        }

        linksSesion += `
            <li class="nav-item"><a class="nav-link" href="#" id="cerrar-sesion">Cerrar sesión</a></li>
        `;

        navLinksSesion.innerHTML = linksSesion;

        //Cerrar sesión
        document.getElementById("cerrar-sesion").addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("sesion");
            window.location.href = "index.html";
        });

    } else {
        navLinksSesion.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="login.html">Iniciar sesión</a></li>
        `;
    }
})