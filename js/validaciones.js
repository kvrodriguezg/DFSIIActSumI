function validarPassword(idPassword, idConfirmar) {
    const pass = document.getElementById(idPassword); //Contraseña nueva
    const confirm = document.getElementById(idConfirmar); //Confirmación

    //Expresión regular para verificar seguridad:
    const regexSegura = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    let valido = true;

    if (!regexSegura.test(pass.value)) {
        pass.classList.add("is-invalid");
        valido = false;
    } else {
        pass.classList.remove("is-invalid");
        pass.classList.add("is-valid");
    }

    if (pass.value !== confirm.value || confirm.value === "") {
        confirm.classList.add("is-invalid");
        valido = false;
    } else {
        confirm.classList.remove("is-invalid");
        confirm.classList.add("is-valid");
    }

    return valido;
}

function validarEmail(idCampo) {
    const campo = document.getElementById(idCampo);
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Expresión regular básica de email

    if (!regexEmail.test(campo.value.trim())) {
        campo.classList.add("is-invalid");
        return false;
    } else {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
        return true;
    }
}

