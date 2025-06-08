//Validar formulario
function validarFormulario() {
    let esValido = true; //Variable que acumulará si todas las validaciones son correctas

    //&= para combinar booleanos (AND).
    esValido &= validarCampoVacio("nombre");
    esValido &= validarEmail("email");
    esValido &= validarFechaNacimiento("fecha-nacimiento");
    esValido &= validarPasswords("password", "confirm-password");
    esValido &= validarRut("rut")
    return Boolean(esValido); //Se fuerza a boolean para evitar resultados tipo 0 o 1
}

//Validar que el usuario tenga al menos 13 años
function validarFechaNacimiento(idCampo) {
    const campo = document.getElementById(idCampo);
    const fecha = new Date(campo.value); //Fecha ingresada por el usuario
    const hoy = new Date(); //Fecha actual
    const edad = hoy.getFullYear() - fecha.getFullYear();

    // Verifica si ya cumplió 13 años exactamente o más
    const edadReal = (
        edad > 13 ||
        (edad === 13 && hoy >= new Date(fecha.setFullYear(fecha.getFullYear() + 13)))
    );

    if (!edadReal) {
        campo.classList.add("is-invalid");
        return false;
    } else {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
        return true;
    }
}

//Validar que un campo no esté vacío
function validarCampoVacio(idCampo) {
    const campo = document.getElementById(idCampo);
    if (campo.value.trim() === "") { //Se elimina espacios y se verifica si está vacío
        campo.classList.add("is-invalid");
        return false;
    } else {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
        return true;
    }
}

//Validar campo de clave
function validarPasswordFormato(idPassword) {
    const pass = document.getElementById(idPassword);

    //Expresión regular para verificar seguridad:
    /*
    Longitud mínima de 8 caracteres

    Longitud máxima de 20 caracteres

    Al menos una letra mayúscula

    Al menos una letra minúscula

    Al menos un número

    Al menos un carácter especial
    */
    const regexSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,20}$/;

    if (!regexSegura.test(pass.value)) {
        pass.classList.add("is-invalid");
        pass.classList.remove("is-valid");
        return false;
    } else {
        pass.classList.remove("is-invalid");
        pass.classList.add("is-valid");
        return true;
    }
}

function validarPasswords(idPassword, idConfirmar) {
    const pass = document.getElementById(idPassword); //Contraseña nueva
    const confirm = document.getElementById(idConfirmar); //Confirmación

    //Expresión regular para verificar seguridad:
    /*
    Longitud mínima de 8 caracteres

    Longitud máxima de 20 caracteres

    Al menos una letra mayúscula

    Al menos una letra minúscula

    Al menos un número

    Al menos un carácter especial
    */
    const regexSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,20}$/;

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

//Validar RUT Chileno
function validarRut(idCampo) {
    const campo = document.getElementById(idCampo);
    if (!campo) return false;

    const rut = campo.value.trim().toUpperCase().replace(/\./g, "").replace(/-/g, "");

    if (rut.length < 8) {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
        return false;
    }

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);

    if (!/^\d+$/.test(cuerpo)) {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
        return false;
    }

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resultado = 11 - (suma % 11);
    let dvEsperado = "";

    if (resultado === 11) dvEsperado = "0";
    else if (resultado === 10) dvEsperado = "K";
    else dvEsperado = resultado.toString();

    if (dv !== dvEsperado) {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
        return false;
    } else {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
        return true;
    }
}
